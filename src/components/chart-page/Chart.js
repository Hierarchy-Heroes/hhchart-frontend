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
const OrgChartNonMemoized = props => {
  const containerRef = useRef(null);

  const options = {
    data: props.datasource,
    chartClass: "chart",
    verticalLevel: 3,
    visibleLevel: 4,
    nodeTitle: null,
    nodeContent: null,
    nodeTemplate: _ => "<div></div>", // Preempt orgchart's node rendering
    initCompleted: $chart => {
      let _scale = 1.0;
      let _position = {x: 0, y: 0};

      const update = () => $chart.css('transform', `matrix(${_scale}, 0, 0, ${_scale}, ${_position.x}, ${_position.y})`);

      const controllerObject = {
        pan: position => {
          _position = position;
          update();
        },
        zoom: scale => {
          _scale = scale;
          update();
        },
        setSelectedEmployeeId: id => {
          // TODO
        }
      };

      props.onChartRender(controllerObject);
    },
    createNode: ($node, data) => {
      // Add a react root whose id contains the node id
      $node.append(`<div id="react-root-${data.employeeId}"></div>`);
      $node.addClass("containerContainer");

      // Render a chart node to the new react root
      ReactDOM.render(React.createElement(ChartNode, {nodeData: data, 
        onClickNode: props.onClickNode}), 
        $node.find(`#react-root-${data.employeeId}`).get(0));

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

const OrgChart = React.memo(OrgChartNonMemoized, (prevProps, nextProps) => {
  return prevProps.datasource === nextProps.datasource;
});

export default OrgChart;
