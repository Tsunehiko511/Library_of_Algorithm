(function(){
	const SPEED = 400;
	var w = 550, h = 350, barPadding = 60;
	var dataset = [5,9,8,3,1,6,4];
	var pivot = [], swap_array = [];
	var new_dataset = copy(dataset);

	// svg生成
	var svg = d3.select("anime")
							.append("svg")
							.attr("width", w+dataset.length+50)
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
	// 円
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
				 .duration(SPEED+400)
				 .attr("cx", function(d, i){
				 	return i * (w / dataset.length) + barPadding;
				 })
				 .attr("r", function(d){
				 	return 4 * d+2 ;
				 })
				 .attr("fill", "black");
		text.transition()
				.duration(SPEED+400)
				.attr("x", function(d, i){
					return i * (w / dataset.length) + barPadding;
				});
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
	var step = 0, turn = 0;
	var swap_arrays = [];
	var lefts = [], rights = [];

	init();
	quicksort(new_dataset, 0, new_dataset.length-1);

	swap_arrays.push(dataset);
	var next_swap = getSwapNumber(dataset,swap_arrays[turn]);
	function view(){
		
		switch(step%3){
			case 0:
			drawBar(turn,next_swap);
			setCodeLine(13,13);
			break;
			case 1:
			move(turn, next_swap);
			setCodeLine(14,14);
			break;
			case 2:
			leftDraw(turn,next_swap);
			setCodeLine(15,16);
			turn++;
			if(turn>=swap_arrays.length){
				turn = 0;
			}
			next_swap = getSwapNumber(dataset,swap_arrays[turn]);
			break;
			default:
			break;
		}
		step++;
	}


	var anime = document.getElementById('anime');
	anime.addEventListener('click',function(){view()},false);
	/*
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
	}*/

	function copy(array){
		var tmp = [];
		for(var i=0; i<array.length;i++){
			tmp.push(array[i]);
		}
		return tmp;
	}
	// 置換行列取得
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


	// コードハイライト
	var editor = ace.edit("editor");
	function setCodeLine(start, end){
		if (turn==4){
			console.log("コード")
			var range = editor.getSession().highlightLines(-1, -1, "code_highlight");
		}
		else{
			var range = editor.getSession().highlightLines(start, end, "code_highlight");
		}
		if(range.id>3){
			console.log("range.id");
			console.log(range.id);
			editor.getSession().removeMarker(range.id-1);
		}
	}


})();