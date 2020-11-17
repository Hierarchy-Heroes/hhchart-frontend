import React, { useEffect, useState } from 'react';
import OrgChart from './Chart';
import { SearchBar } from '../search-bar/SearchBar';
import Sidebar from './Sidebar';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
    const url = `http://localhost:3000/employees/${collection}`;
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
            console.log(json);
            setFlatData(json);
        }
      } else if (response.status === 400) {
        history.push('/login');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const isManager = (user, employee) => {
    if (user === null || employee === null) return false;
    let currId = employee.managerId;
    while (currId > 0) {
      const managerIndex = flatData.findIndex((emp) => { return emp.employeeId === currId })
      if (user.employeeId === currId) {
        return true;
      }
      currId = flatData[managerIndex].managerId;
    }
    return false;
  }

  const isSelf = (user, employee) => {
    if (user === null || employee === null) return false;
    return user.employeeId === employee.employeeId;
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
    if (zoomMag < 2 && mag > 0 || zoomMag > 0.2 && mag < 0) {
      zoomMag += mag;
    }
    const chart = document.getElementsByClassName('orgchart')[0].children[0];
    chart.setAttribute('style', `transform: scale(${zoomMag})`);
  };

  return (
    <div className="d-flex flex-row chartPage">
      <div className={`bg-light border-right chartPageSidebar ${sidebarVisible ? "chartPageSidebarVisible" : ""}`}>
        <Sidebar
          node={currentNode}
          onClickClose={onClickClose}
          isManager={isManager(props.currentUser, currentNode)}
          isSelf={isSelf(props.currentUser, currentNode)}>
        </Sidebar>
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
        <li>
          <OverlayTrigger placement='left' overlay={<Tooltip>Zoom-In</Tooltip>}>
            <Button className="fab fab-small" variant="secondary" onClick={() => zoom(.1)}><i class="fas fa-plus"></i></Button>
          </OverlayTrigger>
        </li>
        <li>
          <OverlayTrigger placement='left' overlay={<Tooltip>Zoom-Out</Tooltip>}>
            <Button className="fab fab-small" variant="secondary" onClick={() => zoom(-.1)}><i class="fas fa-minus"></i></Button>
          </OverlayTrigger>
        </li>
        <li>
          <OverlayTrigger placement='left' overlay={<Tooltip>Search Organization</Tooltip>}>
            <Button className="fab" onClick={() => setSearchVisible(!searchVisibile)}><i class="fas fa-search"></i></Button>
          </OverlayTrigger>
        </li>
      </ul>
    </div>
  )
};
