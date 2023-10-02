import express from "express"
import { getallProducts, createProduct, getSingleProducts, deleteProducts, showProductPage, showCreateProductPage, singleProductPage, editProductPage, updateProduct
} from "../controllers/createProductController.js"
import { productImageUpload } from "../multer/multer.js"

// routes setup

const router = express.Router()


// ejs routes
router.get("/", showProductPage)
router.get("/create", showCreateProductPage)

router.get("/single/:slug", singleProductPage)
router.get("/edit/:id", editProductPage)
router.post("/update/:id", productImageUpload, updateProduct)


// api routes
router.get("/product", productImageUpload, getallProducts)

router.get("/product/:slug", getSingleProducts)

router.delete("/product/:id", deleteProducts)
router.get("/product-delete/:id", deleteProducts)

router.post("/product", productImageUpload, createProduct)



export default router ;