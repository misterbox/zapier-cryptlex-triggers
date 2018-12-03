'use strict';

module.exports =  (input) => {
    let uppercase = input.toUpperCase();
    return `${uppercase}_${uppercase}`;
}