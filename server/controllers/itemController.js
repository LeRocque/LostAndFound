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
    return next(errMessage);
  }
};

module.exports = itemController;
