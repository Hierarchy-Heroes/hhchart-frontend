import React, {useState} from 'react';
import OrgChart from './Chart';
import SearchBar from '../search-bar/SearchBar';

import './ChartPage.css';
import Sidebar from './Sidebar';

const ds = {
  id: "n1",
  name: "Jamiya Alvarez",
  title: "Chief Executive Officer",
  children: [
    { id: "n2", name: "Lewis Watts", title: "Chief Operations Officer" },
    {
      id: "n3",
      name: "Bridget Fyre",
      title: "Chief Technology Officer",
      children: [
        { id: "n4", name: "Tie Hua", title: "Senior Hardware Engineer" },
        {
          id: "n5",
          name: "Kaeden Cameron",
          title: "Senior Software Engineer",
          children: [
            { id: "n6", name: "Anabella Robbins", title: "Software Engineer I" },
            { id: "n7", name: "Xiang Xiang", title: "Software Engineer I" }
          ]
        },
        { id: "n8", name: "Dereon Patel", title: "Software Engineer II" }
      ]
    },
    { id: "n9", name: "Shirley Knight", title: "Head Council" },
    {
      id: "n10",
      name: "Carissa Rhodes",
      title: "Chief Marketing Officer",
      children: [{ id: "n11", name: "Raiden Mueller", title: "Marketing Director" }]
    }
  ]
};

export const ChartPage = props => {
  const [currentNode, setCurrentNode] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  // const [searchVisibile, setSearchVisible] = useState(true);

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
      <SearchBar visible={true} onClose={()=>{}}/>
      <OrgChart className="chartPageContentWrapper" datasource={ds} onClickNode={onClickNode} />
    </div>
  )
};
