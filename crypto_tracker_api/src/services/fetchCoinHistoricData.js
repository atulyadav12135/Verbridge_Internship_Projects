import axiosInstance from "../helpers/Axiosinstance";

export async function fetchCoinHistoricData(id, interval, days = 7, currency = 'usd') {
    try {
        const response = await axiosInstance.get(`/coins/${id}/market_chart?days=${days}&vs_currency=${currency}`);
        console.log("in services", response.data)
        return response.data;

    } catch(error) {
        console.error(error);
        return null;
    }
}