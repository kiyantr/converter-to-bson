function ObjectId(id) { return id;}
function ISODate(d) {return d;}

var isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

convert = (obj, parent) => {
  try {
    if (obj === null) {
      return null;
    }

    if (obj.constructor === Array) {
        return `new BsonArray { ${obj.map(x =>  convert(x))} }`;
      }

      if (obj.constructor !== Object) {
        if(obj.constructor === Boolean) return obj;
        return `"${obj}"`;
      }

    const keys = Object.keys(obj);
    let res = "";
    for (const key of keys) {
      let val = convert(obj[key]);
      if (parent !== null) {
        res += `new BsonDocument { { "${key}", ${val} } }`;
      } else {
        res += `{"${key}", ${val}}, `;
      }
    }
    return res;
  } catch (error) {}
};

module.exports = (obj) => convert(obj.constructor === String ? eval('(' + obj + ')') : obj, null);
