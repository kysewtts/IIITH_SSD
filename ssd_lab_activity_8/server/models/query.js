const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const querySchema = new Schema({
  exam_name: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
  question_num: {
    type: Number,
    required: true,
  },
  ta_roll: {
    type: String,
    required: true,
  },
  std_roll: {
    type: String,
    required: true,
  },
  ta_comment: {
    type: String,
    default: "",
    required: false,
  },
  std_comment: {
    type: String,
    default: "",
    required: true,
  },
  IsActive: {
    type: Boolean,
    default: true,
    required: false,
  },
});

module.exports = mongoose.model("Query", querySchema);
