const StoreItemModel = require("../models/StoreItemModel");

const GetAllItems = async (req, res) => {
    try {
        const items = await StoreItemModel.find();
        if (!items || items.length === 0) {
            return res.status(404).json({ message: "No Items found" });
        }
        return res.status(200).json({ items });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
};


//-----------------------------------Data Insert----------------------------------------------------------------------------------------------

const addItem = async (req, res, next) => {
    

    let Items;

    try {
        Items = new StoreItemModel({ ...req.body});
        await Items.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Failed to add item' });
    }

    // not insert Items

    if (!Items) {
        return res.status(404).send({ message: "Unable to add Item" });
    }

    return res.status(200).json({ Items });
};


//-----------------------------------------------Get by Id----------------------------------------------------------------------------------


const getByItemId = async (req, res, next) => {
    const id = req.params.id;

    let Item;

    try {
        Item = await StoreItemModel.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!Item) {
        return res.status(400).json({ message: "Item not found" });
    }

    // Display all Items

    return res.status(200).json({ Item });
};



//----------------------Update User Details -----------------------------------------------------------------------------------------------------------


const UpdateItem = async (req, res, next) => {
    const id = req.params.id;
    const { name, brand, model_number, length, width, height, quantity , price , color  } = req.body;

    let Items;

    try {
        Items = await StoreItemModel.findByIdAndUpdate(id, {
            name: name,
            brand: brand,
            model_number: model_number,
            length: length, 
            width: width, 
            height: height,
            quantity: quantity,
            price: price,     
            color: color,     

        });
        await Items.save();
    } catch (err) {
        console.log(err);
    }

    if (!Items) {
        return res.status(400).json({ message: "Unable to Update Item Details" });
    }

    // Display all Items

    return res.status(200).json({ Items });
};

//----------------------Delete  User Details -----------------------------------------------------------------------------------------------------------

const DeleteItem = async (req, res, next) => {
    const id = req.params.id;

    let Items;

    try {
        Items = await StoreItemModel.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!Items) {
        return res.status(400).json({ message: "Unable to delete Item Details" });
    }

    // Display all Items

    return res.status(200).json({ Items });
};

exports.GetAllItems = GetAllItems;
exports.addItem = addItem;
exports.getByItemId = getByItemId;
exports.UpdateItem = UpdateItem;
exports.DeleteItem = DeleteItem;
