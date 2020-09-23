import React from 'react';
import OrganizationChart from "@dabeng/react-orgchart";
import ChartNode from "./ChartNode";

/*
  props: {
    datasource,
  }
  */
const OrgChart = (props) => {
  return (
    <OrganizationChart 
      datasource={props.datasource}
      pan={true}
      zoom={true}
      NodeTemplate={ChartNode}
    />)
}

export default OrgChart;