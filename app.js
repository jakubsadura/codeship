var http = require('http');

function randomNumber(upperBound) {
    return Math.floor(Math.random() * upperBound);
}

function generateResponseWithRandom3Values() {
    var result = {};

    result['a' + randomNumber(10)] = randomNumber(100);
    result['b' + randomNumber(10)] = randomNumber(100);
    result['c' + randomNumber(10)] = randomNumber(100);

    return result;
}

function generateInitialResponse() {
    var result = {};

    for (var i = 0; i < 10; ++i) {
        result['a' + i] = '[INIT]' + randomNumber(100);
        result['b' + i] = '[INIT]' + randomNumber(100);
        result['c' + i] = '[INIT]' + randomNumber(100);
        result['d' + i] = '[INIT]' + randomNumber(100);
    }

    return result;
}

var app = http.createServer(function (req, res) {
    
    /*
     RAW
     */
    if (req.url.indexOf('/raw_sectorsInitial') != -1) {
        var initialResponse = JSON.stringify(generateInitialResponse());
        res.setHeader('Content-Type', 'application/json');
        res.end(initialResponse);
        console.log('/sectorsInitial responding with ', initialResponse);
    } else if (req.url.indexOf('/raw_sectorsAll') != -1) {
        var randomResponse = JSON.stringify(generateResponseWithRandom3Values());
        res.setHeader('Content-Type', 'application/json');
        res.end(randomResponse);
        console.log('/sectorsAll responding with ', randomResponse);
    /*
    JSONP
     */
    } else if (req.url.indexOf('/sectorsInitial') != -1) {
        setTimeout(function() {
            var initialResponse = JSON.stringify(generateInitialResponse());
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('_testcb(\'' + initialResponse + '\')');
            console.log('/sectorsInitial responding with ', initialResponse);
        }, 5 * 1000);
    } else if (req.url.indexOf('/sectorsAll') != -1) {
        setTimeout(function() {
            var randomResponse = JSON.stringify(generateResponseWithRandom3Values());
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('_testcb(\'' + randomResponse + '\')');
            console.log('/sectorsAll responding with ', randomResponse);
        }, 2 * 1000);
    /*
    BAD REQUEST
     */
    } else {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('BAD REQUEST!\n');
        console.log('BAD REQUEST...');
    }
});

app.listen(3000);
