(function() {
  
  var app = angular.module('piApp', []);
  
  app.controller('mainCtrl', ['$scope','pi100Factory','pi1000Factory','pi10000Factory','pi100000Factory', function($scope, pi100Factory, pi1000Factory, pi10000Factory, pi100000Factory) {  
    // create chart with distribution of 100 digits of Pi
    chartMaker(pi100Factory);
    
    // create chart and change class on button press
    $scope.pi100 = function() {
      chartMaker(pi100Factory);
      var currentEl = angular.element(document.querySelector("#onehun"));
      var allButtons = angular.element(document.querySelectorAll("button"));
      allButtons.removeClass('selected');
      currentEl.addClass('selected');
    };
    
    $scope.pi1000 = function() {
      chartMaker(pi1000Factory);
      var currentEl = angular.element(document.querySelector("#onethou"));
      var allButtons = angular.element(document.querySelectorAll("button"));
      allButtons.removeClass('selected');
      currentEl.addClass('selected');
    };
    
    $scope.pi10000 = function() {
      chartMaker(pi10000Factory);
      var currentEl = angular.element(document.querySelector("#tenthou"));
      var allButtons = angular.element(document.querySelectorAll("button"));
      allButtons.removeClass('selected');
      currentEl.addClass('selected');
    };
    
    $scope.pi100000 = function() {
      chartMaker(pi100000Factory);
      var currentEl = angular.element(document.querySelector("#hunthou"));
      var allButtons = angular.element(document.querySelectorAll("button"));
      allButtons.removeClass('selected');
      currentEl.addClass('selected');
    };
    
    // callback to create chart
    function chartMaker(factory) {
      // used in title of chart
      $scope.numberOfDigits = factory.number;

      // assigns first 100,000 digits of Pi to data
      var data = factory.getPi();

      // converts data into an array of strings
      data = data.split("");

      // keeps a running total of each digit in totals array
      var totals = [0,0,0,0,0,0,0,0,0,0];
      for (var j = 0; j <= data.length; j++) {
        if (data[j] === "0") {
          totals[0] += 1;
        } else if (data[j] === "1") {
          totals[1] += 1;
        } else if (data[j] === "2") {
          totals[2] += 1;
        } else if (data[j] === "3") {
          totals[3] += 1;
        } else if (data[j] === "4") {
          totals[4] += 1;
        } else if (data[j] === "5") {
          totals[5] += 1;
        } else if (data[j] === "6") {
          totals[6] += 1;
        } else if (data[j] === "7") {
          totals[7] += 1;
        } else if (data[j] === "8") {
          totals[8] += 1;
        } else if (data[j] === "9") {
          totals[9] += 1;
        } 
      }

      // places description at beginning of array (for c3.js)
      totals.unshift("Count of Each Digit");

      // create chart
      var chart = c3.generate({
        data: {
          columns: [
            totals
          ],
          type: 'bar',
          colors: {
            "Count of Each Digit": '#2196F3'
        },
          labels: true
        },
        size: {
          height: 300
        },
        bar: {
          width: {
            ratio: 0.6 // this makes bar width 60% of length between ticks
          }
        },
        axis: {
          x: {
            tick: {
              values: [0,1,2,3,4,5,6,7,8,9]
            }
          }
        }
      });
    } // end chartMaker function
  }]); // end controller
    
})();