(function(){

var w = 550;
var h = 350;
var barPadding = 1;

// svg生成
var svg = d3.select("anime")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

var dataset = [8,3,6,1,9,5];

var graph = svg.selectAll("rect")
							 .data(dataset)
							 .enter()
							 .append("rect")
							 .attr("x", function(d, i){
							 	return i * (w / dataset.length);
							 })
							 .attr("y", function(d){
							 	return h -  d -100;
							 })
							 .attr("width", w / dataset.length - barPadding)
							 .attr("height", function(d){
							 	return d ;
							 });


var new_dataset = [3,1,5,6,8,9];

graph.transition()
		 .delay(400)
		 .duration(1000)
		 .attr("y", function(d){
		 	return h - 20 * d -100;
		 })
		 .attr("width", w / dataset.length - barPadding)
		 .attr("height", function(d){
		 	return 20 * d ;
		 });
var pivot = dataset[2];
graph.transition()
		 .delay(1400)
		 .duration(1000)
		 .attr("x", function(d, i){
		 	var barXPosition = ((i+1)%new_dataset.length) * (w / dataset.length);
		 	return barXPosition;
		 })
})();