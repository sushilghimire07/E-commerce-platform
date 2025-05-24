import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
    return ( 
        
        <div className="felx flex-col bg-white overflow-hidden">
            {/* common header */}
            <ShoppingHeader/>
            <main className="flex flex-col w-full">
                <Outlet/>
            </main>

        </div>

     );
}

export default ShoppingLayout;