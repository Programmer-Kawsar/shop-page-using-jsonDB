import multer from "multer";


// multer setup

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/productsImages')
    },
    filename: (req, file, cb) => {
        cb(null, ` ${Date.now()} _ ${Math.floor(Math.random()*10000)} _ ${file.originalname}`)
    }
});

export const productImageUpload = multer({storage}).single("productPhoto");