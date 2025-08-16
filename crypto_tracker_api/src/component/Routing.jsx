
import { lazy, Suspense } from "react";

import { Routes , Route } from "react-router-dom";
import Layout from "../pages/layout";
import PageLoader from "./PageLoader";
import CustomErrorBoundry from "./CustomErrorBoundry";
const Home = lazy(()=> import ("../pages/Home"))
const CoinsDetailsPage = lazy(()=> import("../pages/CoinsDetailsPage"))
function Routing(){
    

    return(
      <CustomErrorBoundry>
        
        <Routes>
              <Route path="/" element={<Layout/>}>
                 <Route index element={
                    <Suspense fallback={<PageLoader/>}><Home/></Suspense>
                 }/>
                 <Route path="/details/:coinId" element={<Suspense fallback={<PageLoader/>}><CoinsDetailsPage /></Suspense>}/>
              </Route>
              
        </Routes>
       </CustomErrorBoundry>
    )
}
export default Routing;