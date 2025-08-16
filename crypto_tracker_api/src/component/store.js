import {create} from "zustand"
const store = create((set)=>({
    currency : 'usd',
    setCurrency : (newCurency)=>set((state)=>{
        return{
            ...state, currency:newCurency
        }
    })
}));
export default store;