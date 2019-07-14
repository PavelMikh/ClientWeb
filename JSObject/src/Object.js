var countries = [
    {
        name: "Norway", cities: [
            {name: "Oslo", population: 1026758},
            {name: "Bergen", population: 271949},
            {name: "Trondheim", population: 182035},
            {name: "Stavanger", population: 130754}
        ]
    },
    {
        name: "USA", cities: [
            {name: "Washington", population: 633427},
            {name: "NewYork", population: 8623000},
            {name: "LosAngeles", population: 4000000}
        ]
    },
    {
        name: "Russia", cities: [
            {name: "Novosibirsk", population: 1511000},
            {name: "Moscow", population: 11920000},
            {name: "saintPetersburg", population: 4991000},
            {name: "Krasnoyarsk", population: 1007000}
        ]
    }];

var countriesWithMaxCitiesList = getCountriesListWithMaxCities(countries);
console.log(countriesWithMaxCitiesList);

var informationObject = getCountriesPopulationList(countries);
console.log(informationObject);

function getSumPopulation(country) {
    return country.cities.reduce(function (sum, city) {
        var currentPopulation = city.population;
        return sum + currentPopulation;
    }, 0);
}

function getCountriesPopulationList(countries) {
    var obj = {};
    countries.forEach(function (item) {
        var itemName = item.name;
        obj[itemName] = getSumPopulation(item);
    });
    return obj;
}

function createFilteredList(countries) {
    var maxCitiesValue = countries.map(function (country) {
        return country.cities.length;
    }).sort(function (a, b) {
        return b - a;
    })[0];
    return countries.filter(function (item) {
        return item.cities.length === maxCitiesValue;
    });
}

function getCountriesListWithMaxCities(countries) {
    return createFilteredList(countries).map(function (country) {
        return country.name;
    });
}

