import { useQuery } from "react-query"
import { fetchCoinHistoricData } from "../../services/fetchCoinHistoricData"
import PageLoader from "../PageLoader"
import { useState } from "react"
import CoinInfo from "./CoinInfo";
import Alert from "../Alert";
import store from "../store";
function CoinInfoContainer({coinId}){
    const { currency } = store();
    const [days, setDays ] = useState(7);
    const [interval, setCoinInterval] = useState('');
    const {data:historicData , isLoading , isError}= useQuery(["coinhistoricData" , coinId , currency , days , interval], ()=>fetchCoinHistoricData(coinId , currency , days , interval),{
        cacheTime:1000*60*2,
        staleTime:1000*60*2,
    })
    // const { data: historicData, isLoading, isError } = useQuery(['coinHistoricData', coinId, currency, days, interval], () => fetchCoinHistoricData(coinId, interval, days, currency), {
      //  cacheTime: 1000 * 60 * 2,
        //staleTime: 1000 * 60 * 2,
    //});
    // 
    // 
    // console.log("hisrty",historicData);
    if(isLoading){
        return <PageLoader/>
    }
    if(isError){
        return <Alert message ="problem occured in fetching Data. Plaese try later"/>
    }
    return(
        <>
            <CoinInfo 
                historicData={historicData} 
                setDays={setDays} 
                setCoinInterval={setCoinInterval} 
                days={days}
                currency={currency}
            />
        </>
    )
}

export default CoinInfoContainer