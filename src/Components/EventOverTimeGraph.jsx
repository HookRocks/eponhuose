import React, {useState,useEffect} from "react";
import {Line} from "react-chartjs-2";
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineMarkSeries, HorizontalGridLines, Hint, XAxis, YAxis} from 'react-vis';
import { ImageUtils } from "three";

const EventOverTimeGraph=({chartData}) => {
  const [value,setValue]=useState();
  const [data,setData]=useState([]);

  // const setHoverValue=(point) => {
  //   setValue({x: point.x, y: point.y})
  // }
  useEffect(() => {
    console.log(chartData)
    setData(chartData.map((chart,i) => {return {x: i,y: chart.visitorCount} }))
  },[])
  //width of the plot
  var plotWidth=600;
  //this is the range for hovering a point on the graph
  const hoverRange=32;
  return (
    <XYPlot height={600} width={plotWidth} onMouseMove={(e)=>{
      //this makes sure you are in the right node to reach the points
      if(e.target.className.baseVal!="rv-xy-plot__inner"){return;}
      //this is the root for the points in svg
      var a=e.target.children[2].children[1].children
      //null if not close enough to any points
      var hoveredNode=null
      for(var i=0;i<a.length;i++){
          var bounds=a[i].getBoundingClientRect()
          if((bounds.x-e.clientX)*(bounds.x-e.clientX)+(bounds.y-e.clientY)*(bounds.y-e.clientY) < hoverRange*hoverRange){hoveredNode={point:i,xPos:bounds.x,yPos:bounds.y};}
        }
        if(hoveredNode){console.log(hoveredNode)}
        
    }}>
          {console.log(chartData)}
      <YAxis tickValues={[0,1,2,3,4,5,6,7,8,9,10]} color="black"/>
      <HorizontalGridLines />
      <LineMarkSeries data={data} color="black" tooltip="hi" />
      {data.map((chart,i) => {return <Hint value={data[i]}/>})}
    </XYPlot>
  )
};

export default EventOverTimeGraph;
