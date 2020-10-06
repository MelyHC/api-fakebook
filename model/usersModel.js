const { verifyUser} = require();

const aunthUser = (req, res, callback) => {
  const { pass, email } = req.body;

  if (!pass.trim() || !email.trim()) {
    return callback(400);
  }
  callback();
}

const verifyUserDb = (req, res, callback) => {

}