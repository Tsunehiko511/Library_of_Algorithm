(function(){

var w = 550;
var h = 350;
var barPadding = 60;
var dataset = [9,3,6,1,8,5,4];
var pivot = [];
var swap_array = [];
var new_dataset = copy(dataset);


// svg生成
var svg = d3.select("anime")
						.append("svg")
						.attr("width", w+dataset.length*barPadding)
						.attr("height", h);
// text
var text = svg.selectAll("text")
							.data(dataset)
							.enter()
							.append("text")
							.attr({// 真ん中若干下に配置されるように、文字色は白に。
               'text-anchor': "middle",
               "fill": "black",
              })
							.attr("x", function(d, i){
							 return i * (w / dataset.length) + barPadding;
							})
							.attr("y", function(d){
							 return h/2+15+5 * d;
							})
							.text(function(d){
								return d;
							})

var graph = svg.selectAll("circle")
							 .data(dataset)
							 .enter()
							 .append("circle")
							 .attr("cx", function(d, i){
							 	return i * (w / dataset.length) + barPadding;
							 })
							 .attr("cy", function(d){
							 	return h/2;
							 })
							 .attr("r", function(d){
							 	return d;
							 });



// 二つの配列の置換行列を一挙に取得する
/*function getSwaps(array, new_array){
	if (array.length<=1){
		return 0;
	}
	var tmp = getLPR(new_array);
	console.log(array);
	console.log(new_array);
	swap_array.push(getSwapNumber(array, new_array)); // arrayとnew_arrayのo置換行列を取得
	console.log(swap_array);
	pivot.push(tmp[1])
	var left_side = tmp[0];
	var right_side = tmp[2];
	console.log("ok");
	var new_left_side = copy(left_side);
	var new_right_side = copy(right_side);
	getSwaps(left_side, new_left_side);
	getSwaps(right_side, new_right_side);
}
*/
// 初期化
function init(){
	graph.transition()
			 .duration(1000)
			 .attr("cx", function(d, i){
			 	return i * (w / dataset.length) + barPadding;
			 })
			 .attr("r", function(d){
			 	return 4 * d ;
			 })
			 .attr("fill", "black");
	text.transition()
			.duration(1000)
			.attr("x", function(d, i){
				return i * (w / dataset.length) + barPadding;
			})
}


function move(swap_array){
	graph.data(dataset).transition()
			 .duration(1000)
			 .attr("cx", function(d, i){
			 	var point = swap_array[i][1];// 置換行列
			 	console.log(point);
			 	return point * (w / dataset.length) + barPadding;;
			 });
/*	text.transition()
			.duration(1000).delay(1000)
			.attr("x", function(d, i){
			 var point = swap_array[i][1];					
			 var barXPosition = point * (w / dataset.length) + barPadding;
			 return barXPosition;
			});*/
}
// ピボットの色を変える
function drawBar(times,swap_array){
	console.log(swap_array);
	graph.attr("fill", function(d, i){
				var l = swap_array.length;
				if(l<=i){
					return "black";					
				}
			 	var point = swap_array[i][1];
			 	if (point == pivot[times]){
			 		return "red";
			 	}
			 	else{
			 		return "black";
			 	}
			 });
}

//　ピボットを境に色を変える
function leftDraw(times, swap_array){
	var l = swap_array.length;
	var tmp = turnArray(swap_array);
	graph.attr("fill", function(d, i){
		    var point = i;
				if(l>i){
					point = swap_array[i][1];
				}
				else{
					return "black";
				}
			 	if (point < tmp[pivot[times]]){
			 		return "green";
			 	}
			 	else if (point == tmp[pivot[times]]){
			 		return "red";
			 	}
			 	else{
			 		return "blue"
			 	}
			 });
}
init();
var first = 0, step = 0, turn = 0;

var swap_arrays = [dataset];
quicksort(new_dataset, 0, new_dataset.length-1);
function view(){
	console.log(dataset);
	console.log(new_dataset);
	console.log("動かせ");
	var next_swap = getSwapNumber(swap_arrays[0],swap_arrays[turn+1]);
	console.log(next_swap);
	move(next_swap);
	turn++;

	if (first == 0){
		// ピボット位置の取得
		first = 1;
	}
	switch(step){
		case 0:
		console.log("ピボットを塗れ");
//	drawBar(turn,next_swap);
		break;
		case 1:
		console.log(graph);
		break;
		case 2:
		console.log("色を塗れ");
		//leftDraw(turn,next_swap);
		break;
		default:
		console.log("turnを増やせ");
		turn++;
		break;
	}
	step++;
	if(step>3){
		step = 0;
	}
	if(turn+1>=swap_array.length){
		turn = 0;
		init();
	}
}
svg.on("click", view);

function copy(array){
	var tmp = [];
	for(var i=0; i<array.length;i++){
		tmp.push(array[i]);
	}
	return tmp;
}
function getSwapNumber(a, b){
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

// 配列のleftとrightを入れ替える
function swap(array_data,left, right){
	var tmp1 = array_data[left];
	array_data[left] = array_data[right];
	array_data[right] = tmp1;
}
// ピボットの場所を決める
function partition(array_data, left, right){
	var p = left;//Math.floor(Math.random()*array_data.length);
	swap(array_data, p, right);
	var store = left;
	for (i = left; i < right; i++){
		if (array_data[i] <= array_data[right]){
			swap(array_data, i, store);
			store++;			
		}
	}
	swap(array_data, store, right);
	var tmp = copy(array_data);
	swap_arrays.push(tmp);
	return store;
}

function quicksort(array_data, left, right){
	var tmp = array_data;
	if(left<right){
		var pi = partition(tmp, left, right);
		quicksort(tmp, left, pi-1);
		quicksort(tmp, pi+1, right);
		return tmp
	}
}

// left+ピボット+rightを返す
/*function getLPR(new_array){
	var p = partition(new_array, 0, new_array.length-1);
	console.log("p");
	console.log(p);
	var left = [];
	var right = [];
	for(var i=0; i<new_array.length; i++){
		if(i<p){
			left.push(new_array[i]);
		}
		else if(p<i){
			right.push(new_array[i]);
		}
	}
	return [left,p,right];
}
*/
// 配列をコピーする


// arrayをchangeする
/*
function getT(array, change, size){
	console.log("array");
	console.log(array);
	var a = copy(array);
	var c = copy(array);
	var i = 0
	for(i = 0;i<size-change.length;i++){
		c[change[i][1]] = a[change[i][0]];
	}
	for(;i<size;i++){
		c[change[i][1]] = a[change[i][0]];
	}
	console.log("c");
	console.log(c);
	return c;
}*/
})();