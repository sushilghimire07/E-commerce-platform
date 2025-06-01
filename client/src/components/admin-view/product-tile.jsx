import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({ product, setOpenCreateProductsDialog, setCurrentEditedId, setFormData,handleDelete }) {
  const hasSale = product?.salePrice > 0;

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        {/* Image Wrapper */}
        <div className="relative overflow-hidden rounded-t-lg h-[250px] w-full">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <CardContent>
          <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-lg font-semibold text-primary ${hasSale ? "line-through" : ""}`}>
              ${product?.price}
            </span>
            {hasSale && (
              <span className="text-lg font-bold text-red-600">
                ${product?.salePrice}
              </span>
            )}
          </div>
        </CardContent>

        {/* Actions */}
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button onClick={()=>handleDelete(product?._id)} variant="destructive">Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
