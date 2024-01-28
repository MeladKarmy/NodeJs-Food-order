const Pizza = require("../Models/products");
const Category = require("../Models/category");
const ErrorHandling = require("../Utils/errorHandling");
const asyncHandaler = require("../Utils/handelasync");
const features = require("../Utils/feature");
exports.getAllPizza = asyncHandaler(async (req, res, next) => {
  const feature = new features(
    Pizza.find().populate("category", "nameEn"),
    req.query
  )
    .filter()
    .sort()
    .limitFields();
  // .paginate();
  let pizza = await feature.query;
  if (pizza.length == 0) {
    const err = new ErrorHandling("Items Not Found!", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    length: pizza.length,
    data: {
      pizza,
    },
  });
});

exports.getPizza = asyncHandaler(async (req, res, next) => {
  const pizza = await Pizza.findById(req.params.id);

  if (!pizza) {
    const err = new ErrorHandling("Pizza with that ID is Not Found !", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    data: {
      pizza,
    },
  });
});

exports.createPizza = asyncHandaler(async (req, res, next) => {
  let checkPizza = await Pizza.findOne({
    $or: [{ nameEn: req.body.nameEn }, { nameAr: req.body.nameAr }],
  });
  if (checkPizza) {
    const err = new ErrorHandling(
      "Pizza with that Name is Found! , Please try with another Name..",
      404
    );
    return next(err);
  }
  let checkCategory = await Category.findById(req.body.category);
  if (!checkCategory) {
    const err = new ErrorHandling(
      "Category with that ID is Not Found! , Please try Write Valid ID..",
      404
    );
    return next(err);
  }
  const user = await Pizza.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      checkPizza,
    },
  });
});

exports.updatePizza = asyncHandaler(async (req, res, next) => {
  if (req.body.nameEn || req.body.nameAr) {
    let checkPizza = await Pizza.findOne({
      $or: [{ nameEn: req.body.nameEn }, { nameAr: req.body.nameAr }],
    });
    if (checkPizza) {
      const err = new ErrorHandling(
        "Pizza with that Name is Found! , Please try with another Name..",
        404
      );
      return next(err);
    }
  }
  if (req.body.category) {
    let checkCategory = await Category.findById(req.body.category);
    if (!checkCategory) {
      const err = new ErrorHandling(
        "Category with that ID is Not Found! , Please try Write Valid ID..",
        404
      );
      return next(err);
    }
  }
  const updatedPizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPizza) {
    const error = new ErrorHandling("Pizza With that ID is Not Found!", 404);
    return next(error);
  }

  res.status(200).json({
    status: "success",
    data: {
      pizza: updatedPizza,
    },
  });
});

exports.deletePizza = asyncHandaler(async (req, res, next) => {
  const deletedPizza = await Pizza.findByIdAndDelete(req.params.id);

  if (!deletedPizza) {
    const error = new ErrorHandling("Pizza with that ID is Not Found!", 404);
    return next(error);
  }

  res.status(204).json({
    status: "success",
    data: `Pizza with that ID : ${req.params.id} is Deleted !`,
  });
});
