// get request's property
const  pick = (object, keys) => {
    return keys.reduce((obj, key) => {
        if(object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key]
        }
    },{})
}

module.exports = pick
