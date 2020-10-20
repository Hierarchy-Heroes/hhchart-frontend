import React, { useEffect, useState } from 'react';
import OrgChart from './Chart';
import { SearchBar } from '../search-bar/SearchBar';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';
import './ChartPage.css';
import { useHistory } from 'react-router-dom';

export const ChartPage = props => {
  const [treeData, setTreeData] = useState({});
  const [flatData, setFlatData] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchVisibile, setSearchVisible] = useState(false);
  const history = useHistory();

  const getCollection = async (collection) => {
    const authToken = window.sessionStorage.getItem('authToken');
    const companyName = window.sessionStorage.getItem('companyName');
    const url = `http://localhost:3000/employees/${companyName}/${collection}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'auth-token': authToken,
        },
      })
      if (response.ok) {
        const json = await response.json();
        // console.log(json);
        switch (collection) {
          case 'tree':
            setTreeData(json[0]);
            break;
          case 'flat':
            setFlatData(json);
        }
      } else if (response.status === 400) {
        history.push('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCollection('tree');
    getCollection('flat');
  }, []);

  const onClickNode = node => {
    setCurrentNode(node);
    setSidebarVisible(!!node);
  };

  const onClickClose = () => setSidebarVisible(false);

  return (
    <div className="d-flex flex-row chartPage">
      <div className={`bg-light border-right chartPageSidebar ${sidebarVisible ? "chartPageSidebarVisible" : ""}`}>
        <Sidebar node={currentNode} onClickClose={onClickClose}></Sidebar>
      </div>
      <SearchBar
        data={flatData}
        visible={searchVisibile}
        handleClickOut={() => setSearchVisible(false)}
        onClickResult={(result) => {
          setCurrentNode(result);
          setSidebarVisible(!!result);
          setSearchVisible(false);
          // document.getElementById(result.id).classList.add('selected');
        }}
      />
      <OrgChart className="chartPageContentWrapper" datasource={treeData} onClickNode={onClickNode} />
      <Button className="fab" onClick={() => setSearchVisible(!searchVisibile)}><i class="fas fa-search"></i></Button>
    </div>
  )
};
