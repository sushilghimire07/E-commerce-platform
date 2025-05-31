import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { UploadCloudIcon, XIcon, Image } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({ 
    imageFile,
   setImageFile,
   uploadedImageUrl,
   setUploadedImageUrl ,
   setImageLoadingState, 
    imageLoadingState,
    isEditMode   ,

  }) {

       console.log(isEditMode)
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true)
      const data = new FormData();
      data.append("my_file", imageFile);

      const response = await axios.post(
        "http://localhost:3000/api/admin/products/upload-image",data
      );

      console.log("Upload response:", response);

      if (response.data?.success) {
        setUploadedImageUrl(response.data.result.url);
        setImageLoadingState(false)
      } else {
        console.error("Upload failed:", response.data);
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
     uploadImageToCloudinary()
    }
  }, [imageFile]);

  

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold ml-5 mb-2 block">
        Upload Image
      </Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={` ${isEditMode ? 'opacity-60' : ''}  border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageFileChange}
          className="hidden"
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? `cursor-not-allowed` : ''} flex flex-col items-center
             justify-center h-32 cursor-pointer text-center`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & Drop or click to upload image</span>
          </Label>
        ) : (
          imageLoadingState?<Skeleton className="h-10 bg-gray-200 "/>:
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Image className="w-8 h-8 text-primary" />
              <p className="text-sm font-medium truncate max-w-[180px]">
                {imageFile.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
