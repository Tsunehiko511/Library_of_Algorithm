(function(){
	const SPEED = 400;
	var w = 550, h = 350, barPadding = 60;
	var dataset = [5,9,8,3,1,6,4];
	var pivot = [], swap_array = [];
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

	function drawBar(times,swap_array){
		graph.transition()
				.duration(SPEED).attr("fill", function(d, i){
				 	var point = swap_array[i][1];
				 	console.log("numbers[times]",numbers[times])
			    if (point == numbers[times]){
			    	console.log("red",d);
				 		return "red";
				 	}
			    else if (point == numbers[times]+1){
			    	console.log("blue",d);
				 		return "blue";
				 	}
				 	else{
				 		return "black";
				 	}
				 });
	}
	function allblacks(){
		graph.transition()
				.duration(SPEED).attr("stroke-width",5)
				.attr("stroke", "")
				.attr("fill", "black");
	}

	function isYellow(direction, pivot, point){
		if(Math.abs(pivot-direction)==1 && point==direction){
			return 1;
		}
		return 0;
	}
	//　ピボットを境に色を変える
	function drawDecide(swap_array,decided_count){
		console.log("decided")
		graph.transition()
				.duration(SPEED).attr("stroke-width",5)
				.attr("stroke", function(d, i){
			    var point = swap_array[i][1];
			    for(var j=0;j<=decided_count;j++){
			    	if(point == decided_number[j]){
			    		return "orange";
			    	}
			    }
				 });
	}
	var step = 0, turn = 0;
	var swap_arrays = [];
	var lefts = [], rights = [];
	var numbers = [];
	var decided_number = [];
	var decided_count = 0;
	var action = [];

	init();
	//quicksort(new_dataset, 0, new_dataset.length-1);
	bubblesort(new_dataset);
//	swap_arrays.push(new_dataset);
	swap_arrays.push(dataset);
	console.log(swap_arrays);
	console.log(numbers);
	console.log(decided_number);

	var next_swap = getSwapNumber(dataset,swap_arrays[turn]);
	function view(){
		console.log(next_swap);
		console.log("step",step);
		if(step==12 || step == 24|| step == 34 || step == 42 || step == 48 || step == 52 || step == 54){// || step == 54){
			drawDecide(next_swap,decided_count);
			setCodeLine(15, 15);
			decided_count++
			step+=2;
			return;
		}
		if(step == 56){
			allblacks();
			setCodeLine(16, 16);
			decided_count=0
			step=-2;
			return;
		}
		switch(Math.abs(step)%2){
			case 0:
			drawBar(turn,next_swap);
			//setCodeLine(13,13);
			if(step<0){
				setCodeLine(-1, -1);
				break;
			}
			setCodeLine(11, 11);
			break;
			case 1:
			next_swap = getSwapNumber(dataset,swap_arrays[turn]);
			move(turn, next_swap);
			turn++;
			if(turn>=swap_arrays.length){
				turn = 0;
			}
			if(step<0){
				break;
			}
			if(action[turn]=="入れ替える"){
				setCodeLine(12, 12);
			}else{
				setCodeLine(14, 14);
			}
			break			
			case 2:

			//setCodeLine(14,14);
			break;
			default:
			break;
		}
		step++;
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

	function bubblesort(array_data){
		for (var i = array_data.length-1; i>=0; i--){
			for (var j=0; j < i; j++){
				numbers.push(j);
				if (array_data[j]>array_data[j+1]){
					swap(array_data,j,j+1)
					action.push("入れ替える");
				}
				else{
					action.push("入れ替えない");
				}
				var tmp = copy(array_data);
				swap_arrays.push(tmp);
			}
			decided_number.push(i);
		}
	}
	// コードハイライト
	var editor = ace.edit("editor");
	function setCodeLine(start, end){
		if (turn==100){
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