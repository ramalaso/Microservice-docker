const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

//Connect to MongoDb
mongoose
    .connect(
        'mongodb://localhost:27017/docker-node-mongo',
        { useNewUrlParser: true}
    )
    .then(()=>console.log('MongoDb Connected...'))
    .catch((err)=>console.log(err))


const Item = require('./models/Item')

app.get('/', (req, res) => {
    Item.find()
        .then(items=>res.render('index', { items}))
        .catch(err => res.status(404).json({msg: 'No items found.'})) 
});

app.post('/item/add', (req, res)=>{
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item=>res.redirect('/'));
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});