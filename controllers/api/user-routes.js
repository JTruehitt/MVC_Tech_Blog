const { User } = require("../../models");
const router = require("express").Router();

// /api/users
// post route for sign up
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error creating new user: ${err}` });
  }
});

// post route for log in
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        user_name: req.body.user_name,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: `Incorrect username or password. Please try again.` });
      return;
    }

    const validPassword = await userData.passwordAuth(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: `Incorrect username or password. Please try again.` });
      return;
    }

    const user = userData.get({plain: true})
    console.log(user)
    console.log(user.id)

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = user.id;

      res
        .status(200)
        .json({ user, message: "Successfully logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error logging in: ${err}` });
  }
});

// post route for log out
router.post("/logout", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error logging out.`, err });
  }
});

module.exports = router;
