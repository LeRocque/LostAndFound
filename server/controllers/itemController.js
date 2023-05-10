const Item = require("../models/itemModel");

const itemController = {};

itemController.addItem = async (req, res, next) => {
  const { itemName } = req.body;
  console.log("At addItem");
  // console.log("itemName from req.body", req.body);
  try {
    const newItem = await Item.create({
      itemName: itemName,
    });
    res.locals.newItem = newItem;
    return next();
  } catch (err) {
    const errMessage = {
      log: "Error occured in itemController.addItem",
      status: 400,
      message: { err },
    };
    if (err.code === 11000) {
      errMessage.message = "Duplicate items cannot be added";
    }
    return next(errMessage);
  }
};

itemController.dbQuery = async (req, res, next) => {
  console.log("At dbQuery");
  try {
    const dbData = await Item.find();
    res.locals.dbData = dbData;
    return next();
  } catch (err) {
    const errMessage = {
      log: "Error occured in itemController.dbQuery",
      status: 400,
      message: { err },
    };
    return next(errMessage);
  }
};

itemController.deleteItem = async (req, res, next) => {
  console.log("At deleteItem");
  const { _id } = req.body;
  try {
    const removed = await Item.findOneAndDelete({ _id: _id });
    res.locals.deletedItem = removed;
    next();
  } catch (err) {
    const errMessage = {
      log: "Error occured in itemController.deleteItem",
      status: 400,
      message: { err },
    };
    return next(errMessage);
  }
};

module.exports = itemController;
