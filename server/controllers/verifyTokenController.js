const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;



const verify_token = (req, res) => {
    const token = req.headers.authorization;
    jwt.verify(token, jwt_secret, (err, succ) => {
      err
        ? res.json({ ok: false, message: "Token is corrupted" })
        : res.json({ ok: true, succ });
    });
  };

  module.exports={
    verify_token,
}