const Api_key="7e84a37d0c01a657a11bd8d5e5c6d53f"


const makeiconurl=(iconid)=>`https://openweathermap.org/img/wn/${iconid}@2x.png`


export const getformattedweaterdata=async(city,units=`metric`)=>{
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_key}&units=${units}`

    const data=await fetch(url).then((res)=>res.json()).then((data)=>data)

    const {weather,main:{temp,feels_like,temp_min,temp_max,pressure,humidity},wind:{speed},sys:{country},name}=data;

    const {description,icon}=weather[0]
    return {
        description,iconurl:makeiconurl(icon),temp,temp_min,temp_max,pressure,humidity,speed,country,name,feels_like
    }
}

