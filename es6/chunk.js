
let chunk = (array, size) => {
    var R = [];
    for (var i = 0; i < array.length; i += size)
        R.push(array.slice(i, i + size));
    return R;
}

export default chunk;
