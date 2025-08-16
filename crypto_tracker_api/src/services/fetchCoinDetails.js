import axiosInstance from "../helpers/Axiosinstance";

export async function fetchCoinDetails(id) {
    try{
        const response = await axiosInstance.get(`/coins/${id}`);
        
        // console.log(response);

        return response.data;
    }catch(error){
        return null;
    }
}
export default fetchCoinDetails
