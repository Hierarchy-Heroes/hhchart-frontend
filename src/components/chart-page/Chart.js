import React from 'react';
import OrganizationChart from "@dabeng/react-orgchart";
import ChartNode from "./ChartNode";

import './Chart.css';

/*
  props: {
    datasource,
  }
  */
const OrgChart = (props) => {
  return (
    <div className="fullheightChart">
      <OrganizationChart 
        containerClass="chartContainer"
        chartClass="chart"
        datasource={props.datasource}
        onClickNode={props.onClickNode}
        pan={true}
        // zoom={true}
        NodeTemplate={ChartNode}
        draggable={false}
      />
    </div>  
  );
};

export default OrgChart;