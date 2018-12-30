// * This middleware makes sure that the user is logged in before passing the request on. Makes use of 'req.user' from Passport

module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: "You must log in!" });
    };

    next();
}