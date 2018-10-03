"use strict"

module.exports = (context, callback) => {
    callback(undefined, {input2: JSON.parse(context)});

}
