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
  deleteProduct,
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
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productsList } = useSelector((state) => state.AdminProducts);
  const dispatch = useDispatch();
  
 function isFormValid() {
  return Object.values(formData).every((value) => value !== "");
}

function handleDelete(getCurrentProductId){
  // console.log(getCurrentProductId)
  dispatch(deleteProduct(getCurrentProductId)).then(data=>{
    if(data?.payload?.success){
      dispatch(fetchAllProducts())

    }
  })
}


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  async function onSubmit(event) {
    event.preventDefault();

    let resultAction;

    if (currentEditedId !== null) {
      resultAction = await dispatch(
        editProduct({ id: currentEditedId, formData })
      );
    } else {
      resultAction = await dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageUrl,
        })
      );
    }

    if (resultAction?.payload?.success) {
      await dispatch(fetchAllProducts());
      setOpenCreateProductsDialog(false);
      setImageFile(null);
      setUploadedImageUrl("");
      setFormData(initialFormData);
      setCurrentEditedId(null);
      toast.success(
        currentEditedId !== null
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
    } else {
      toast.error("Failed to save product.");
    }
  }

  return (
    <Fragment>
      {/* Add Button */}
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productsList && productsList.length > 0
          ? productsList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>

      {/* Drawer Sheet */}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={(open) => {
          setOpenCreateProductsDialog(open);
          if (!open) {
            setCurrentEditedId(null);
            setFormData(initialFormData);
            setImageFile(null);
            setUploadedImageUrl("");
          }
        }}
      >
        <SheetContent side="right" className="overflow-y-scroll scrollbar-hide">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          {/* Image Upload */}
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />

          {/* Form */}
          <div className="mx-3 py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
