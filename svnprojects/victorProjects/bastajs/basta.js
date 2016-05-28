var basta = {};

// mean - returns the average of the values
basta.mean = function(arr) {
  return basta.sum(arr) / arr.length;
};

// median - returns the sorted middle value, or average of middle values
basta.median = function(arr) {
  var sorted = basta.sort(arr);
  var half = Math.floor(arr.length / 2);
  if (arr.length % 2) 
    return sorted[half];
  else
    return (sorted[half - 1] + sorted[half]) / 2;
};

// mode - returns empty array if no value occurs more than once, else returns an array of most occurring value(s)
basta.mode = function(arr) {
  if (arr.length === 0 || arr.length ===1)
    return [];
  var counter = {}, mode = 0, max = 0;
  for (var i in arr) {
    if (!(arr[i] in counter))
      counter[arr[i]] = 0;
    counter[arr[i]]++;
    if (counter[arr[i]] == max)
      mode.push(arr[i]);
    else if (counter[arr[i]] > 1 && counter[arr[i]] > max) {
      max = counter[arr[i]];
      mode = [arr[i]];
    }
  }
  if (mode === 0)
    return [];
  else
    return mode;
};

// range - returns the difference between the lowest and highest values
basta.range = function(arr) {
  var sorted = basta.sort(arr);
  return sorted[arr.length - 1] - sorted[0];
};

// sort - returns an array with values ordered from lowest to highest
basta.sort = function(arr) {
  return arr.slice().sort(function(a, b) {return a - b;});
};

// sd - returns the standard deviation of the values
basta.sd = function(arr) {
  return Math.sqrt(basta.variance(arr));
};

// sum - returns the sum of the values of the array
basta.sum = function(arr) {
  var total = 0;
  for (var i = 0; i < arr.length; i++)
    total += arr[i];
  return total;
};

// variance - returns the variance of the values
basta.variance = function(arr) {
  var mean = basta.mean(arr), sosd = [];
  for (var i = 0; i<arr.length; i++) {
    sosd.push((arr[i] - mean)*(arr[i] - mean));
  }
  return basta.mean(sosd);
};
