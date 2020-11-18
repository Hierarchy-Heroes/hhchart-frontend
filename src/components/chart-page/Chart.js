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

  const findEmployeeWithId = id => {
    const filtered = props.flatData.filter(it => it.employeeId === id);
    if (!filtered.length) {
      return null;
    } else {
      return filtered[0];
    }
  }

  const options = {
    data: props.datasource,
    chartClass: "chart",
    verticalLevel: 3,
    // visibleLevel: 4,
    nodeTitle: null,
    nodeContent: null,
    nodeTemplate: _ => "<div></div>", // Preempt orgchart's node rendering
    initCompleted: $chart => {
      let _scale = 1.0;
      let _position = {x: 0, y: 0};
      let _selectedEmployeeId = null;

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
          // Deselect old node
          if (_selectedEmployeeId) {
            const data = findEmployeeWithId(_selectedEmployeeId);
            ReactDOM.render(React.createElement(ChartNode, {nodeData: data, 
              onClickNode: props.onClickNode, isSelected: false}), 
              $(`#react-root-${data.employeeId}`).get(0));
          }

          _selectedEmployeeId = id;

          // Select new node
          if (_selectedEmployeeId) {
            const data = findEmployeeWithId(_selectedEmployeeId);
            ReactDOM.render(React.createElement(ChartNode, {nodeData: data, 
              onClickNode: props.onClickNode, isSelected: true}), 
              $(`#react-root-${data.employeeId}`).get(0));
          }
        },
        // FIXME: there is definitely a more 'reacty' way of doing this
        getPositionForEmployeeId: id => {
          const chartOffset = $(".chartContainer").get(0).getBoundingClientRect();
          const nodeOffset = $(`#orgchart-root-${id}`).get(0).getBoundingClientRect();

          var newX = chartOffset.left - nodeOffset.left;
          var newY = chartOffset.top - nodeOffset.top;

          return {x: newX, y: newY};
        }
      };

      props.onChartRender(controllerObject);
    },
    createNode: ($node, data) => {
      // Add a react root whose id contains the node id
      $node.attr("id", `orgchart-root-${data.employeeId}`)
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
