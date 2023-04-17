import React, {useState} from "react";
import {Line} from "react-chartjs-2";
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineMarkSeries, HorizontalGridLines, Crosshair} from 'react-vis';

const EventOverTimeGraph=({chartData}) => {
  const [crosshairValues, setCrossHairValues]=useState([]);

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  const onMouseLeave = () => {
    setCrossHairValues([])
  };

  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  const onNearestX = (value, {index}) => {
    setCrossHairValues(data.map((d)=>d[index]))
  };

  const data=[
  [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2},
      {x: 9,y: 0}
  ]
];
  return (
    <XYPlot onMouseLeave={() => {onMouseLeave()}} height={300} width={300}>
      <HorizontalGridLines />
      <LineMarkSeries onNearestX={() => {onNearestX()}} data={data[0]} color="black" />
      <Crosshair
          values={crosshairValues}
        />
    </XYPlot>
  )
};

export default EventOverTimeGraph;
