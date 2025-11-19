exports.generate = async (req, res) => {
  console.log(req.body)
  res
    .status(200)
    .json({ sucess: true, data: "This is your data." });
};
