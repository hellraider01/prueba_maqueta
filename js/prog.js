function fix(k) {
	var t0, t1 = k * 2 * Math.PI;

	// Solve for theta numerically.
	if (k > 0 && k < 1) {
		t1 = Math.pow(12 * k * Math.PI, 1 / 3);
		for (var i = 0; i < 10; ++i) {
			t0 = t1;
			t1 = (Math.sin(t0) - t0 * Math.cos(t0) + 2 * k * Math.PI) / (1 - Math.cos(t0));
		}
		k = (1 - Math.cos(t1 / 2)) / 2;
	}
	return k;
}

function drawCircularProgressBar(selection, k) {
	if (selection) {
		var r = 240;       // radius of the ball
		var h = 0;
		var zero = 0;
		var one = 0;
		var text = "N/A";
		if (k >= 0) {
			var fixed = fix(k);
			h = r * 2 * (1 - fixed);
			zero = 1;
			one = k;
			text = parseInt(k * 100);
		}

		selection.selectAll("svg").remove();
		selection.append("svg").attr("width", "70%").attr("height", "70%")
			.attr("viewBox", "0 0 " + r*2 + " " + r*2)
			.call(function(e) {
				var defs = e.append("defs")
				var clip = defs.append("clipPath").attr("id", "clip")
				.append("rect").attr("x", "-" + r).attr("y", "-" + r)
				.attr("width", r*2).attr("height", h);

			g = e.append("g").attr("transform", "translate(" + r + "," + r + ")");
			g.append("circle").attr("r", r).attr("fill", "rgba(255, 255, 255, 0.1)");
			g.append("circle").attr("r", r).style("fill", "rgba(255, 255, 255, 0.2)").style("fill-opacity", 0.5).attr("clip-path", "url(#clip)");
			g.append("text").attr("class", "value").attr("text-anchor", "middle").attr("font-size", "70").style("fill", "white").style("fill-opacity", .7).text(text);
			});
	}
}
