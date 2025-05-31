import ProductImageUpload from "@/components/admin-view/image-upload";
import AdminProductTile from "@/components/admin-view/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId,setCurrentEditedId] = useState(null)

  const { productsList } = useSelector((state) => state.AdminProducts);
  const dispatch = useDispatch();

  async function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null ? despatch(editProduct({{ id : currentEditedId, formData }}))


    const resultAction = await dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    );

    if (resultAction?.payload?.success) {
      await dispatch(fetchAllProducts());
      setOpenCreateProductsDialog(false);
      setImageFile(null);
      setUploadedImageUrl("");
      setFormData(initialFormData);
      toast.success("Product added successfully!");
    } else {
      toast.error("Failed to add product.");
    }
  }

  // ✅ USEEFFECT FIXED
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
       {
        productsList && productsList.length > 0 ?
        productsList.map(productItem => <AdminProductTile  
          key = {productItem._id}
          setOpenCreateProductsDialog={setOpenCreateProductsDialog} 
          setFormData = {setFormData}
          setCurrentEditedId={setCurrentEditedId} product={productItem} />) :null
       }
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={()=>{
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null)
          setFormData(initialFormData)
        }

        
        }

      >
        <SheetContent side="right" className="overflow-y-scroll scrollbar-hide">
          <SheetHeader>
            <SheetTitle>{
          

                currentEditedId !== null ? "Edit Product" : "Add new Product"

          }</SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}

          />

          <div className="mx-3 py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ?"Edit" :"Add"}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
