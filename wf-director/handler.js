"use strict"

const request = require('request-promise-native');

module.exports = (context, callback) => {
    var gw = process.env.gateway_url || "http://gateway:8080/function/";
    let input = JSON.parse(context);

    // Would suggest await/async or using the async library and a pipeline
    request.get(make(gw, "task-1", input))
    .then(res1 => {
        console.error(`task-1 - ${res1}`)

        request.get(make(gw, "task-2", res1))
        .then(res2 => {
            console.error(`task-2 - ${res2}`)

            request.get(make(gw, "task-3", res2))
            .then(res3 => {
                console.error(`task-3 - ${res3}`)

                callback(undefined, res3);
            })
        })
    })
    .catch(e => {
        callback(e);
    });
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