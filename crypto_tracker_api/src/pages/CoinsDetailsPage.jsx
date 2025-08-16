// this is for particular coin
import { useParams } from "react-router-dom";
import store from "../component/store";
import { useQuery } from "react-query";
import fetchCoinDetails from "../services/fetchCoinDetails"
import parse from "html-react-parser"
import PageLoader from "../component/PageLoader";
import CoinInfoContainer from "../component/CoinInfo/CoinInfoContainer";
function CoinsDetailsPage(){
    const {coinId} = useParams();
    const {currency} = store();
    const {data:coin , isLoading, isError,error} = useQuery(['coin', coinId],()=> fetchCoinDetails(coinId),{
        cacheTime: 1000*60*2,
        staleTime:1000*60*2,
    })
    // console.log(data);
    if(isLoading){
        return <PageLoader/>
    }
    if(isError){
        return <div>Something went wrong</div>
    }
    return(
        <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 w-full flex flex-col items-center justify-center border-r-2 border-gray-500">
                <img className="w-[7rem] h-[7rem] mb-5 "  src={coin?.image?.large} alt={coin?.name} />
                <h1 className="text-white font-bold h-[3rem]">{coin?.name}</h1>
                <p>{parse(coin?.description?.en)}</p>
            </div>


            <div  className="md:w-2/3 w-full "> <CoinInfoContainer coinId={coinId} /></div>
        </div>
    )
}
export default CoinsDetailsPage