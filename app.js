var express = require('express')
var app = express();
var jade = require('jade');

//var request = require('request');
app.use('/js', express.static('js'))
app.use('/css', express.static('css'))
app.use('/img', express.static('img'))


app.get('/:id', function (req, res, next) {
    var file = 'index';
    var page = (req.params.id || file) + ".pug";
    var html = jade.renderFile('/pages/layout.pug', {page:page});
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(html);
});



app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
