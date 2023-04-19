import React, {useState,useEffect} from "react";
import {Line} from "react-chartjs-2";
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineMarkSeries, HorizontalGridLines, Hint, XAxis, YAxis} from 'react-vis';

const EventOverTimeGraph=({chartData}) => {
  const [data,setData]=useState([]);
  useEffect(() => {
    console.log(chartData)
    setData(chartData.map((chart,i) => {return {x: i,y: chart.visitorCount} }))
  },[])
  return (
    <XYPlot height={600} width={600}>
          {console.log(chartData)}
      <YAxis tickValues={[0,1,2,3,4,5,6,7,8,9,10]} color="black"/>
      <HorizontalGridLines />
      <LineMarkSeries data={data} color="black" tooltip="hi"/>
    </XYPlot>
  )
};

export default EventOverTimeGraph;
