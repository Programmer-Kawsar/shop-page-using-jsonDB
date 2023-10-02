import { generateRandomId, createProductSlug } from "../helpers/randomid.js"
import fs from "fs";
import dotenv from "dotenv";
import axios from 'axios';
import nodemailer from "nodemailer";


// get all product
export const getallProducts = (req, res) => {
    const productData = JSON.parse(fs.readFileSync('./db/products.json').toString());

    // product check

    if (productData.length === 0) {
        res.status(404).json({message: "product not found"});
        return ; 
    }

    res.status(200).json({product : productData});
}

// get single product
export const getSingleProducts = (req, res) => {

    const { slug } = req.params

    const productData = JSON.parse(fs.readFileSync('./db/products.json').toString());

   // single product find

   const singleProduct = productData.find((data)=> data.slug === slug);

   if (!singleProduct) {
    res.status(404).json({msg: 'single product not found'})
    return;
   }

   res.status(200).json( singleProduct);
}


// create product
export const createProduct = async (req, res) => {

 // send email
 // create mail transport
const transporter = nodemailer.createTransport({
    host : process.env.MAIL_HOST,
    port : process.env.MAIL_PORT,
    auth : {
        user  : process.env.MAIL_ADDRESS,
        pass : process.env.MAIL_PASS
    }
    })
    
    await transporter.sendMail({
      from: `JSON DB CRUD < ${process.env.MAIL_ADDRESS} >`,
      subject : "Product Created",
      to : req.body.email,
      text : `Your Product name is ${req.body.name}, and it is Successfully Created, Thank you`,
    });
    
    console.log(req.body.email);

  // send mobile sms
  await axios.get(
    `http://bulksmsbd.net/api/smsapi?api_key=lZFK2nIc2ZMqgUDj5awF&type=text&number=(${req.body.mobile})&senderid=8809617612991&message=Your Product name is ${req.body.name}, and it is Successfully Created, Thank you `

  )

    const {name, regularPrice, salePrice, stock, mobile, email } = req.body

    if (!name || !regularPrice) {
       res.status(400).json({msg: 'name and regularPrice are required'})
       return;
    }

    //set json db 
    const productData = JSON.parse(fs.readFileSync('./db/products.json').toString());

    // product name check

    if (productData.some((data)=> data.slug === createProductSlug(name))) {
        res.status(400).json({msg: 'product already exist'})
        return;
    }

    const product =  { 
        id: generateRandomId(),
        slug: createProductSlug(name),
         name, 
         regularPrice, 
         salePrice, 
         stock, 
         photo: req.file.filename,
         mobile,
         email
        }
    productData.push(product)

    fs.writeFileSync("./db/products.json", JSON.stringify(productData))
    res.redirect("/");
}

// delete product
export const deleteProducts = (req, res) => {

    const { id } = req.params

    const productData = JSON.parse(fs.readFileSync('./db/products.json').toString());

   // updated product 
   const updatedProduct = productData.filter((data)=> data.id !== id);
   fs.writeFileSync("./db/products.json", JSON.stringify(updatedProduct))
   res.redirect("/");
}


//show product page

export const showProductPage =  (req, res) => {

    // get all product
    const productData = JSON.parse(fs.readFileSync('./db/products.json').toString());

    res.render("product.ejs", {products: productData});

    
}


export const showCreateProductPage =  (req, res) => {

    res.render("create.ejs");
}
export const singleProductPage = (req, res) => {
    const { slug } = req.params
      // get all product
      const productData = JSON.parse(fs.readFileSync('./db/products.json').toString());

      // find single product
      const singleProduct = productData.find((data)=> data.slug === slug);
    res.render("single.ejs", {
        product : singleProduct
    });
}


//edit product
export const editProductPage = (req, res) => {
    const { id } = req.params
      // get all product
      const productData = JSON.parse(fs.readFileSync('./db/products.json').toString());

      // find single product
      const editProduct = productData.find((data)=> data.id === id);
    res.render("edit.ejs", {
        product : editProduct
    });
}


// update product
export const updateProduct = (req, res)=>{

    const { id } = req.params

    const {name, regularPrice, salePrice, stock, mobile } = req.body

 
    // get all product
       const productData = JSON.parse(fs.readFileSync('./db/products.json').toString());


    // photo manage

    let photo_manage = 
     productData[productData.findIndex((data)=> data.id === id)].photo ;

    if (req?.file?.filename) {
        photo_manage = req.file.filename
    }

    productData[productData.findIndex((data)=> data.id === id)] ={
    
        id : id,
        slug : createProductSlug(name),
            name, 
           regularPrice, 
           salePrice, 
           stock,
           mobile,
           photo : photo_manage
           
       }

       fs.writeFileSync("./db/products.json", JSON.stringify(productData))
    
    res.redirect("/");
    
    }