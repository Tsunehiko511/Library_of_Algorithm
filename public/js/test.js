var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                          11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

d3.select("test").selectAll("div")
								 .data(dataset)
								 .enter()
								 .append("div")
								 .attr("class", "bar")
								 .style("height", function(d){
								 		var barHeight = d * 5;
								 		return barHeight + "px";
								 });

// svgの幅と高さ
var w = 500;
var h = 100;
var barPadding = 1;
//svg生成
var svg = d3.select("test")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

var graph = svg.selectAll("rect")
							 .data(dataset)
							 .enter()
							 .append("rect")
							 .attr("x", function(d, i){
							 	return i * (w / dataset.length);
							 })
							 .attr("y", function(d){
							 	return h - 4 * d;
							 })
							 .attr("width", w / dataset.length - barPadding)
							 .attr("height", function(d){
							 	var barHeight = 4 * d;
							 	return barHeight;
							 })
// graphの色
graph.attr("fill", function(d){
		 	return "rgb(0, 0, " + (d * 10) + ")";
		 });
// 文字
svg.selectAll("text")
		 .data(dataset)
		 .enter()
		 .append("text")
		 .text(function(d){
		 	return d;
		 })
		 .attr("text-anchor", "middle")
		 .attr("x", function(d, i){
		 	return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
		 })
		 .attr("y", function(d){
		 	return h - (d * 4) + 14;
		 })
		 .attr("font-family", "sans-serif")
		 .attr("font-size", "11px")
		 .attr("fill", "white");

/*
var width = 500;
var height = 50;
var svg = d3.select("test")
						.append("svg")
						.attr("width", width)
						.attr("height", height)

var dataset = [ 5, 10, 15, 20, 25 ];

var circle = svg.selectAll("circle")
								.data(dataset)
								.enter()
								.append("circle");

circle.attr("cx", function(d, i){
					return (i * 50) +25;
			})
			.attr("cy", height/2)
			.attr("r", function(d){
				return d;
			})
			.attr("fill", "yellow")
			.attr("stroke", "orange")
			.attr("stroke-width", function(d){
				return d/2;
			});
*/
/*
var dataset = [];
	for (var i = 0; i < 25; i++){
		var newNumber = Math.round(Math.random() * 30);
		dataset.push(newNumber);
	};
*/
/*
d3.select("body").selectAll("p")
	.data(dataset)
	.enter()
	.append("p")
	.text(function(d){
		return d + "だよ！";
	})
	.style("color", function(d){
		if(d > 15){
			return "red";
		}
		else{
			return "black";
		}
	});
*/
/*
d3.select("test").selectAll("div")
	.data(dataset)
	.enter()
	.append("div")
	.attr("class", "bar")
	.style("height", function(d){
		var barHeight = 5 * d;
		return barHeight + "px";
	});
*/