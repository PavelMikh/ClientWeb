document.addEventListener("DOMContentLoaded", function () {
    var calcButton = document.getElementById("calculation-button");
    var celsius = document.getElementById("celsius");
    var kelvin = document.getElementById("kelvin");
    var fahrenheit = document.getElementById("fahrenheit");

    calcButton.addEventListener("click", function () {
        var newCelsiusValue = celsius.value;

        if (newCelsiusValue === "") {
            kelvin.value = "";
            fahrenheit.value = "";
            return;
        }

        if (isNaN(parseInt(newCelsiusValue))) {
            var errorMessage = "Ввели не число!";
            kelvin.value = errorMessage;
            fahrenheit.value = errorMessage;
        } else {
            var number = parseInt(newCelsiusValue);
            kelvin.value = number + 273.15;
            fahrenheit.value = number * 1.8 + 32;
        }
    });
});