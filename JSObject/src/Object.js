var countries = [
    norway = {
        name: "Norway", cities: [
            oslo = {name: "Oslo", population: 1026758},
            bergen = {name: "Bergen", population: 271949},
            trondheim = {name: "Trondheim", population: 182035},
            stavanger = {name: "Stavanger", population: 130754}
        ]
    },
    usa = {
        name: "USA", cities: [
            washington = {name: "Washington", population: 633427},
            newYork = {name: "NewYork", population: 8623000},
            losAngeles = {name: "LosAngeles", population: 4000000}
        ]
    },
    russia = {
        name: "Russia", cities: [
            novosibirsk = {name: "Novosibirsk", population: 1511000},
            moscow = {name: "Moscow", population: 11920000},
            saintPetersburg = {name: "saintPetersburg", population: 4991000},
            krasnoyarsk = {name: "Krasnoyarsk", population: 1007000}
        ]
    }];

var countriesWithMaxCitiesList = getCountriesListWithMaxCities(countries);
console.log(countriesWithMaxCitiesList);

var informationObject = createInformationObjectProperty(countries);
console.log(informationObject);

function getCityPopulation(city) {
    return city.population;
}

function getSumPopulation(country) {
    return country.cities.map(getCityPopulation).reduce(function (sum, number) {
        return sum + number;
    }, 0);
}

function createInformationObjectProperty(countries) {
    var obj = {};
    countries.forEach(function (item) {
        var itemName = item.name;
        obj[itemName] = getSumPopulation(item);
    });
    return obj;
}

function getCitiesCount(country) {
    return country.cities.length;
}

function sortDescending(a, b) {
    return b - a;
}

function getName(country) {
    return country.name;
}

function createFilteredList(countries) {
    return countries.filter(function (item) {
        return item.cities.length === countries.map(getCitiesCount).sort(sortDescending)[0];
    });
}

function getCountriesListWithMaxCities(countries) {
    return createFilteredList(countries).map(getName);
}

