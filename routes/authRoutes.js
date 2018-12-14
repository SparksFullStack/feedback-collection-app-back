const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }))
    
    app.get('/auth/google/callback', passport.authenticate('google'),
        (req, res) => {
            // after the user successfully logs in we want to redirect them to the /surveys route
            res.redirect('/surveys');

        }
    )

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send('You have successfully logged out!');
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}