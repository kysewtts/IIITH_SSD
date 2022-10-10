const Query = require("../models/query");

exports.postStudentQuery = (req, res, next) => {
  console.log(req.body);
  const exam_name = req.body.exam_name;
  const course_name = req.body.course_name;
  const question_num = req.body.question_num;
  const ta_roll = req.body.ta_roll;
  const std_roll = req.session.user.roll;
  const std_comment = req.body.std_comment;

  // if (req.session.user.roll != std_roll) {
  //   const error = new Error("Not Authorised!");
  //   error.statusCode = 401;
  //   throw error;
  // }

  const query = new Query({
    exam_name,
    course_name,
    question_num,
    ta_roll,
    std_roll,
    std_comment,
  });

  query
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created successfully",
        data: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getStudentQuery = (req, res, next) => {
  const std_roll = req.session.user.roll;
  // const role = req.session.user.role;

  // if (req.session.user.roll != std_roll) {
  //   const error = new Error("Not Authorised!");
  //   error.statusCode = 401;
  //   throw error;
  // }

  Query.find({ std_roll })
    .then((result) => {
      res.status(200).json({
        message: "Fetched successfully!",
        result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postTAQuery = (req, res, next) => {
  // const std_roll = req.body.std_roll;
  // const course_name = req.body.course_name;
  // const question_num = req.body.question_num;
  // const ta_roll = req.body.ta_roll;
  const queryId = req.body.queryId;
  const ta_comment = req.body.taComment;

  console.log(queryId, ta_comment);
  // if (req.session.user.roll != ta_roll) {
  //   const error = new Error("Not Authorised!");
  //   error.statusCode = 401;
  //   throw error;
  // }

  // Query.findOne({ std_roll, course_name, question_num })
  Query.findOne({ _id: queryId })
    .then((query) => {
      // if(query.ta_roll != res.session.user.roll){
      //   const error = new Error("Not Authorsied");
      //   error.statusCode = 401;
      //   throw error;
      // }
      query.ta_comment = ta_comment;
      query.IsActive = false;
      return query.save();
    })
    .then((resp) => {
      res.status(200).json({
        message: "Successful",
        data: resp,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTAQuery = (req, res, next) => {
  const ta_roll = req.session.user.roll;
  // if (req.session.user.roll != ta_roll) {
  //   const error = new Error("Not Authorised!");
  //   error.statusCode = 401;
  //   throw error;
  // }
  Query.find({
    ta_roll,
  })
    .then((result) => {
      res.status(200).json({
        message: "Successful",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getQuestionNumber = (req, res, next) => {
  if (!req.session.user) {
    const error = new Error("Not Authorised!");
    error.statusCode = 401;
    throw error;
  }
  const std_roll = req.session.user.roll;
  const course_name = req.body.course_name;

  console.log(req.body);
  Query.find({ std_roll })
    .sort("question_num")
    .then((resp) => {
      if (resp.length == 0) {
        res.status(200).json({
          message: "Fetched question number",
          question_num: 1,
        });
      } else {
        res.status(200).json({
          message: "Fetched question number",
          question_num: resp[resp.length - 1].question_num + 1,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
