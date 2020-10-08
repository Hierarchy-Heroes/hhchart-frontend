import React, { useState } from 'react';
import OrgChart from './Chart';
import { SearchBar } from '../search-bar/SearchBar';
import Sidebar from './Sidebar';
import { Button } from 'react-bootstrap';
import './ChartPage.css';


const list_data = [
  { id: "n1", name: "Jamiya Alvarez", title: "Chief Executive Officer", children: ["n2", "n3", "n9", "n10"] },
  { id: "n2", name: "Lewis Watts", title: "Chief Operations Officer" },
  { id: "n3", name: "Bridget Fyre", title: "Chief Technology Officer", children: ["n4", "n5", "n8"] },
  { id: "n4", name: "Tie Hua", title: "Senior Hardware Engineer" },
  { id: "n5", name: "Kaeden Cameron", title: "Senior Software Engineer", children: ["n6", "n7"] },
  { id: "n6", name: "Anabella Robbins", title: "Software Engineer I" },
  { id: "n7", name: "Xiang Xiang", title: "Software Engineer I" },
  { id: "n8", name: "Dereon Patel", title: "Software Engineer II" },
  { id: "n9", name: "Shirley Knight", title: "Head Council" },
  { id: "n10", name: "Carissa Rhodes", title: "Chief Marketing Officer", children: ["n11"] },
  { id: "n11", name: "Raiden Mueller", title: "Marketing Director" }
];

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
  const [searchVisibile, setSearchVisible] = useState(false);

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
      <SearchBar data={list_data} visible={searchVisibile} handleClickOut={() => setSearchVisible(false)} />
      <OrgChart className="chartPageContentWrapper" datasource={ds} onClickNode={onClickNode} />
      <Button className="fab" onClick={() => setSearchVisible(!searchVisibile)}><i class="fas fa-search"></i></Button>
    </div>
  )
};
