const express = require("express");

const queryController = require("../controllers/query");

const router = express.Router();

router.get("/studentQuery", queryController.getStudentQuery);
router.post("/studentQuery", queryController.postStudentQuery);
router.get("/getQuestionNumber", queryController.getQuestionNumber);

router.get("/taQuery", queryController.getTAQuery);
router.post("/taQuery", queryController.postTAQuery);

module.exports = router;
