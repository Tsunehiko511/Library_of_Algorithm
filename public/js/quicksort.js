(function(){

var w = 550;
var h = 350;
var barPadding = 1;
var dataset = [8,3,6,1,9,5];
console.log(dataset);
// svg生成
var svg = d3.select("anime")
						.append("svg")
						.attr("width", w+dataset.length*barPadding)
						.attr("height", h);


var graph = svg.selectAll("rect")
							 .data(dataset)
							 .enter()
							 .append("rect")
							 .attr("x", function(d, i){
							 	return i * (w / dataset.length) + barPadding;
							 })
							 .attr("y", function(d){
							 	return h -  d -100;
							 })
							 .attr("width", w / dataset.length - barPadding)
							 .attr("height", function(d){
							 	return 0 ;
							 })

var action = [];

var new_dataset = [8,3,6,1,9,5];
var p = [];
p.push(partition(new_dataset, 0, new_dataset.length-1));
var lefts = 
console.log(p);
console.log(new_dataset);
//var swap_array = getSwapNumber(dataset, new_dataset);
/*graph.transition()
		 .delay(400)
		 .duration(1000)*/
function init(){
	graph.transition()
			 .duration(1000)
			 .attr("x", function(d, i){
			 	return i * (w / dataset.length) + barPadding;
			 })
			 .attr("y", function(d){
			 	return h - 20 * d -100;
			 })
			 .attr("width", w / dataset.length - barPadding)
			 .attr("height", function(d){
			 	return 20 * d ;
			 })
			 .attr("fill", "black");
}
function move(){
	graph.transition()
			 .duration(1000)
			 .attr("x", function(d, i){
			 	var point = action.value[1];
			 	var barXPosition = point * (w / dataset.length) + barPadding;
			 	return barXPosition;
			 });
}

function drawBar(){
	graph.attr("fill", function(d, i){
			 	var point = action.value[1];//swap_array[i][1];
			 	if (point == p[0]){
			 		return "red";
			 	}
			 	else{
			 		return "black";
			 	}
			 });
}
function leftDraw(){
	graph.attr("fill", function(d, i){
			 	var point = action.value[1];//swap_array[i][1];
			 	if (point < p[0]){
			 		return "green";
			 	}
			 	else if (point == p[0]){
			 		return "black";
			 	}
			 	else{
			 		return "blue"
			 	}
			 });
}
init();
var step = 0;
function view(){
	step++;
	if(step>3){
		step = 0;
	}
	switch(step){
		case 1:
		drawBar();
		break;
		case 2:
		move();
		break;
		case 3:
		leftDraw();
		break;
		default:
		init();
		break;
	}
	console.log(step);
}
svg.on("click", view);
/*
function swap(number, left, right){
	if (number == left){
		return right;
	}
	else if (number == right){
		return left;
	}
	else{
	 return number;		
	}
}
*/
function cain(a, b, c){
	var x = a.concat(b);
	var y = x.concat(c);
	return y;
};

function quicksort(array_data){
	if (array_data.length <= 1){
		return array_data;
	}
	var r = Math.floor(Math.random()*array_data.length);
	var pivot = array_data[r];
	var left = [];
	var right = [];
	for (var i = 0; i<array_data.length; i++){
		if (array_data[i] < pivot){
			left.push(array_data[i]);
		}
		else if(array_data[i] > pivot){
			right.push(array_data[i]);
		}
	}
	var lefts = quicksort(left);
	var rights = quicksort(right);
	var answer = cain(lefts, [pivot], rights);
	return answer
}
/*function getSwapNumber(a, b){
	var swap_array = [];
	for (var i = 0; i<a.length; i++){
		for (var j = 0; j < b.length; j++){
			if (a[i] == b[j]){
				swap_array.push([i,j]);
			}
		}
	}
	return swap_array;
}
*/
// 配列のleftとrightを入れ替える
function swap(array_data,left, right){
	action.push({type:"swap", value:[left,right]});
	var tmp = array_data[left];
	array_data[left] = array_data[right];
	array_data[right] = tmp;
}

function partition(array_data, left, right){
	var p = Math.floor(Math.random()*array_data.length);
	swap(array_data, p, right);
	var store = left;
	for (i = left; i < right; i++){
		if (array_data[i] <= array_data[right]){
			swap(array_data, i, store);
			store++;			
		}
	}
	swap(array_data, store, right);
	return store;
}
})();