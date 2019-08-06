const express = require("express");
const { members } = require("../../data/data");
const uuid = require("uuid");
const router = express.Router();

// send json members
router.get("/", (req, res) => {
  res.json(members);
});

// Get 1 member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === Number(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === Number(req.params.id))[0]);
  } else {
    res.status(400).send("User not found");
  }
});

// Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age
  };
  console.log(newMember.name);
  console.log(newMember.age);
  if (!newMember.name || !newMember.age) {
    return res.status(400).json({ msg: "Please include a name and age" });
  }
  members.push(newMember);
  res.json(members);
});

// update 1 member
router.put("/:id", (req, res) => {
  const updatedMember = req.body;
  const found = members.some(member => member.id === Number(req.params.id));
  if (found) {
    members.forEach(member => {
      if (member.id === Number(req.params.id)) {
        member.name = updatedMember ? updatedMember.name : member.name;
        member.age = updatedMember ? updatedMember.age : member.age;

        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).send(`User with id${req.params.id} was not found`);
  }
});

// delete 1 member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === Number(req.params.id));
  if (found) {
    members = [...members.filter(member => member.id !== Number(req.params.id))];
    res.json(members);
  } else {
    res.status(400).send("User not found");
  }
});

module.exports = router;
