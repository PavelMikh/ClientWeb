var novosibirsk = new City("Novosibirsk", 1511000);

var moscow = new City("Moscow", 11920000);

var saintPetersburg = new City("Saint-Petersburg", 4991000);

var krasnoyarsk = new City("Krasnoyarsk", 1007000);

var russia = new Country("Russia", [novosibirsk, moscow, saintPetersburg, krasnoyarsk]);

var washington = new City("Washington", 633427);

var newYork = new City("New York", 8623000);

var losAngeles = new City("Los Angeles", 4000000);

var usa = new Country("USA", [washington, newYork, losAngeles]);

var oslo = new City("Oslo", 1026758);

var bergen = new City("Bergen", 271949);

var trondheim = new City("Trondheim", 182035);

var stavanger = new City("Stavanger", 130754);

var norway = new Country("Norway", [oslo, bergen, trondheim, stavanger]);

var countries = [norway, usa, russia];

var countryWithMaxCitiesCountList = getCountryNameWithMaxCitiesCount(countries);
console.log(countryWithMaxCitiesCountList);

var informationObject = {};
createInformationProperty(countries);
console.log(informationObject);

function getSumPopulation(country) {
    var citiesPopulation = country["cities"].map(function (city) {
        return city["population"];
    });
    return citiesPopulation.reduce(function (sum, number) {
        return sum + number;
    });
}

function createInformationProperty(countries) {
    countries.forEach(function (item) {
        var itemName = item["name"];
        informationObject[itemName] = getSumPopulation(item);
    });
}

function City(name, population) {
    this.name = name;
    this.population = population;
}

function Country(name, cities) {
    this.name = name;
    this.cities = cities;
}

function getCountryNameWithMaxCitiesCount(countries) {
    var citiesCount = countries.map(function (item) {
        return item["cities"].length;
    });

    citiesCount = citiesCount.sort(function (a, b) {
        return b - a;
    });

    var maxCount = citiesCount[0];

    var filterCountries = countries.filter(function (item) {
        return item["cities"].length === maxCount;
    });

    return filterCountries.map(function (item) {
        return item["name"];
    });
}

