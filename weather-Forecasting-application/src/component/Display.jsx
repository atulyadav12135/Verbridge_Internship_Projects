import Input from "./Input";

/***
 * this part is covered later on
 *  import { library, icon } from '@fortawesome/fontawesome-svg-core'
 import { faCamera } from '@fortawesome/free-solid-svg-icons'

 library.add(...all)
 const camera = icon({ prefix: 'fas', iconName: 'camera' })
 */



function Display(){
    return(
        <div className="bg-blue-600 w-full ">
            <div className="flex justify-center align-center">
                <h3 className="text-white w-25 ">weather App</h3>
            </div>
            <div>
                <Input 
                type= "text" 
                placeholder='enter city name'
                />
            </div>
        </div>
    );
}
export default Display;