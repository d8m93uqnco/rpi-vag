const { checkDepartures } = require("../hafas");

var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
	const departures = await checkDepartures()
	now = new Date();
	res.render('index', {
		line_div_0: 'div class="line line-' + departures[0].line + '"',
		line_name_0: departures[0].line,
		direction_0: departures[0].direction,
		when_0: departures[0].when_decorated,
		line_div_1: 'div class="line line-' + departures[1].line + '"',
		line_name_1: departures[1].line,
		direction_1: departures[1].direction,
		when_1: departures[1].when_decorated,
		line_div_2: 'div class="line line-' + departures[2].line + '"',
		line_name_2: departures[2].line,
		direction_2: departures[2].direction,
		when_2: departures[2].when_decorated,
		line_div_3: 'div class="line line-' + departures[3].line + '"',
		line_name_3: departures[3].line,
		direction_3: departures[3].direction,
		when_3: departures[3].when_decorated,
		line_div_4: 'div class="line line-' + departures[4].line + '"',
		line_name_4: departures[4].line,
		direction_4: departures[4].direction,
		when_4: departures[4].when_decorated
	});
});

module.exports = router;