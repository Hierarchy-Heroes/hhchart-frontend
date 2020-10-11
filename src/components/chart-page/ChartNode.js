import React from 'react';
import './ChartNode.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChartNode = ({ nodeData }) => {
  return (
    <div id={nodeData.id} className='container'>
      <svg className='portrait' width="45" height="45" viewBox="0 0 178 178" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="178" height="178">
          <circle cx="89" cy="89" r="89" fill="white" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="89" cy="89" r="89" fill="white" />
          <path d="M89 115C109.443 115 126 98.4425 126 78C126 57.5575 109.443 41 89 41C68.5575 41 52 57.5575 52 78C52 98.4425 68.5575 115 89 115ZM89 133.5C64.3025 133.5 15 145.895 15 170.5V189H163V170.5C163 145.895 113.698 133.5 89 133.5Z" fill="#707070" />
        </g>
      </svg>
      {/* <img className='portrait' src='https://www.materialui.co/materialIcons/social/person_black_144x144.png' /> */}
      <div className='content-container'>
        <div className='fullname'>{nodeData.name}</div>
        <div className='title'>{nodeData.title}</div>
      </div>
    </div>
  )
}

export default ChartNode;