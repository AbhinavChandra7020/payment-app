import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard(){
    return <div>
        <Appbar />
        <div className = "m-8" >
            <Balance />
            <Users /> 
        </div>
        
    </div>
}