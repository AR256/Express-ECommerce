const sellerModel = require('../models/seller');

const getAllSellers = async (req, res) => {
    try{
        const sellers = await sellerModel.find();
        res.json(sellers);
    }
    catch(err) {
        res.json(err.message);
    }
}
const getByName = async (req, res) => {
    const { name } = req.params;
    try{
        let seller = await sellerModel.find({name:name}, {});
        res.json(seller);
    }
    catch(err){
        res.json(err.message);
    }
}

const saveSeller = async (req, res) =>{
    let newSeller = req.body;
    try{
        let savedSeller = await sellerModel.create(newSeller);
        res.json(savedSeller);
    }
    catch(err){
        res.json(err.message);
    }
    
}

module.exports = {getAllSellers, getByName, saveSeller};