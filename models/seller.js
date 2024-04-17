const mongoose = require('mongoose');

let sellerSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        minLength:3,
    }
})
sellerSchema.index({ name: 'text' });

module.exports = mongoose.model('Seller', sellerSchema);