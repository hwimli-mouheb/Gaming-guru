import React from 'react'
import './ProgressBar.css'
function ProgressBar({readings,width}) {
    let bars = readings && readings.length && readings.map((item, index)=>{
        if(item.value > 0) {
            return (
                <div className="bar" style={{'backgroundColor': item.color, 'width': item.value + '%'}}  key={index}>

                </div>
            )
        }
        return '';
    });

    let legends = readings && readings.length && readings.map((item, index)=>{
          if(item.value > 0) {
            return (
                <div className="legend" key={index}>
                    <span className="dot" style={{'color': item.color}}>●</span>
                    <span className="label">{item.name}</span>
                </div>
         )
     }
        return '';
  });
  let values = readings && readings.length && readings.map((item, i)=>{
    if(item.value > 0) {
        return (
            <div className="value" style={{'color': item.color, 'width': item.value + '%'}}  key={i}>
                <span>{item.value}%</span>
            </div>
        )
    }
    return '';
});

  return (
    <div className="multicolor-bar" style={{width:width}}>
      	<div className="values">
      		{values == ''?'':values}
      	</div>
        <div className="bars">
            {bars == ''?'':bars}
        </div>
        <div className="legends">
            {legends == ''?'':legends}
        </div>
    </div>
  );
}

export default ProgressBar