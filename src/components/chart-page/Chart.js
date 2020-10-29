import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';

import "orgchart/dist/css/jquery.orgchart.min.css";
import "orgchart/dist/js/jquery.orgchart.min.js";

import ChartNode from "./ChartNode";

import './Chart.css';

/*
  props: {
    datasource,
  }
  */
const OrgChart = props => {
  const containerRef = useRef(null);

  const options = {
    data: props.datasource,
    chartClass: "chart",
    pan: true,
    verticalLevel: 3,
    visibleLevel: 4,
    nodeTitle: null,
    nodeContent: null,
    // zoom: true,
    // zoominLimit: 1,
    // zoomoutLimit: 0.5,
    createNode: ($node, data) => {
      // Remove orgchart default node
      $node.find(".title").remove();
      $node.find(".content").remove();

      // Add a react root whose id contains the node id
      $node.append(`<div id="react-root-${data.employeeId}"></div>`);
      $node.addClass("containerContainer");

      // Render a chart node to the new react root
      ReactDOM.render(React.createElement(ChartNode, {nodeData: data, onClickNode: props.onClickNode}), $node.find(`#react-root-${data.employeeId}`).get(0));

      if (props.centerOnClick) {
        $node.on('click', function(event) {
          // If none of the buttons are hovered over, the node itself is being clicked
          if (!$(event.target).is('.edge, .toggleBtn') && containerRef) {
            var $this = $(this);
            console.log($this);
            var $chart = $(containerRef.current).find(".orgchart");
            var newX = window.parseInt(($chart.outerWidth(true) / 2) - ($this.offset().left - $chart.offset().left) - ($this.outerWidth(true) / 2));
            var newY = window.parseInt(($chart.outerHeight(true) / 2) - ($this.offset().top - $chart.offset().top) - ($this.outerHeight(true) / 2));
            $chart.css('transform', 'matrix(1, 0, 0, 1, ' + newX + ', ' + newY + ')');
          }
        });
      }
    }
  };

  useEffect(() => {
    // On component mount, render orgchart from JQuery
    const container = containerRef.current;
    $(container).orgchart(options);

    // On component unmount, empty the container DOM element
    return () => $(container).empty();
  }, [options]);

  return (
    <div className="chartContainer" ref={containerRef} />
  );
};

export default OrgChart;
