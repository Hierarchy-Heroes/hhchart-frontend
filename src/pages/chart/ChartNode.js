import React from 'react';
import './ChartNode.css';

const ChartNode = ({ nodeData }) => {
  const selectNode = () => {
    alert('open the side panel')
  }
  return (
    <div className='container' onClick={selectNode}>
      <img className='portrait' src='https://www.materialui.co/materialIcons/social/person_black_144x144.png'/>
      <div className='content-container'>
        <div className='fullname'>{nodeData.name}</div>
        <div className='position'>{nodeData.title}</div>
      </div>
    </div>
  )
}

export default ChartNode;