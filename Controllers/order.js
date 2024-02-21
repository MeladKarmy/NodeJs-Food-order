const Order = require("../Models/orders");
const ErrorHandling = require("../Utils/errorHandling");
const asyncHandaler = require("../Utils/handelasync");
const features = require("../Utils/feature");
const users = require("../Models/users");

exports.getAllOrders = asyncHandaler(async (req, res, next) => {
  const feature = new features(Order.find(), req.query)
    .populate()
    .filter()
    .sort()
    .limitFields()
    .paginate();
  let order = await feature.query;
  if (order.length == 0) {
    const err = new ErrorHandling("No Orders Found!", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    length: order.length,
    data: {
      pizza: order,
    },
  });
});

exports.getOrder = asyncHandaler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    const err = new ErrorHandling("Order with that ID is Not Found !", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    data: {
      pizza: order,
    },
  });
});

exports.createOrder = asyncHandaler(async (req, res, next) => {
  const order = req.body.order;
  const { user, shippingDitails, orderItems, paymentMethod, totalPrice } =
    order;

  const cart = orderItems.map((product) => ({
    productId: product._id,
    nameEn: product.nameEn,
    nameAr: product.nameAr,
    amount: product.amount,
    image: product.image,
    selectSize: product.selectSize,
    selectToppings: product.selectToppings,
    offer: product.offer,
    offerNumber: product.offerNumber,
  }));

  const createOrder = await Order.create({
    user: user,
    shippingDitails,
    orderItems: cart,
    paymentMethod: paymentMethod,
    totalPrice: totalPrice,
  });

  res.status(201).json({
    status: "success",
    data: {
      pizza: createOrder,
    },
  });
});
exports.updateOrder = asyncHandaler(async (req, res, next) => {
  const updatedOrder = await users.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedOrder) {
    const error = new ErrorHandling("Order with that ID is not found!", 404);
    return next(error);
  }

  res.status(200).json({
    status: "success",
    data: {
      pizza: updatedOrder,
    },
  });
});

exports.deleteOrder = asyncHandaler(async (req, res, next) => {
  const deletedOrder = await Order.findByIdAndDelete(req.params.id);

  if (!deletedOrder) {
    const error = new ErrorHandling("Order with that ID is Not Found!", 404);
    return next(error);
  }

  res.status(204).json({
    status: "success",
    data: "Deleted Order",
  });
});
