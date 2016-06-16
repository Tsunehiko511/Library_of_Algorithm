(function(){
	const SPEED = 400;
	var w = 620, h = 350, barPadding = 60;
	var dataset = [9,5,8,3,6,4,1];
	var new_dataset = copy(dataset);
	var up_value = 60;

	// svg生成
	var svg = d3.select("anime")
							.append("svg")
							.attr("width", w+dataset.length)
							.attr("height", h);
	// 円
	var graph = svg.selectAll("rect").data(dataset).enter().append("rect")
								 .attr("x", function(d, i){
								 	return i * (w / dataset.length) + barPadding;
								 })
								 .attr("y", h/2)
								 .attr("width", 50)
								 .attr("height", 50)
								 .attr("fill", "white")
								 .attr("stroke", "black")
								 .attr("stroke-width", 5);
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
								 return i * (w / dataset.length) + barPadding+25;
								})
								.attr("y", function(d){
								 return h/2 + 30;
								})
								.text(function(d){
									return d;
								})

	// 初期化
	function init(){
	}

	function move(swap_array){
			graph.transition()
					 .duration(SPEED)
					 .attr("x", function(d, i){
					 	var point = swap_array[i][1];// 置換行列
					 	return point * (w / dataset.length) + barPadding;
					 });
		text.transition()
				.duration(SPEED)
				.attr("x", function(d, i){
				 var point = swap_array[i][1];					
				 var barXPosition = point * (w / dataset.length) + barPadding + 25;
				 return barXPosition;
				});
	};
	function move_init(swap_array){
			graph.transition()
					 .duration(SPEED)
					 .attr("x", function(d, i){
					 	var point = swap_array[i][1];// 置換行列
					 	return point * (w / dataset.length) + barPadding;
					 })
					 .attr("y", h/2);
		text.transition()
				.duration(SPEED)
				.attr("x", function(d, i){
				 var point = swap_array[i][1];					
				 var barXPosition = point * (w / dataset.length) + barPadding + 25;
				 return barXPosition;
				})
				.attr("y", h/2 + 30);
	};
	function upGrade(start, end){
		if(start==0 && end == 3){
			up_value +=up_value;
			return;
		}
		if(start == 4 && end == 5){
			up_value = 60;
			return
		}
	}

	// ピボットの色を変える

	function up(swap_array, start, end){
		upGrade(start, end);
		graph.transition()
				.duration(SPEED)
				.attr("y", function(d, i){
					var point = swap_array[i][1];
					if(point <=end){
						return h/2-up_value;
					}
					else{
						return h/2;
					}
				});
		text.transition()
				.duration(SPEED)
				.attr("y", function(d, i){
					var point = swap_array[i][1];
					if(point <=end){
						return h/2+30-up_value;
					}
					else{
						return h/2+30;
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
	sortData(new_dataset, 0, new_dataset.length-1);
	action.push({type:"初期化", merge:getSwapNumber(dataset, dataset)});
	console.log(action);
//	swap_arrays.push(new_dataset);

	function view(){
		var type = action[step].type;
		switch(type){
			/*
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
			break;*/
			case "start-end":
			var swap_array = action[step].merge;
			var start = action[step].start;
			var end = action[step].end;
			console.log(swap_array);
			up(swap_array,start,end);
			break;
			case "Merge":
			var swap_array = action[step].merge;
			console.log(swap_array);
			move(swap_array);
			break;
			case "初期化":
			var swap_array = action[step].merge;
			console.log(swap_array);
			move_init(swap_array);
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
	anime.addEventListener('click',function(){view()},false);
	/*
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

	function sortData(data,start,end)
	{
		if(start >= end){
			console.log("return");
			return;
		}
		var mid = Math.floor((start + end) / 2);
		sortData(data, start,mid);
		sortData(data, mid+1,end);
		console.log("Merge:"+ start +"〜"+ end);
		var tmp = copy(data);
		action.push({type:"start-end", merge:getSwapNumber(dataset, tmp), start:start, end:end});
		var tmp_array = copy(data);
		var p = 0;
		for (var index=start; index<=mid; index++){
			tmp_array[p] = data[index];
			p++;
		}
		var index_R = mid + 1; // i
		var index_L = 0; //j
		var k = start;
		console.log("Before");
		var tmp = copy(data);
		console.log(tmp);
		while ((index_R<=end) && (index_L<p))
		{
			console.log(index_L,index_R);
			if (tmp_array[index_L] <= data[index_R])
			{
				console.log("left");
				data[k] = tmp_array[index_L];
				index_L++;
			}else{
				console.log("right");
				data[k] = data[index_R];
				index_R++;
			}
			k++;
			tmp = copy(data);
			//action.push({type:"Merge", merge:getSwapNumber(dataset, tmp)});
		}
		while (index_L < p){
			data[k] = tmp_array[index_L];
			k++;
			index_L++;
		}
		console.log("After");
		tmp = copy(data);
		console.log(tmp);
		action.push({type:"Merge", merge:getSwapNumber(dataset, tmp)});
	}

	//console.log(action);
	// コードハイライト
	var editor = ace.edit("editor");
	function setCodeLine(start, end){
		var range = editor.getSession().highlightLines(start, end, "code_highlight");
		if(range.id>3){
			editor.getSession().removeMarker(range.id-1);
		}
	}


})();