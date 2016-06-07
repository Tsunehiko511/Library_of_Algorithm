(function(){

var w = 550;
var h = 350;
var barPadding = 60;
var dataset = [6,3,9,1,8,5,4];
var pivot = [];
var swap_array = [];
var new_dataset = copy(dataset);
const SPEED = 500;

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



// 初期化
function init(){
	graph.transition()
			 .duration(SPEED)
			 .attr("cx", function(d, i){
			 	return i * (w / dataset.length) + barPadding;
			 })
			 .attr("r", function(d){
			 	return 4 * d+2 ;
			 })
			 .attr("fill", "black");
	text.transition()
			.duration(SPEED)
			.attr("x", function(d, i){
				return i * (w / dataset.length) + barPadding;
			})
}


function move(times, swap_array){
	if (times == pivot.length){
		graph.transition()
		 .duration(SPEED)
		 .attr("cx", function(d, i){
		 	var point = swap_array[i][1];// 置換行列
		 	return point * (w / dataset.length) + barPadding;;
		 })
		.attr("fill", function(d, i){
			return "black";
		});
	}else{
		graph.transition()
				 .duration(SPEED)
				 .attr("cx", function(d, i){
				 	var point = swap_array[i][1];// 置換行列
				 	return point * (w / dataset.length) + barPadding;;
				 });		
	}
	text.transition()
			.duration(SPEED)
			.attr("x", function(d, i){
			 var point = swap_array[i][1];					
			 var barXPosition = point * (w / dataset.length) + barPadding;
			 return barXPosition;
			});
};
// ピボットの色を変える

function drawBar(times,swap_array){
	console.log("times");
	console.log(times);
	console.log(pivot.length);

	graph.transition()
			.duration(SPEED).attr("fill", function(d, i){
			 	var point = swap_array[i][1];
		    if(decided(times,point,pivot,lefts,rights)){
		    	return decided(times,point,pivot,lefts,rights);
		    }
		    if (point == pivot[times]){
			 		return "red";
			 	}
			 	else{
			 		return "black";
			 	}
			 });
}

function decided(times,point,pivot,lefts,rights){
	for(var j=0; j<times;j++){
		if(point==pivot[j]){
			return "orange";
		}
		if(isYellow(lefts[j],pivot[j],point)==1){
	  	return "orange";
	  }
		if(isYellow(rights[j],pivot[j],point)==1){
	  	return "orange";
	  }
	}
	return 0;
}

function isYellow(direction, pivot, point){
	if(Math.abs(pivot-direction)==1 && point==direction){
		return 1;
	}
	return 0;
}
//　ピボットを境に色を変える
function leftDraw(times, swap_array){
	graph.transition()
			.duration(SPEED).attr("fill", function(d, i){
				if (times == pivot.length){
					return "black";
				}
		    var point = swap_array[i][1];
		    if(decided(times,point,pivot,lefts,rights)){
		    	return decided(times,point,pivot,lefts,rights);
		    }
			 	if (lefts[times] <= point && point < pivot[times]){
			 		return "green";
			 	}
			 	else if (point == pivot[times]){
			 		return "red";
			 	}
			 	else if (point<=rights[times]){
			 		return "blue";
			 	}
			 });
}
init();
var step = 0, turn = 0;

var swap_arrays = [];
var lefts = [];
var rights = [];
quicksort(new_dataset, 0, new_dataset.length-1);
swap_arrays.push(dataset);
var next_swap = getSwapNumber(dataset,swap_arrays[turn]);
function view(){
	
	switch(step){
		case 0:
		console.log("ピボットを塗れ");
		drawBar(turn,next_swap);
		break;
		case 1:
		move(turn, next_swap);
		break;
		case 2:
		console.log("色を塗れ");
		leftDraw(turn,next_swap);
		console.log("turnを増やせ");
		turn++;
		if(turn>=swap_arrays.length){
			turn = 0;
		}
		next_swap = getSwapNumber(dataset,swap_arrays[turn]);
		break;
		default:
		console.log("default");
		break;
	}
	step++;
	if(step>2){
		step = 0;
	}
}

var anime = document.getElementById('anime');

// タッチスクリーンなら
	if (window.ontouchstart===null){
		// 素早くタップしたときにダブルタップとみなされて拡大されるのを防ぐ
		anime.addEventListener('touchstart',function(e){ e.preventDefault();view();},false);
	}

	// タッチスクリーンでないなら
	else{
		// 'click'(=onClick)を使わないのは、素早くクリックしたときにダブルクリックとみなされて画面が選択されるのを防ぐため
		anime.addEventListener('mousedown',function(e){ e.preventDefault();},false);
		anime.addEventListener('mouseup',view,false);
	//	anime.addEventListener('mouseup',setCodeLine,false);
	}
// svg.on("click", view);

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
		pivot.push(pi);
		lefts.push(left);
		rights.push(right);
		quicksort(tmp, left, pi-1);
		quicksort(tmp, pi+1, right);
	}
}


//コード
/*
var editor = ace.edit("editor");
	function setCodeLine(){
		var startline = getCodeHighlight(step)[0];
		var endline = getCodeHighlight(step)[1];
		var range = editor.getSession().highlightLines(startline, endline, "code_highlight");
		if(range.id>3){
			editor.getSession().removeMarker(range.id-1);
		}
	}

	function getCodeHighlight(k){
		if(k==1){
			return [7,7];
		}else if(k==2){
			return [8,8];
		}else if(k<=4){
			return [9,10];
		}else if(k==5){
			return [7,7];
		}else{
			return [-1,-1];
		}
	}

*/


})();