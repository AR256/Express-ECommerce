const mongoose = require('mongoose');
let productSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minLength: 3,
    },
    description: {
        type: String,
        required: true,
        minLength: 3,
    },
    photo:
    {
        type: String
        , required: true
    },
    seller:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    },
    creationDate:
    {
        type: Date,
        default: Date.now
    }
})
productSchema.index({ name: 'text' });

module.exports = mongoose.model('Product', productSchema);