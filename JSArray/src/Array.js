var array = createRandomArray(10, 10);
sortDescending(array);
console.log(array);

console.log(array.slice(0, 5));

console.log(array.slice(array.length - 5));

var evenArray = getEvenList(array);
var sum = getSum(evenArray);
console.log(sum);

var numbers = createNumbersList(1, 100);
console.log(numbers);

var evenList = getEvenList(numbers);
console.log(evenList);
var evenPowList = getPowList(evenList, 2);
console.log(evenPowList);

function createRandomArray(length, max) {
    length = length || 10;
    max = max || 10;

    return Array.apply(null, Array(length)).map(function () {
        return Math.round(Math.random() * max);
    });
}

function createNumbersList(initialNumber, finalNumber) {
    initialNumber = initialNumber || 1;
    finalNumber = finalNumber || 100;

    var result = [];
    var i = initialNumber;
    while (i <= finalNumber) {
        result.push(i);
        i++;
    }
    return result;

}

function sortDescending(arr) {
    arr.sort(function (a, b) {
        return b - a;
    })
}

function getSum(arr) {
    return arr.reduce(function (sum, number) {
        return sum + number;
    }, 0);
}

function getEvenList(arr) {
    return arr.filter(function (number) {
        return number % 2 === 0;
    });
}

function getPowList(arr, exponent) {
    exponent = exponent || 2;

    return arr.map(function (item) {
        return Math.pow(item, exponent);
    });
}
