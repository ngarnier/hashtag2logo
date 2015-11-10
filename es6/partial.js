
function fill (nArray, array) {
  let i = 0;
  return array.map((e) => !e ? nArray[i++] : e);
}

export default function partial (fn, ...args) {
  return (...nArgs) => fn.apply(null, fill(nArgs, args));
}
