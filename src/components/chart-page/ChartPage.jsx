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
  const [zoomMag, setZoomMag] = useState(1.0);
  const [chartController, setChartController] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [chartPosition, setChartPosition] = useState({x: 0, y: 0});

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

  const onMouseMove = event => {
    if (mouseDown) {
      setChartPosition({
        x: chartPosition.x + event.nativeEvent.movementX, 
        y: chartPosition.y + event.nativeEvent.movementY
      });
    }
  }

  const zoom = (mag) => {
    setZoomMag(zoomMag + mag);
  };

  if (chartController) {
    chartController.zoom(zoomMag);
    chartController.pan(chartPosition);
  }

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
        }}
      />
      <div 
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        onMouseMove={onMouseMove}
      >
        <OrgChart 
          className="chartPageContentWrapper" 
          datasource={treeData} 
          onClickNode={onClickNode} 
          onChartRender={setChartController} 
        />
      </div>
      
      <ul className="fab-group">
        <li><Button className="fab fab-small" variant="secondary" onClick={() => zoom(.1)}><i class="fas fa-plus"></i></Button></li>
        <li><Button className="fab fab-small" variant="secondary" onClick={() => zoom(-.1)}><i class="fas fa-minus"></i></Button></li>
        <li><Button className="fab" onClick={() => setSearchVisible(!searchVisibile)}><i class="fas fa-search"></i></Button></li>
      </ul>
    </div>
  )
};
