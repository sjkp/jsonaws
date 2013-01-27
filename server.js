var express = require('express'),
    aws = require('aws-lib');

var app = express();

// middelware config
//app.use(express.compiler({ src: __dirname + '/public', enable: ['less'] }));
app.use(express.static(__dirname+ '/public'));

var yourAccessKeyId = "AKIAJAKLGEGPEU3SM26Q",
    yourSecretAccessKey = "VSV3oimSscauPBygupkPheYpVe5M0Lt5zUUVNLWK",
    yourAssociateTag = "wwwakademibog-21";

app.get('/search', function (req, res) {
    var tag = req.query.tag == null ? yourAssociateTag : req.query.tag;
    var prodAdv = aws.createProdAdvClient(yourAccessKeyId, yourSecretAccessKey, tag, {host: "ecs.amazonaws.co.uk",
    version: "2011-08-01", region:"UK"});

    var options = { SearchIndex: "Books", Keywords: req.query.k, ResponseGroup: "OfferSummary,Images,ItemAttributes" }

    prodAdv.call("ItemSearch", options, function (err, result) {
        res.json(result);
    });
});

app.get('/', function (req, res) {
    res.redirect('/index.html');
})


var port = process.env.PORT;
if (port == null)
{
    port = 3000;
}
app.listen(port);
console.log("Express server listening on port %d in %s mode", port);