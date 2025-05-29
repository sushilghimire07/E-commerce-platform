import { imageUploadUtill } from "../../helpers/cloudinary.js";
import Product from '../../models/Product.js'

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataUrl = `data:${req.file.mimetype};base64,${b64}`;
    const result = await imageUploadUtill(dataUrl);

    res.json({
      success: true, 
      result,
    });
  } catch (error) {
    console.error("Image upload controller error:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred in product controller",
    });
  }
};

//add new product


const appProduct = async(req,res)=>{

  try {
    
    const {image,title,description ,category,price,salePrice,totalStock} = req.body
    const newlyCreatedProduct = new Product({
      image,title,description ,category,price,salePrice,totalStock
    })

    await newlyCreatedProduct.save()

    res.status(201).json({
      success:true,
      data:newlyCreatedProduct,
    })

  } catch (error) {
    console.log("Error in product controller : "+error);
    res.status().json({
      success:false,
      message:"Error occured..!!"
    })
  }

}

//fetch all product

const fetchAllProducts = async (req,res) =>{
 
  try {
    
    const listOfProducts = await Product.find({})
    res.status(201).json({
      success:true,
      data:listOfProducts
    })

  } catch (error) {
    console.log("Error in product controller : "+error);
    res.status().json({
      success:false,
      message:"Error occured..!!"
    })
} 
}
//edit a product

const editProduct = async (req,res) =>{
  try {
    
    const {id} = req.parmas
    const {image,title,description ,category,price,salePrice,totalStock} = req.body

    const findProduct = await Product.findById(id)

    if(!findProduct) return res.send(404).json({
      success:false,
      message:"Product not found..!!"
    })
  

    findProduct.title = title || findProduct.title
    findProduct.description = description || findProduct.description
    findProduct.category = category || findProduct.category
    findProduct.brand = brand|| findProduct.brand
    findProduct.price = price || findProduct.price
     findProduct.salePrice = salePrice || findProduct.salePrice
      findProduct.totalStock = totalStock || findProduct.totalStock
       findProduct.image = image || findProduct.image

  } catch (error) {
    console.log("Error in product controller : "+error);
    res.status().json({
      success:false,
      message:"Error occured..!!"
    })
} 
}
// delete a product

const deleteProduct = async (req,res) =>{
  
} 

export { handleImageUpload, appProduct,fetchAllProducts,editProduct,deleteProduct }; 
