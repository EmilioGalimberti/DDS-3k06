module.exports = {
    index: function(req, res){
        res.render('index')
    },
    admin: function(req, res){
        res.send('hola Admin' + req.query.user)
    }
}
