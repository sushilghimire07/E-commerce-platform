    import { Fragment } from "react";
    import {ChartSpline,LayoutDashboard ,ShoppingBasket,PackagePlus} from "lucide-react"
    import { useNavigate } from "react-router-dom";
    import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

    // import { adminSidebarMenuItems } from '@/config'

    const adminSidebarMenuItems = [
    {
        id:'dashbord',
        label:"Dashboard",
        path:'/admin/dashbord',
        icons:<LayoutDashboard />
    },
    {
        id:'products',
        label:"Products",
        path:'/admin/products',
        icons:<ShoppingBasket />
    },
    {
        id:'orders',
        label:"Orders",
        path:'/admin/orders',
        icons:<PackagePlus />
    }
    ]

    function MenuItems({setOpen}){
            const navigate = useNavigate()
        return <nav className="mt-8 flex-col flex gap-2">
        {
            
        adminSidebarMenuItems.map(menuItems => <div  key={menuItems.id} onClick={()=>{
            navigate(menuItems.path)
            setOpen? setOpen(false):null
        }} className="flex items-center text-xl cursor-pointer gap-2  rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">

            { menuItems.icons }
            <span>{menuItems.label}</span>
        </div> )
        }
            
        </nav>


    }


    function AdminSidebar({open,setOpen}) {

        const navigate = useNavigate()

        return ( 
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full ">
                        <SheetHeader className="border-b">
                            <SheetTitle className="flex gap-2 mt-5 mb-1">
                                <ChartSpline  size={30}/>
                              <span className="font-bold text-xl">Admin Pannel</span>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen}/>
                    </div>
                    
                </SheetContent>
            </Sheet>
            <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div  onClick={()=>navigate('/admin/dashbord')} className="flex items-center gap-2 cursor-pointer ">
                <ChartSpline  size={30}/>
                    <h1 className=" text-2xl font-extrabold">Admin Pannel</h1>
                </div>
                <MenuItems/>
            </aside>
        </Fragment>
        );
    }

    export default AdminSidebar;