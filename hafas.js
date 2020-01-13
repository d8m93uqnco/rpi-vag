const { MAX_CHECK_DURATION } = require("./app");

const { Abfahrt } = require("./Abfahrt");
const createHafas = require('db-hafas');
// Scherrerplatz (Frbg) id: '808219'
// Markgrafenstr (Frbg) id: '808230'
// Hauptstr (Frbg)      id: '808112'
// Tech. Fak (Frbg)     id: '808282'
// Messe/Universität    id: '8000453'
// Eschholzstraße       id: '808107'
// Stadttheater         id: '808117'
// Hauptbahnhof         id: '8000107'
const hafas = createHafas('db-hafas-example');
async function getDepartures() {
	departures = new Array();
	const data = await hafas.departures('808219', { duration: MAX_CHECK_DURATION, when: new Date(new Date().getTime() + 2.5 * 60000) });
	await data.forEach(function (element, index) {
		departures[index] = new Abfahrt((element.line).name, element.direction, element.when, element.tripId);
	});
	return departures;
}
async function filterDepartures() {
	filteredDepartures = new Array(5);
	departures = await getDepartures();
	let index2 = 0;
	for (let index = 0; index < filteredDepartures.length; index++) {
		if (index2 < departures.length) {
			filteredDepartures[index] = departures[index2];
			if (departures[index2].line == "5") {
				if (departures[index2].when < 5) {
					index--;
				}
			}
			if (departures[index2].line == "14") {
				if (departures[index2].when < 2) {
					index--;
				}
			}
			index2++;
		}
		else {
			filteredDepartures[index] = new Abfahrt("", "", "", "");
		}
	}
	return filteredDepartures;
}
async function checkDetour(tripId, line) {
	const data = await hafas.trip(tripId, line);
	let vogesen = false;
	let laufener = false;
	for (let index = 0; index < data.stopovers.length; index++) {
		if (data.stopovers[index].stop.name == "Laufener Straße, Freiburg im Breisgau") {
			laufener = true;
		}
		if (data.stopovers[index].stop.name == "Vogesenstr., Freiburg im Breisgau") {
			vogesen = true;
		}
	}
	if (laufener && vogesen) {
		return "Hbf (via Laufener- u. Vogesenstr.)";
	}
	if (laufener) {
		return "Hbf (via Laufener Str.)";
	}
	if (vogesen) {
		return "Hbf (via Vogesenstr.)";
	}
	else {
		return "Hauptbahnhof";
	}
}
var destinations = {
    "Techn. Fak.: ": "808282",
    "Hauptstr.: ": "808112",
    "Messe/Uni: ": "8000453",
    "Eschholzstr.: ": "808107",
    "Stadttheater: ": "808117",
    "Hauptbahnhof: ": "8000107"
}
async function getArrivals(departures) {
    for (let i = 0; i < departures.length; i++) {
        const e = departures[i];
        for (const key in destinations) {
            if (e.ziele.length == 4) {
                break
            }
            const to = destinations[key];
            const data = await hafas.journeys(e.from,to)
            if (data.journeys[0].legs[0].tripId==e.tripId) {
                var arrv_date = await data.journeys[0].legs[(data.journeys[0].legs.length)-1].arrival.split("T")[1].split("+")[0].slice(0,-3)
                e.ziele[(e.ziele.length)] = key + arrv_date
            }
        }
    }
}

async function checkDepartures() {
	const filteredDepartures = await filterDepartures();
	//const filteredDepartures = await getArrivals(filterDepartures);
	for (let index = 0; index < filteredDepartures.length; index++) {
		if (filteredDepartures[index].direction == "Hauptbahnhof") {
			filteredDepartures[index].direction = await checkDetour(filteredDepartures[index].tripId, filteredDepartures[index].line);
		}
	}
	return filteredDepartures;
}
// Journey from x to y
// check if tripId == tripId
// get arrival time

// journey from x to laufener/vogesen
// check if tripId == tripId
// set laufener/vogesen
exports.checkDepartures = checkDepartures;