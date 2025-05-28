import { LogOut, Menu } from "lucide-react";
import { Button } from "../ui/button";

function AdminHeader({setOpen}) {
    return ( 
       <header className="flex items-center justify-between px-4 py-3 bg-background border-b">

        <Button onClick={()=>setOpen(true)} className="lg:hidden sm:block">
            <Menu/>
            <span className="sr-only">Toggle Menu</span>
        </Button>
        
        <div className="flex flex-1 justify-end ">  
            <Button className="inline-flex gap-2 items-center rounded-md px-4 py-4 text-sm font-medium shadow cursor-pointer">
                <LogOut />
                Logout
            </Button>
         </div>

       </header>
     );
}

export default AdminHeader;