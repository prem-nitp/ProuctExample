const express = require("express")
const mongoose = require("mongoose")
const Product = require('./models/product')
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("Mongo connection open!!!")
    })
    .catch(err => {
        console.log("Ohh!! Mongo no error!!")
        console.log(err);
    })

const app = express()

const path = require("path")
app.set('views', path.join(__dirname, 'views'));
app.set('view - engine', 'ejs');
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    // console.log(products);
    res.render('products/index.ejs', { products });
})
app.post('/products', (req, res) => {
    //console.log(req.body)
    const newProduct = new Product(req.body);
    newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`);
})
app.get('/products/new', (req, res) => {
    res.render('products/new.ejs')
})
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const foundProducts = await Product.findById(id);
    res.render('products/show.ejs', { foundProducts });
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})
