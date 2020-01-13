const createHafas = require('db-hafas')
// Scherrerplatz (Frbg) id: '808219'
// Markgrafenstr (Frbg) id: '808230'
// Hauptstr (Frbg)      id: '808112'
// Tech. Fak (Frbg)     id: '808282'
// Messe/Universität    id: '8000453'
// Eschholzstraße       id: '808107'
// Stadttheater         id: '808117'
// Hauptbahnhof         id: '8000107'
const hafas = createHafas('db-hafas-example')

class Abfahrt {
    constructor(line, direction, when) {
        this.line = line.name;
        this.direction = direction;
        this.when = when;
        if (this.line == "14") {
            this.translateValuesToMarkgrafenstr()
        }
    }

    translateValuesToMarkgrafenstr(){
        if (this.direction == "Hauptbahnhof") {
            this.when = this.when + 1
        }
        if (this.direction == "Haid") {
            this.when = this.when - 1
        }
    }
}
async function getDepartures() {
    departures = new Array(5)
    await hafas.departures('808219', {duration:15})

    await data.forEach(function (value, i) {
        departures[i] = new Abfahrt(value.line,value.direction,value.when)
    })
    return departures;
}
    
