exports.generate = async (req, res) => {
  res
    .status(200)
    .json({ sucess: true, data: "This is your data." });
};

exports.handleInc = async(req,res) => { 
    console.log(req.body)
    
}
