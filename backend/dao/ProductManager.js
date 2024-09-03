import productsSchema from "./models/productsModel.js";

class ProductDao {
    constructor() {
        this.model = productsSchema
    }

    async getProducts() {
        return this.model.find()
    }

    async getProductById(id) {
        return this.model.findById(id)
    }

    async addProduct(body) {
        return this.model.create({
            id: body.id,
            name: body.name,
            category: body.category,
            quantity: body.quantity,
            price: body.price
        })
    }

    async updateProduct(pid, body){
        const product = await this.getProductById(pid)

        if(!product){
            throw new Error("El producto no existe")
        }

        const update = {
            _id: body._id || product._id,
            id: body.id || product.id,
            name: body.name || product.name,
            category: body.category || product.category,
            quantity: body.quantity || product.quantity,
            price: body.price || product.price
        }
        
        return this.model.updateOne({ _id: pid }, update)
    }

    async deleteProduct(pid, product){
        return this.model.deleteOne({_id: pid}, product)
    }
}

export default ProductDao;