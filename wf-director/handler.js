"use strict"

const request = require('request-promise-native');

module.exports = (context, callback) => {
    var gw = process.env.gateway_url || "http://gateway:8080/function/"; 
    let input = JSON.parse(context);

    // Would suggest await/async or using the async library and a pipeline
    makeTaskCall(gw, "task-1", input)()
    .then( res1 => {
        return res1
    })
    .then(res1 => makeTaskCall(gw, "task-2", res1)())
    .then(res2 => makeTaskCall(gw, "task-3", res2)())
    .then(finalRes => {
        callback(undefined, finalRes);
    })
    .catch(e => {
        callback(e);
    });
}
    
var makeTaskCall = function(gw, url, input) {
    return function() {
        const urlVal = url;
        const inputVal = input;
        return request.get(make(gw, urlVal, inputVal));
    };
}

function make(url, fn, body) {
    return {
        uri: url + fn,
        method: "POST",
        body: body,
        json: true,
        "Content-Type": "application/json"
    };
}
