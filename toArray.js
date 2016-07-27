function totalArray(data) {
  var sum = 0;
  var l = data.length;
  for (var i = 0; i < l; i++) {
    sum += data[i];
  }
  return sum;
}