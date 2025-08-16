import axiosInstance from "../helpers/Axiosinstance";
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
export async function fetchCoinData(page=1 , currency='usd') {
    const perpage = 10;
    try{
        const response = await axiosInstance.get(`/coins/markets?vs_currency=${currency}&per_page=${perpage}&page=${page}`)
        // console.log("response is",response.data)
        return response.data;
    }
    catch(error){
        console.log(error)
        return null;
    }
}