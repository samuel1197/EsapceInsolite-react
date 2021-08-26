import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import {isAdmin, isAuth} from '../utils.js';

const productRouter = express.Router();

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const products = await Product.find({});
        res.send(products);
    })
);

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    })
);

productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.send(404).send({ message: 'Produit non trouvé' });
        }
    })
);

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) =>{
    const product = new Product({
        name:'sample name' + Date.now(),
        image: '/images/cabane-besancon.jpg',
        price: 0,
        category: 'sample category',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',

    });
    const createdProduct = await product.save();
    res.send({ message: 'Location créer', product: createdProduct });
}));

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const updatedProduct = await product.save();
        res.send({message:'Location modifié', product: updatedProduct});
    } else {
        res.status(404).send({ message:'Location introuvable' });
    }
})
);

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) =>{
    const product = await Product.findById(req.params.id);
    if(product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Location supprimé', product: deleteProduct });
    } else {
        res.status(404).send({ message: 'Location introuvable '});
    }
})
);
export default productRouter;
