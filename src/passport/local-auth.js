const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/Users");
const { v4: uuidv4 } = require("uuid");
const { getToken, getTokenData } = require("../config/jwt.config");
const { getTemplate, sendEmail } = require("../config/mail.config");
const { getTokeen } = require("../config/jwt.forgot");
const { getTemplatee, sendEemail } = require("../config/mail.forgot");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email: email });
      if (user) {
        return done(null, false, console.log("Email already taken."));
      } else {
        // Generar el código
        const code = uuidv4();

        const newUser = new User();
        newUser.email = email;
        newUser.code = code;
        newUser.password = newUser.encryptPassword(password);

        // Generar token
        const token = getToken({ email, code });

        // Obtener un template
        const template = getTemplate(email, token);

        // Enviar el email
        await sendEmail(email, "Confirm your account", template);
        await newUser.save();
        done(null, newUser);
      }
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, console.log("No user found."));
      }
      if (!user.comparePassword(password)) {
        return done(null, false, console.log("Incorrect password."));
      }
      done(null, user);
    }
  )
);

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("Email doesn't exist");
  } else {
    const code = uuidv4();
    user.code = code;
    const token = getTokeen({ email, code });
    const template = getTemplatee(email, token);
    await user.save();
    await sendEemail(email, "Recover password", template);
    res.status(200).send("Email sent");
  }
};

exports.resetPassword = async (req, res) => {
  const { email, code, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).send("Email doesn't exist ");
  } else {
    if (user.code === code) {
      user.password = user.encryptPassword(password);
      await user.save();
      res.status(200).send("Password changed");
    } else {
      res.status(404).send("Invalid code");
    }
  }
};
