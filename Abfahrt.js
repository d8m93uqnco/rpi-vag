class Abfahrt {
	constructor(line, direction, when, tripId) {
		const now = new Date();
		this.line = line;
		this.direction = direction;
		this.tripId = tripId;
		this.ziele = new Array()
		if (line != "") {
			this.when = new Date(when);
			if (this.line == "14") {
				this.translateValuesToMarkgrafenstr();
				this.from = "808230"
			}
			else{
				this.from = "808219"
			}
			if (this.direction == "Europaplatz, Freiburg im Breisgau") {
				this.direction = "Europaplatz";
			}
			this.when = Math.round(((this.when) - now) / 60000);
			this.when_decorated = this.when + "'";
		}
		else {
			this.when_decorated = when;
		}
	}
	translateValuesToMarkgrafenstr() {
		if (this.direction == "Hauptbahnhof") {
			this.when = new Date(this.when.getTime() + 2 * 60000);
		}
		if (this.direction == "Haid") {
			this.when = new Date(this.when.getTime() - 1 * 60000);
		}
	}
}
exports.Abfahrt = Abfahrt;
