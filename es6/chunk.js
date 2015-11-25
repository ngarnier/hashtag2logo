/*
  chunk takes an array & an integer (size) and returns an array of arrays
  composed of size elements

*/

let chunk = (array, size) => {
    var R = [];
    for (var i = 0; i < array.length; i += size)
        R.push(array.slice(i, i + size));
    return R;
}

export default chunk;
