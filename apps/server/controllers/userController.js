exports.test = async (req,res, next)=>{
    res.status(200).json({
        msg:'hello from the server, test api called'
    });
}

