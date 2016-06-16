(function(){
	const SPEED = 400;
	var w = 550, h = 350, barPadding = 60;
	var dataset = [4,5,8,9,6,1,3];
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

	function move(swap_array){
			graph.transition()
					 .duration(SPEED)
					 .attr("cx", function(d, i){
					 	var point = swap_array[i][1];// 置換行列
					 	return point * (w / dataset.length) + barPadding;;
					 });
		text.transition()
				.duration(SPEED)
				.attr("x", function(d, i){
				 var point = swap_array[i][1];					
				 var barXPosition = point * (w / dataset.length) + barPadding;
				 return barXPosition;
				});
	};
	// ピボットの色を変える

	function drawIndex(index_value){
		graph.transition()
				.duration(SPEED).attr("fill", function(d, i){
			    if (d == index_value){
				 		return "red";
				 	}
				 });
	}
	function drawMin(min_value, index_value){
		graph.transition()
				.duration(SPEED).attr("fill", function(d, i){
				 	if (d == min_value){
				 		return "blue";
				 	}
			    if (d == index_value){
				 		return "red";
				 	}
				 });
	}

	var step = 0;
	var action = [];

	init();
	//quicksort(new_dataset, 0, new_dataset.length-1);
	selectsort(new_dataset);
	action.push({type:"初期化", swap:getSwapNumber(dataset,dataset)});
//	swap_arrays.push(new_dataset);

	function view(){
		var type = action[step].type;
		switch(type){
			case "index":
			var index_value = action[step].index;
			drawIndex(index_value);
			setCodeLine(9, 9);
			break;
			case "minimam":
			var index_value = action[step].index;
			var min_value = action[step].min;
			drawMin(min_value, index_value);
			setCodeLine(10, 10);
			break;
			case "交換":
			var swap_array = action[step].swap;
			console.log(swap_array);
			move(swap_array);
			setCodeLine(11, 11);
			break;
			case "初期化":
			var swap_array = action[step].swap;
			console.log(swap_array);
			move(swap_array);
			graph.transition().delay(SPEED).attr("fill", "black");
			setCodeLine(-1, -1);
			break;
			default:
			break
		}
		step++;
		console.log("step",step);
		console.log(action.length);
		if(step>= action.length){
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
	}

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

	function selectsort(array_data){
		var tmp = copy(array_data);
		for (var index = 0; index < array_data.length; index++){
			var tmp1 = tmp[index];
			action.push({type:"index", index:tmp1});
			var min = tmp[index];
			var min_position = index;
			for (var i = index; i<array_data.length; i++){
				if(min > tmp[i]){
					min = tmp[i];
					min_position = i;
				}
			}
			action.push({type:"minimam", index:tmp1, min:min});
			tmp[min_position] = tmp[index];
			tmp[index] = min;
			var tmp2 = copy(tmp);
			action.push({type:"交換", swap:getSwapNumber(dataset, tmp2)});
		}
		console.log(tmp);
	}
	console.log(action);
	// コードハイライト
	var editor = ace.edit("editor");
	function setCodeLine(start, end){
		var range = editor.getSession().highlightLines(start, end, "code_highlight");
		if(range.id>3){
			editor.getSession().removeMarker(range.id-1);
		}
	}


})();