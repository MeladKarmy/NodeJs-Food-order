const massages = require("../Models/massages");
const ErrorHandling = require("../Utils/errorHandling");
const asyncHandaler = require("../Utils/handelasync");
const features = require("../Utils/feature");

exports.getAllMassage = asyncHandaler(async (req, res, next) => {
  const feature = new features(massages.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  let Massage = await feature.query;
  if (Massage.length == 0) {
    const err = new ErrorHandling("No Massage Found!", 404);
    return next(err);
  }

  res.status(200).json({
    status: "success",
    length: Massage.length,
    data: {
      Massage,
    },
  });
});

exports.getMassage = asyncHandaler(async (req, res, next) => {
  const Massage = await massages.findById(req.params.id);

  if (!Massage) {
    const err = new ErrorHandling("Massage with that ID is Not Found !", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    data: {
      Massage,
    },
  });
});

exports.createMassage = asyncHandaler(async (req, res, next) => {
  let checkMassage = await massages.findOne({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
  });
  if (checkMassage) {
    const err = new ErrorHandling("Subject with that Subject Is Found!", 409);
    return next(err);
  }

  const Massage = await massages.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      Massage,
    },
  });
});

exports.updateMassage = asyncHandaler(async (req, res, next) => {
  const updatedMassage = await massages.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedMassage) {
    const error = new ErrorHandling("Massage with that ID is not found!", 404);
    return next(error);
  }

  res.status(200).json({
    status: "success",
    data: {
      Category: updatedMassage,
    },
  });
});

exports.deleteMassage = asyncHandaler(async (req, res, next) => {
  const deletedMassage = await massages.findByIdAndUpdate(req.params.id, {
    status: false,
  });

  if (!deletedMassage) {
    const error = new ErrorHandling("Massage with that ID is Not Found!", 404);
    return next(error);
  }

  res.status(204).json({
    status: "success",
    data: `Massage with that ID : ${req.params.id} is Deleted !`,
  });
});
