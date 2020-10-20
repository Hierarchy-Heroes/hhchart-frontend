import React, { useEffect, useState } from 'react';
import OrgChart from './Chart';
import { SearchBar } from '../search-bar/SearchBar';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';
import './ChartPage.css';

export const ChartPage = props => {
  const [treeData, setTreeData] = useState({});
  const [flatData, setFlatData] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [searchVisibile, setSearchVisible] = useState(false);

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

  // const [zoomMag, setZoomMag] = useState(1.0);
  let zoomMag = 1.0;
  const zoom = (mag) => {
    zoomMag += mag;
    const chart = document.getElementsByClassName('orgchart')[0];
    chart.setAttribute('style', `transform: scale(${zoomMag})`);
  };

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
      <ul className="fab-group">
        <li><Button className="fab fab-small" variant="secondary" onClick={() => zoom(.1)}><i class="fas fa-plus"></i></Button></li>
        <li><Button className="fab fab-small" variant="secondary" onClick={() => zoom(-.1)}><i class="fas fa-minus"></i></Button></li>
        <li><Button className="fab" onClick={() => setSearchVisible(!searchVisibile)}><i class="fas fa-search"></i></Button></li>
      </ul>
    </div>
  )
};
