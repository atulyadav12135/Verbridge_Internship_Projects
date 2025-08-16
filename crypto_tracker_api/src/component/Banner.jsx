import bannerimg from "../assets/banner1.jpeg"

function Banner(){
    return(
        <div className="w-full h-40 relative flex justify-center">
            <img 
            src={bannerimg}
            className="h-full w-full"
             />
             <div className="absolute flex flex-col">
                <div className="text-white text-6xl font-bold">
                    Cryto Tracker
                </div>
                <div className="text-white text-sm pt-3 pl-3">
                    Get all info regarding crypto currencies
                </div>
             </div>
        </div>
    )
}
export default Banner