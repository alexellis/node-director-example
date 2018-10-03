"use strict"

module.exports = (context, callback) => {
    callback(undefined, {input1: JSON.parse(context)});
}
