const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'RegisteredUser'
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;