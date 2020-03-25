const { Router } = require("express");
const User = require("../app/models/user");

const router = Router();

router.get("/", (req, res) => {
  User.find((err, users) => {
    if (err) res.send(err);

    res.status(200).json({
      message:'Users returned.',
      users
    })
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  const user = new User();

  user.name = name;
  user.email = email;

  user.save(error => {
    if (error) res.send("[Error] failed to save user: " + error);

    res.status(201).json({ message: "User created succesfully!" });
  });
})

module.exports = router;
