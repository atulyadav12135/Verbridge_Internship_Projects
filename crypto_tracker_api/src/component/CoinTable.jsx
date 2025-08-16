import React,{useContext, useEffect, useState,lazy} from "react"
import { fetchCoinData } from "../services/fetchCoinData";
import {useQuery} from "react-query"
// import { CurrencyContext } from "../context/CurrencyContext";
import store from "./store";
import { useNavigate } from "react-router-dom";
import PageLoader from "./PageLoader";

function CoinTable(){
    // const {currency}= useContext(CurrencyContext);
    const {currency}= store();
    const [page , setpage]= useState(1);
    const {data, isLoading, isError, error} = useQuery(['coin', page,currency],()=>
        fetchCoinData(page ,currency),{
            // retry:2,
            // retryDelay: 1000,
            cacheTime : 1000*60*2,
            staleTime : 1000 * 60 *2
        }
    )
    const navigate = useNavigate();
    // {console.log("data is", data)}
    if(isLoading){
        return(
            <PageLoader/>
        )
    }
    function handleCoinRedirect(id){
        navigate(`/details/${id}`)
    }
    if(isError){
        if(isError) {
            return <div>Error: {error.message}</div>;
        }
    }
    return(
        <div className="flex flex-col justify-center gap-5">
            <div className="w-full px-20 flex justify-center items-center bg-yellow-400 text-black">
                <div className="basis-1/4 font-bold flex justify-center">Coin</div>
                <div className="basis-1/4 font-bold flex justify-center">Price</div>
                <div className="basis-1/4 font-bold flex justify-center"> 24th change</div>
                <div className="basis-1/4 font-bold flex justify-center"> Market Cap</div>
            </div>

            <div className=" flex flex-col w-[80vw] mx-auto">
                {isLoading && <div>Loading..</div>}
                {data && data.map((coin)=>{
                    return(
                       <div onClick={()=>handleCoinRedirect(coin.id)} key={coin.id} className="flex flex-row gap-4 pb-9 cursor-pointer">
                        <div className="pl-0 basis-1/4 flex justify-start items-center">
                            <div className="w-[5 rem] h-[5rem]"> <img src= {coin.image} className="w-full h-full" loading="lazy"/></div>
                            <div>
                                <div>{coin.name}</div>
                                <div>{coin.symbol}</div>
                            </div>
                        </div>
                        <div className="basis-4/6 flex flex-row">
                            <div className=" px-20 basis-3/4 justify-center items-center">{coin.current_price}</div>
                            <div className=" px-20 basis-3/4">{coin.price_change_24h}</div>
                            <div className=" px-20 basis-3/4">{coin.market_cap}</div>
                        </div>
                       </div>
                    )
                })}
            </div>
            <div className="flex gap-4 justify-center items-center">
                <button
                    disabled={page === 1}
                    onClick={() => setpage(page-1)} 
                    className="btn btn-primary btn-wide text-white text-2xl"
                >
                    Prev
                </button>
                <button 
                    onClick={()=>setpage(page+1)}
                    className="btn btn-secondary btn-wide text-white text-2xl"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
export default CoinTable