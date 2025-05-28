import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { Fragment, useState } from "react";

const initialFormData = {
    image:null,
    title:'',
    description:'',
    category:'',
    brand:'',
    price:'',
    salePrice:'',
    totalStock:'',
}

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);

  const [formData,setFormData] = useState(initialFormData)

  function onSubmit(){

  }

  return (
    <Fragment>
      <div className="mb-5  w-full flex justify-end">
        <Button  onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
       
      </div>

      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={setOpenCreateProductsDialog}
      >
        <SheetContent side="right" className="overflow-y-scroll scrollbar-hide ">
         <SheetHeader> <SheetTitle>Add New Product</SheetTitle></SheetHeader>

           <ProductImageUpload/>

          <div className="mx-3 py-6">
            <CommonForm  onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText="Add" formControls={addProductFormElements}/>

          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
