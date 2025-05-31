import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ product ,setOpenCreateProductsDialog,setCurrentEditedId,setFormData}) {
    const hasSale = product?.salePrice > 0;

    return (
        <Card className="w-full max-w-sm mx-auto">
            <div>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[250px] object-cover rounded-t-lg"
                    />
                </div>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`text-lg font-semibold text-primary ${hasSale ? 'line-through' : ''}`}>
                            ${product?.price}
                        </span>
                        {hasSale && (
                            <span className="text-lg font-bold text-red-600">
                                ${product?.salePrice}
                            </span>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Button onClick={()=>{
                        setOpenCreateProductsDialog(true)
                        setCurrentEditedId(product?._id)
                        setFormData(product)
                    }}>Edit</Button>
                    <Button variant="destructive">Delete</Button>
                </CardFooter>
            </div>
        </Card>
    );
}

export default AdminProductTile;
