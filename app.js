const express = require('express');
const mongoose = require('mongoose');
const sellersRoute = require('./routes/seller');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/ProjectDB').then(()=>{
    console.log("connection established");
}).catch((err)=>{
    console.log(err);
})

//middlewares
app.use(express.json())

app.use('/sellers', sellersRoute);
// app.post('/', (req, res) =>{})
// app.put('/', (req, res) => {})



const port = 3000;
console.log('Starting server...');
app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`);
});