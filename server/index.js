const express = require("express");
const mongoOp = require("./mongo");
const app = express();
const router = express.Router();
var cors = require("cors");

app.use(cors());

var bodyParser = require("body-parser");
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


router.get("/fraudplot", (req, res) => {
  var query = {};
  mongoOp
    .find({}, {}, query)
    .select({ _id: 1, isFraud: 1, X1: 1, X2: 1, X3: 1 })
    .limit(20)
    .exec(function(err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { error: true, message: "Error fetching data" };
      } else {
        response = { error: false, message: data };
      }
      res.send(response);
    });
});

router.post("/fraud", (req, res) => {
  var pageNo = req.body.pageNo;
  var size = req.body.size;
  var sortobject = req.body.sortobject;
  var filterobject = req.body.filter;
  var query = {};
  var filter = {};
  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "invalid page number, should start with 1"
    };
    return res.json(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  filterobject.map(d => {
    filter[d.id] = new RegExp(d.value, "i");
  });

  mongoOp
    .find(filter, {}, query)
    .sort(sortobject)
    .select({
      _id: 1,
      isFraud: 1,
      X1: 1,
      X2: 1,
      X3: 1,
      device: 1,
      session: 1,
      cluster: 1
    })
    .exec(function(err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { error: true, message: "Error fetching data" };
      } else {
        response = { error: false, message: data };
      }
      res.send(response);
    });
  //res.send(test);
});

router.get("/fraudlength", (req, res) => {
  var query = {};
  // Find some documents
  response = NaN;
  mongoOp.countDocuments({}, function(err, count) {
    if (err) {
      response = { error: true, length: "Error fetching data" };
    } else {
      response = { error: false, length: count };
    }
    return res.json(response);
  });
});

app.use("/api", router);
app.listen(5050, err => {
  console.log('Listening');
});
