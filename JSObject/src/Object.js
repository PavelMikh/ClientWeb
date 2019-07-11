var countries = [norway = {}, usa = {}, russia = {}];
norway.name = "Norway";
usa.name = "USA";
russia.name = "Russia";

norway.cities = [oslo = {}, bergen = {}, trondheim = {}, stavanger = {}];
oslo.name = "Oslo";
oslo.population = 1026758;

bergen.name = "Bergen";
bergen.population = 271949;

trondheim.name = "Trondheim";
trondheim.population = 182035;

stavanger.name = "Stavanger";
stavanger.population = 130754;

usa.cities = [wahshington = {}, newYork = {}, losAngeles = {}];
wahshington.name = "Washington";
wahshington.population = 633427;

newYork.name = "NewYork";
newYork.population = 8623000;

losAngeles.name = "LosAngeles";
losAngeles.population = 4000000;

russia.cities = [novosibirsk = {}, moscow = {}, saintPetersburg = {}, krasnoyarsk = {}];
novosibirsk.name = "Novosibirsk";
novosibirsk.population = 1511000;

moscow.name = "Moscow";
moscow.population = 11920000;

saintPetersburg.name = "SaintPetersburg";
saintPetersburg.population = 4991000;

krasnoyarsk.name = "Krasnoyarsk";
krasnoyarsk.population = 1007000;

var countriesWithMaxCitiesList = getCountriesListWithMaxCities(countries);
console.log(countriesWithMaxCitiesList);

var informationObject = getCountriesPopulationList(countries);
console.log(informationObject);

function getCityPopulation(city) {
    return city.population;
}

function getSumPopulation(country) {
    return country.cities.map(getCityPopulation).reduce(function (sum, number) {
        return sum + number;
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

