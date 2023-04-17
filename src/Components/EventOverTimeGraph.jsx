import React, {useState} from "react";
import {Line} from "react-chartjs-2";
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineMarkSeries, HorizontalGridLines, Hint, XAxis, YAxis} from 'react-vis';

const EventOverTimeGraph=({chartData}) => {
  const [crosshairValues, setCrosshairValues]=useState([]);

  /**
   * Event handler for onMouseLeave.
   * @private
   */
  const onMouseLeave = () => {
    setCrosshairValues([])
  };

  /**
   * Event handler for onNearestX.
   * @param {Object} value Selected value.
   * @param {index} index Index of the value in the data array.
   * @private
   */
  const onNearestX=(index) => {
    setCrosshairValues(data.map((d,i) => {console.log(d[i].y); return [d[i]]}))
    console.log(crosshairValues)
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
    <XYPlot height={300} width={300}>
      <YAxis tickValues={[0,1,2,3,4,5,6,7,8,9,10]} color="black"/>
      <HorizontalGridLines />
      <LineMarkSeries data={data[0]} color="black" />
      <Hint value={data[0][1].y} />
    </XYPlot>
  )
};

export default EventOverTimeGraph;
