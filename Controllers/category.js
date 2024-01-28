const Category = require("../Models/category");
const ErrorHandling = require("../Utils/errorHandling");
const asyncHandaler = require("../Utils/handelasync");
const features = require("../Utils/feature");

exports.getAllCategory = asyncHandaler(async (req, res, next) => {
  const feature = new features(Category.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  let category = await feature.query;
  if (category.length == 0) {
    const err = new ErrorHandling("No category Found!", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    length: category.length,
    data: {
      pizza: category,
    },
  });
});

exports.getCategory = asyncHandaler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    const err = new ErrorHandling("Category with that ID is Not Found !", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.createCategory = asyncHandaler(async (req, res, next) => {
  let checkCategory = await Category.find({
    nameEn: req.body.nameEn,
    nameAr: req.body.nameAr,
  });

  if (checkCategory) {
    throw new Error(
      "Category with that Name is Found! , Please try with another Name.."
    );
  }

  const category = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      category,
    },
  });
});

exports.updateCategory = asyncHandaler(async (req, res, next) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCategory) {
    const error = new ErrorHandling("Category with that ID is not found!", 404);
    return next(error);
  }

  res.status(200).json({
    status: "success",
    data: {
      Category: updatedCategory,
    },
  });
});

exports.deleteCategory = asyncHandaler(async (req, res, next) => {
  const deletedCategory = await Category.findByIdAndUpdate(req.params.id, {
    status: false,
  });

  if (!deletedCategory) {
    const error = new ErrorHandling("Category with that ID is Not Found!", 404);
    return next(error);
  }

  res.status(204).json({
    status: "success",
    data: `Category with that ID : ${req.params.id} is Deleted !`,
  });
});
