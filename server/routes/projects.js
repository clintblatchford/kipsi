const express = require("express");
const router = express.Router();
const fs = require("fs");

const allProjects = require("./projects.json");

router.get("/", (req, res) => {
  res.status(200).json(allProjects);
});

router.get("/:projectId", (req, res) => {
  const id = req.params.projectId;
  if (allProjects[id]) {
    res.status(200).json({
      project: allProjects[id],
      id,
    });
  } else res.status(404).json({ message: "resource not found" });
});

router.post("/", (req, res, next) => {
  let newObj;
  let id;
  fs.readFile(
    process.cwd() + "/routes/projects.json",
    "utf8",
    function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data);
        id = Object.keys(obj).length;
        newObj = {
          id: id,
          name: req.body.name,
          expenses: [
            {
              name: req.body.name + "1",
              amount: req.body.expense1,
              timestamp: Date.now() - 4000000000,
            },
            {
              name: req.body.name + "2",
              amount: req.body.expense2,
              timestamp: Date.now() - 4000000000,
            },
            {
              name: req.body.name + "3",
              amount: req.body.expense3,
              timestamp: Date.now() - 4000000000,
            },
            {
              name: req.body.name + "4",
              amount: req.body.expense4,
              timestamp: Date.now() - 4000000000,
            },
          ],
          metadata: req.body.name,
        };
        obj[id] = newObj;
        json = JSON.stringify(obj);
        fs.writeFile(
          process.cwd() + "/routes/projects.json",
          json,
          "utf8",
          () => {}
        );
      }
    }
  );
  res.send({
    id: Object.keys(allProjects).length,
    name: req.body.name,
    expenses: [
      {
        name: req.body.name + "1",
        amount: req.body.expense1,
        timestamp: Date.now() - 4000000000,
      },
      {
        name: req.body.name + "2",
        amount: req.body.expense2,
        timestamp: Date.now() - 4000000000,
      },
      {
        name: req.body.name + "3",
        amount: req.body.expense3,
        timestamp: Date.now() - 4000000000,
      },
      {
        name: req.body.name + "4",
        amount: req.body.expense4,
        timestamp: Date.now() - 4000000000,
      },
    ],
    metadata: req.body.name,
  });
});

module.exports = router;
