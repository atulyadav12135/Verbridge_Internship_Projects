import { useState } from "react";
import {TailSpin} from 'react-loader-spinner';
import axios from 'axios';


function Input({type,placeholder}){
    const [query , setQuery]= useState('');
    let responsedata;
    const [weather , setWeather] = useState({
        loading:false,
        data:{},
        error:false,
    });

const toDate= ()=>{

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'Nocvember',
      'December',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
}

    const search = async(event)=>{
        if(event.key=='Enter'){
            event.preventDefault();
            setQuery('');
            setWeather({...weather , loading:true})
            const url = 'https://api.openweathermap.org/data/2.5/weather'
            const apiKey = '62ecbc1364eefd5bf7f9df859d2e1718'
           
            await axios.get(url,{
                params:{
                    q :query,
                    appid:apiKey,
                },
            })
            .then(response=>{
                console.log("response is",response.data);
                responsedata= response.data;
                setWeather({loading:false, data:responsedata, error:false})
                })
            .catch((error)=>{
                console.log("caught in res",error);
            })
        }
    }

    return(
        <>
            <div className="bg-green-500 flex align-center justify-center ">
                <input 
                className="bg-violet-200 text-black py-6 px-14 w-1/2 border rounded-4xl"
                type = {type}
                placeholder={placeholder}
                onChange={(event)=>{
                    event.preventDefault();
                    setQuery(event.target.value);
                    // console.log('newtxt is ' , query)
                }}
                onKeyPress={search}
                value={query}
                />
            </div>
            {weather.loading && (
                <>
                    <br />
                    <br />
                    <TailSpin radius={1} color="black" height={100} width={100} visible={true}/>
                </>
            )}
            {weather.error &&(
                
                <>
                <h1>error</h1>
                
                </>
                
            )}
            {weather && weather.data && weather.data.main &&(
                <>
                <div>
                    <div className="bg-green-500 flex justify-center align-center">
                        <h2 className="text-amber-600 text-5xl ">
                            {weather.data.name},<span>{weather.data.sys.country}</span>
                        </h2>
                    </div>

                    <div className="bg-green-500 flex justify-center align-center">
                        <span className="text-amber-600 text-xl">{toDate()}</span>
                    </div>
                    <div className="bg-green-500 flex justify-center align-center items-center">
                         <img
                          src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                          alt={weather.data.weather[0].description}
                        />
                        <h5>{Math.round(weather.data.main.temp)-273}
                            <sup className="deg">&deg;C</sup>
                        </h5>
                    </div>
                    <div className=" bg-green-500 flex justify-center items-center flex-col">
                        <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
                    </div>
                </div>
                </>
            )}
        </>
    );
}
export default Input;