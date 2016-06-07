var width = 600,
    height = 450;

var n = 6,
    index = d3.range(n),
    data = [8,3,6,1,9,5];//shuffle(index.slice()); // 謎処理
console.log(data);
// x=0からwidthで240個に等間隔に分ける, a=-pi/4〜pi/4で0から240-1等間隔に分ける
var x = d3.scale.ordinal().domain(index).rangePoints([0, width-50]);
    //a = d3.scale.linear().domain([0, n - 1]).range([-Math.PI / 4, Math.PI / 4]);
for (var i = 0; i<n ; i++){
	console.log(x(i));
}


var svg = d3.select("test").append("svg")
    .attr("width", width )
    .attr("height", height)
  .append("g");
    //.attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")");

var line = svg.selectAll("rect")
    .data(data)
  .enter().append("rect")
		.attr("x", function(d, i){
			return x(i);// * (width / data.length);
		})
		.attr("y", function(d){
			return height -  30 * d;
		})
		.attr("width", width / (data.length) -50)
		.attr("height", function(d){
			return 30 * d;
		});
    //.attr("transform", function(d, i) { return "translate(" + x(i) + ")"; });
/*
    .attr("index", function(d, i) { return "i" + i; })
    .attr("x2", function(d) { return height * Math.sin(a(d)); })
    .attr("y2", function(d) { return -height * Math.cos(a(d)); })
*/

							 



// Fisher–Yates shuffle　配列を混ぜる
function shuffle(array) {
  var i = array.length, j, t;
  while (--i > 0) {
    j = ~~(Math.random() * (i + 1));
    t = array[j];
    array[j] = array[i];
    array[i] = t;
  }
  return array;
}

function quicksort(array) {
  var actions = [];

  function partition(left, right, pivot) {
    var v = array[pivot];
    swap(pivot, --right);
    for (var i = left; i < right; ++i) if (array[i] <= v) swap(i, left++);
    swap(left, right);
    return left;
  }

  function swap(i, j) {
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
    actions.push({type: "swap", i: i, j: j});
  }

  function recurse(left, right) {
    if (left < right) {
      var pivot = left + ~~(Math.random() * (right - left));
      actions.push({type: "partition", pivot: pivot});
      pivot = partition(left, right, pivot);
      recurse(left, pivot);
      recurse(pivot + 1, right);
    }
  }

  recurse(0, array.length);
  return actions;
}

var actions = quicksort(data).reverse();
console.log(actions);
console.log(data);


function step(time) {
  var action = actions.pop();
  if (action) switch (action.type) {
    case "partition": {
      line.style("fill", function(d, i) { return i == action.pivot ? "red" : null; });
      //step();
      break;
    }
    case "swap": {
    	if (action.i == action.j){
    		step(time);
    		break;
    	};
      var t = line[0][action.i];
      line[0][action.i] = line[0][action.j];
      line[0][action.j] = t;
      console.log(action.i,action.j)
      line.transition()
          .duration(time)
					.attr("x", function(d, i){
						return x(i);// * (width / data.length);
					});
      		//.attr("transform", function(d, i) { return "translate(" + x(i) + ")"; });
      break;
    }
  }
  else{
  	alert("end");
	}
};
var test = document.getElementById('test')
	// タッチスクリーンなら
	if (window.ontouchstart===null){
		// 素早くタップしたときにダブルタップとみなされて拡大されるのを防ぐ
		test.addEventListener('touchstart',function(e){ e.preventDefault(); step(500);},false);
	}
	// タッチスクリーンでないなら
	else{
		// 'click'(=onClick)を使わないのは、素早くクリックしたときにダブルクリックとみなされて画面が選択されるのを防ぐため
		test.addEventListener('mousedown',function(e){ e.preventDefault();},false);
		test.addEventListener('mouseup',function(){step(500);},false);
	}


/*var margin = {top: 230, right: 30, bottom: 230, left: 30},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var n = 100,
    index = d3.range(n),
    data = shuffle(index.slice());

var x = d3.scale.ordinal().domain(index).rangePoints([0, width]),
    a = d3.scale.linear().domain([0, n - 1]).range([-Math.PI / 4, Math.PI / 4]);

var svg = d3.select("test").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")");

var line = svg.selectAll("line")
    .data(data)
  .enter().append("line")
    .attr("index", function(d, i) { return "i" + i; })
    .attr("x2", function(d) { return height * Math.sin(a(d)); })
    .attr("y2", function(d) { return -height * Math.cos(a(d)); })
    .attr("transform", function(d, i) { return "translate(" + x(i) + ")"; });

// Fisher–Yates shuffle
function shuffle(array) {
  var i = array.length, j, t;
  while (--i > 0) {
    j = ~~(Math.random() * (i + 1));
    t = array[j];
    array[j] = array[i];
    array[i] = t;
  }
  return array;
}

function quicksort(array) {
  var actions = [];

  function partition(left, right, pivot) {
    var v = array[pivot];
    swap(pivot, --right);
    for (var i = left; i < right; ++i) if (array[i] <= v) swap(i, left++);
    swap(left, right);
    return left;
  }

  function swap(i, j) {
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
    actions.push({type: "swap", i: i, j: j});
  }

  function recurse(left, right) {
    if (left < right) {
      var pivot = left + ~~(Math.random() * (right - left));
      actions.push({type: "partition", pivot: pivot});
      pivot = partition(left, right, pivot);
      recurse(left, pivot);
      recurse(pivot + 1, right);
    }
  }

  recurse(0, array.length);
  return actions;
}

var actions = quicksort(data).reverse();
console.log(actions);

setInterval(function step() {
  var action = actions.pop();
  if (action) switch (action.type) {
    case "partition": {
      line.style("stroke", function(d, i) { return i == action.pivot ? "red" : null; });
      step();
      break;
    }
    case "swap": {
      var t = line[0][action.i];
      line[0][action.i] = line[0][action.j];
      line[0][action.j] = t;
      line.attr("transform", function(d, i) { return "translate(" + x(i) + ")"; });
      break;
    }
  }
}, 200);

*/
/*var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
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
*/
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