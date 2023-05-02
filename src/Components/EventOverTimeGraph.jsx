import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import '../../node_modules/react-vis/dist/style.css';
import { XYPlot, LineMarkSeries, HorizontalGridLines, Hint, XAxis, YAxis } from 'react-vis';
import { ImageUtils } from "three";

const EventOverTimeGraph = ({ chartData=[] }) => {
  
  const [data, setData] = useState([]);
  const [increment, setIncrement] = useState([]);
  const [HoveredDot, SetDot] = useState({})
  useEffect(() => {
    if (chartData.length < 1) { return }
    
    var sus = chartData.map((chart, i) => {console.log(chart);return { x: i, y: chart.visitorCount } })
    var increments = []
    var susshallow = sus

    // 
    susshallow.sort((a, b) => a.y < b.y)
    var maxValue = susshallow[0].y
    var minValue = susshallow[susshallow.length - 1].y

    //console.log(maxValue, minValue)
    for (let i = 0; i < 11; i++) {
      var val = (((maxValue - minValue) / 10) * i) + minValue
      
      increments.push(val)
    }
    setIncrement(increments)
    //console.log(sus)
    setData(sus)

  }, [chartData])
  useEffect(()=>{},[HoveredDot])
  //width of the plot
  var plotWidth = 600;
  //this is the range for hovering a point on the graph
  const hoverRange = 32;
  return (
    <XYPlot height={600} width={600} className="m-auto my-[6.5rem]" onMouseMove={(e) => {
      //this makes sure you are in the right node to reach the points
      if (e.target.className.baseVal != "rv-xy-plot__inner") { return; }
      //this is the root for the points in svg
      var a = e.target.children[3].children[1].children
      //null if not close enough to any points
      var hoveredNode = {}
      if(a){
      for (var i = 0; i < a.length; i++) {
        var bounds = a[i].getBoundingClientRect()
        if ((bounds.x - e.clientX) * (bounds.x - e.clientX) + (bounds.y - e.clientY) * (bounds.y - e.clientY) < hoverRange * hoverRange) {
          hoveredNode = { point: i, xPos: bounds.x, yPos: bounds.y, data: chartData[i] }
          
        }
      }
    }
      SetDot(hoveredNode)
      if (hoveredNode) { console.log(hoveredNode) }
      
    }}>
      <YAxis tickValues={increment} color="white" style={{fontSize: 20,color: "#ffffff",strokeWidth: 2,stroke: 1}} />
      <HorizontalGridLines style={{ strokeWidth: 2 }} />
      <LineMarkSeries data={data} color="gray" tooltip="hi" style={{ strokeWidth: 3 }} />
      <p className="text-center text-white">
         <h1>{HoveredDot?.data?.eventName}</h1>
      </p>
      
    </XYPlot>
  )
};

export default EventOverTimeGraph;
