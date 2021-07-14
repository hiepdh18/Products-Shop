

module.exports = async (req, res, next) => {
    try {
        if (req.userData.role === "user") {
            res.status(401).json('No permision!!!')
        } else
            next();
    } catch (error) {
        console.log(error)
    }
}