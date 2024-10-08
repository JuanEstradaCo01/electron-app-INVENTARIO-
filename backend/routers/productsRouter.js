import { Router } from "express";
import ProductDao from "../dao/ProductManager.js";

const productDao = new ProductDao();

const productRouter = Router();

productRouter.get("/products", async (req, res) => {

    try {
        const products = await productDao.getProducts();

        res.status(200).json({
            products: products
        })

    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "Error al consultar los productos"
        })
    }
});

productRouter.get("/product/:pid", async (req, res) => {
    try{
        const pid = req.params.pid
        const products = await productDao.getProducts();

        const findProduct = products.find(item => item.id == pid)

        if(!findProduct){
            return res.status(404).json({
                code: 404,
                message: "No se encontró el producto"
            })
        }

        return res.status(200).json({
            code: 200,
            product: findProduct
        })
    }catch(e){
        return res.status(500).json({
            code: 500,
            message: "Error al consultar el producto",
        })
    }
})

productRouter.post("/editProduct/:pid", async (req, res) => {
    try{
        const pid = req.params.pid
        const products = await productDao.getProducts();

        const findProduct = products.find(item => item.id == pid)

        if(!findProduct){
            return res.status(404).json({
                code: 404,
                message: "No se encontró el producto"
            })
        }

        const { name, category, quantity, price } = req.body

        let product = {
            name: name,
            category: category,
            quantity: quantity,
            price: price
        }
        product.name = product.name.toUpperCase();
        const format = new Intl.NumberFormat('de-DE');
        const numberFormat = format.format(product.price);
        product.price = numberFormat

        await productDao.updateProduct(findProduct._id, product)

        return res.status(200).json({
            code: 200,
            message: `Se modificó el producto ${product.name}`
        })
    }catch(e){
        res.status(500).json({
            code: 500,
            message: "Ocurrio un error la editar el producto"
        })
    }
})

productRouter.post("/addProduct", async (req, res) => {
    try {
        const products = await productDao.getProducts();

        const newProduct = req.body
        newProduct.id = products.length + 1
        newProduct.name = newProduct.name.toUpperCase();
        const format = new Intl.NumberFormat('de-DE');
        const numberFormat = format.format(newProduct.price);
        newProduct.price = numberFormat

        await productDao.addProduct(newProduct)

        res.status(201).json({
            code: 201,
            message: `Se agregó el producto ${newProduct.name}`
        })

    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "Error al agregar el producto"
        })
    }
});

productRouter.delete("/deleteProduct/:pid", async (req, res) => {
    try{
        const pid = req.params.pid

        const product = await productDao.getProductById(pid)
        if(!product) {
            return res.status(404).json({
                code: 404,
                message: "El producto no se encontró registrado"
            })
        }

        await productDao.deleteProduct(pid, product)

        res.status(200).json({
            code: 200,
            message: `Se elimino el producto ${product.name}`
        })
    }catch(e){
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al eliminar el producto"
        })
    }
})

export default productRouter;