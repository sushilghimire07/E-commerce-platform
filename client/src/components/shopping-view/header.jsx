import { HousePlus,Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";


function ShoppingHeader() {

   
    const {isAuthenticated}  = useSelector(state=>state.auth)

    return ( 
        <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
         <Link to='/shop/home' className="flex items-center  gap-2">
         
         <HousePlus className="h-16 w-6"/>
         <span className="font-bold">E-commerce</span>

         </Link>
         
         <Sheet>
            <SheetTrigger asChild>
                <Button varient='outlinr' size='icon' className='lg:hidden'>
                    <Menu className='h-6 w-6'/>
                    <span className="sr-only">Toggle header menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className='w-full max-w-x6' >

            </SheetContent>
         </Sheet>

        <div className="hidden lg:block">
            
        </div>
        {
            isAuthenticated ? <div></div> :null
        }
        </div>
        </header>
     );
}

export default ShoppingHeader;