const { Router } = require("express");
const router = Router();
require("passport")

router.get("/", (req, res, next) => {
  req.session.destroy()
});

module.exports = router;
