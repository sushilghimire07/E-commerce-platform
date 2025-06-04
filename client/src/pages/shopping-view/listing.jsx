import ProductFilter from "@/components/shopping-view/filter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUp, ArrowUpDown } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


function ShoppingListing() {


       const dispatch = useDispatch()

        // fetch list of products






    return ( 
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
            <ProductFilter/>  
            <div className="bg-background w-full rounded-lg shadow-sm">
                <div className="p-4 border-b flex items-center justify-between">
                        <h2 className="text-lg font-extrabold ">All products</h2>
                        <div className="flex items-center gap-3 ">
                            <span className="text-muted-foreground">10 products</span>
                              <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="flex items-center gap-1" variant="outline" size="sm" >
                                    <ArrowUpDown  className="h-4 w-4" />
                                    <span>Sort by</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                    <DropdownMenuRadioGroup>
                                        {
                                            sortOptions.map(sortItem =>

                                                <DropdownMenuRadioItem key={sortItem.id}>
                                                    {
                                                        sortItem.label
                                                    }
                                                </DropdownMenuRadioItem>
                                            )
                                        }
                                    </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </div>
                      
                </div>
                <div className="gird  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                </div>
            </div>
        </div>
     );
}

export default ShoppingListing;