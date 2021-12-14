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

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    res.render('products/index.ejs', { products });
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})
