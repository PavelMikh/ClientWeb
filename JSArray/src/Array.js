function createRandomArray(length, max) {
    return Array.apply(null, Array(length)).map(function () {
        return Math.round(Math.random() * max);
    });
}

function createNumbersList(initialNumber, finalNumber) {
    var result = [];
    for (var i = initialNumber; i <= finalNumber; i++) {
        result.push(i);
    }
    return result;
}

function sortDescending(arr) {
    arr.sort(function (a, b) {
        return a - b;
    })
}

function getSum(arr) {
    return arr.reduce(function (sum, number) {
        return sum + number;
    }, 0);
}

function getEvenList(arr) {
    return arr.filter(function pred(number) {
        return number % 2 === 0;
    });
}

function getPowList(arr, exponent) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(Math.pow(arr[i], exponent));
    }
    return result;
}

var array = createRandomArray(10, 10);
sortDescending(array);
console.log(array);

console.log(array.slice(0, 5));

console.log(array.slice(5));

var evenArray = getEvenList(array);
var sum = getSum(evenArray);
console.log(sum);

var numbers = createNumbersList(1, 100);
console.log(numbers);

var evenList = getEvenList(numbers);
var evenPowList = getPowList(evenList, 2);
console.log(evenPowList);
