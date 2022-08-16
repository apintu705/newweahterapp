import hotbg from "./assets/hot.jpg"
import coldbg from "./assets/cold.jpg"
import {Description} from "./components/Description"
import { useEffect, useState } from "react";
import { getformattedweaterdata } from "./weatherservice";

function App() {

  const [weather,setWeather]=useState(null);
  const [units,setUnits] = useState("metric")
  const [city,setCity] = useState("delhi")
  const [bg,setbg] = useState(hotbg)

  useEffect(() => {
    const fetchweatherdata=async()=>{
      const data=await getformattedweaterdata(city,units);
      setWeather(data)

      const thresold=units==="metric" ?20:60;
      if(data.temp<=thresold){
        setbg(coldbg)
      }else{
        setbg(hotbg)
      }
    }
    fetchweatherdata();
  },[units,city])

  const handleunitsclick =(e)=>{
    const button=e.currentTarget;
    const currentunit=button.innerText.slice(1);
    if(currentunit==="C"){
      setUnits("metric")
    }
    if(currentunit==="F"){
      setUnits("imperial")
    }

  }
  const enterkeypress=(e)=>{
    if(e.key==="Enter"){
      setCity(e.target.value);
      e.target.blur();
    }
  }
  return (
    <div className="app"
    style={{backgroundImage:`url(${bg})`}}
    >
      <div className="overlay">
        {weather && 
        <div className="container">
        <div className="section section_inputs">
          
            <input onKeyDown={enterkeypress} type="text" name="city" placeholder="Enter City..."/>

            <button onClick={(e)=>handleunitsclick(e)} >&#176;{units==="metric"?"F":"C"}</button>
          
        </div>
          <div className="section section_temprature">
            <div className="icon">
              <h3>{weather.name}, {weather.country}</h3>
              <img src={weather.iconurl} alt="weather" />
              <h3>{weather.description}</h3>
            </div>
            <div className="temprature">
              <h1>{weather.temp.toFixed()} &#176;{units==="metric"?"C":"F"}</h1>
            </div>
          </div>

          {/* bottom_details */}
          <Description weather={weather} units={units}/>
        
      </div>
       }
        
      </div>
    </div>
  );
}

export default App;
