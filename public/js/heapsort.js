(function(){
	const SPEED = 400;
	const PLUS_Y = -30;
	var w = 550, h = 400, barPadding = 60;
//	var dataset = [5,9,8,3,1,6,4];
	var dataset = [4,3,9,1,5,6,8];
	//var dataset = [5,3,16,2,10,14];
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
								 return h/2+15+5 * d + PLUS_Y;
								})
								.text(function(d){
									return d;
								})	// text




	// 円
	var graph = svg.selectAll("circle")
								 .data(dataset)
								 .enter()
								 .append("circle")
								 .attr("cx", function(d, i){
								 	return i * (w / dataset.length) + barPadding;
								 })
								 .attr("cy", function(d){
								 	return h/2 + PLUS_Y;
								 })
								 .attr("r", function(d){
								 	return d;
								 });	// 円


	var graph2 = svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("x",function(d, i){
		console.log("d");
		console.log(d);
		console.log("i",i);
								 	return i * (w / dataset.length) + barPadding-25;
	})
.attr("y",function(d){
	return 330;
})
.attr("width", function(d){
	return 50;
})
.attr("height", function(d){
	return 50;
})
.attr("fill",function(d){
	return "white";
})
.attr("stroke",function(d){
	return "black";
})
.attr("stroke-width",5);

	/*
  var c1 = [100, 200, 3];
  var c2 = [200, 200, 3];
  var carray = [c1, c2];

  // line関数を定義 (x,y)は配列の[0],[1]とする。
  var line = d3.svg.line()
      .x(function(d) {return d[0];})
      .y(function(d) {return d[1];});

  // path要素を作成
  var path = svg.append('path')
      .attr({
        'd': line(carray),
        'stroke': 'lightgreen',
        'stroke-width': 1,
      });*/



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

	function move(swap_array_x, swap_array_y, decided){
			graph.transition()
					 .duration(SPEED)
					 .attr("cx", function(d, i){
					 	var point = swap_array_x[i][1];// 置換行列
					 	return point * (w / dataset.length) + barPadding;;
					 })
					.attr("cy", function(d, i){
					 	var point = swap_array_y[i][1];
					 	console.log(decided);
					 	if(point > decided){
					 		return h/2 + PLUS_Y;
					 	}
					 	return h/2 - 130+40*point + PLUS_Y;
					 });

		text.transition()
				.duration(SPEED)
				.attr("x", function(d, i){
				 var point = swap_array_x[i][1];					
				 var barXPosition = point * (w / dataset.length) + barPadding;
				 return barXPosition;
				})
			 .attr("y", function(d, i){
			 	var point = swap_array_y[i][1];
			 	if(point > decided){
			 		return h/2+15+5 * d + PLUS_Y;
			 	}
			 	return h/2+15+5 * d- 130+40*point + PLUS_Y;
			 });
	};

	function drawHeap(swap_array_x, swap_array_y, decided){
		/*
			var position = [];
			for(var i = 0; i<dataset.length; i++){
				position.push({x:swap_array_x[i][1], y:swap_array_y[i][1]})
			};
			var line=svg.selectAll("line").data(position).enter().append("line")
        .attr("x1", function(d, i){
        	return position[i].x* (w / dataset.length) + barPadding;
        })
        .attr("y1", function(d, i){
        	return h/2 - 130+40*position[i].y + PLUS_Y;
        })
        .attr("x2", function(d, i){
        	if(i+1<dataset.length){
       		 	return position[i+1].x* (w / dataset.length) + barPadding;
        	}
        	return h/2;
        })
        .attr("y2", function(d, i){
        	if(i+1<dataset.length){
	        	return h/2 - 130+40*position[i+1].y + PLUS_Y;
        	}
        	return h/2;
        })
        .attr("stroke","blue")
        .attr("stroke-width",1);*/

			graph.transition()
					 .duration(SPEED)
					 .attr("cx", function(d, i){
					 	var point = swap_array_x[i][1];// 置換行列
					 	return point * (w / dataset.length) + barPadding;
					 })
					 .attr("fill", function(d, i){
					 	var point = swap_array_x[i][1];
				    if (point >= decided){
					 		return "orange";
					 	}
					 	else{
					 		return "black";
					 	}
					 })
				 .attr("cy", function(d, i){
				 	var point = swap_array_y[i][1];
				 	if(point >= decided){
				 		return h/2 + PLUS_Y;
				 	}
				 	console.log(i,d,point, decided);
				 	return h/2 - 130+40*point + PLUS_Y;
				 });
		text.transition()
				.duration(SPEED)
				.attr("x", function(d, i){
				 var point = swap_array_x[i][1];					
				 var barXPosition = point * (w / dataset.length) + barPadding;
				 return barXPosition;
				})
			 .attr("y", function(d, i){
			 	var point = swap_array_y[i][1];
			 	if(point >= decided){
			 		return h/2+15+5 * d + PLUS_Y;
			 	}
			 	return h/2+15+5 * d- 130+40*point + PLUS_Y;
			 });
	};

	function move2(swap_array_x, swap_array_y, decided){
			graph2.transition()
					 .duration(SPEED)
					 .attr("x", function(d, i){
					 	var point = swap_array_x[i][1];// 置換行列
					 	return point * (w / dataset.length) + barPadding-25;
					 });
	}
	function drawHeap2(swap_array_x, swap_array_y, decided){
			graph2.transition()
					 .duration(SPEED)
					 .attr("x", function(d, i){
					 	var point = swap_array_x[i][1];// 置換行列
					 	return point * (w / dataset.length) + barPadding-25;
					 })
					 .attr("fill", function(d, i){
					 	var point = swap_array_x[i][1];
				    if (point >= decided){
					 		return "orange";
					 	}
					 	else{
					 		return "white";
					 	}
					 });
	};

	function selected(swap_array_x, swap_array_y, decided){
			graph.transition()
					 .duration(SPEED)

					 .attr("fill", function(d, i){
					 	var point = swap_array_y[i][1];
				    if (point > decided){
					 		return "orange";
					 	}
					 	else if (point == decided){
					 		return "blue";
					 	}
				    else if (point == 0){
					 		return "red";
					 	}
					 	else{
					 		return "black";
					 	}
					 });
	};
	function selected2(swap_array_x, swap_array_y, decided){
			graph2.transition()
					 .duration(SPEED)

					 .attr("fill", function(d, i){
					 	var point = swap_array_y[i][1];
				    if (point > decided){
					 		return "orange";
					 	}
					 	else if (point == decided){
					 		return "blue";
					 	}
				    else if (point == 0){
					 		return "red";
					 	}
					 	else{
					 		return "white";
					 	}
					 });
	};



	function decide(swap_array_x, swap_array_y, decided){
			graph.transition()
					 .duration(SPEED)
					 .attr("cx", function(d, i){
					 	var point = swap_array_x[i][1];// 置換行列
					 	return point * (w / dataset.length) + barPadding;;
					 })
					 .attr("fill", function(d, i){
					 	var point = swap_array_x[i][1];
				    if (point >= decided){
					 		return "orange";
					 	}
					 	else{
					 		return "black";
					 	}
					 })
				 .attr("cy", function(d, i){
				 	var point = swap_array_y[i][1];
				 	return h/2 + PLUS_Y;
				 });
		text.transition()
				.duration(SPEED)
				.attr("x", function(d, i){
				 var point = swap_array_x[i][1];					
				 var barXPosition = point * (w / dataset.length) + barPadding;
				 return barXPosition;
				})
			 .attr("y", function(d, i){
			 	var point = swap_array_y[i][1];
					return h/2+15+5 * d + PLUS_Y;
			 });
	};
	function decide2(swap_array_x, swap_array_y, decided){
			graph2.transition()
					 .duration(SPEED)
					 .attr("fill", function(d, i){
					 	var point = swap_array_x[i][1];
				    if (point >= decided){
					 		return "orange";
					 	}
					 	else{
					 		return "white";
					 	}
					 });
	};



	var step = 0;
	var action = [];

	init();

	heapsort(new_dataset);
	console.log(new_dataset);
	console.log(action);

	action.push({type:"初期化", array_x:getSwapNumber(dataset,dataset), array_y:getSwapNumber(dataset,dataset), decided:dataset.length});


	function view(){
		var type = action[step].type;
		var swap_array_x = action[step].array_x;
		var swap_array_y = action[step].array_y;
		var decided = action[step].decided;
		//move(swap_array);
		switch(type){
			case "heapify":
			console.log(type);
			drawHeap(swap_array_x,swap_array_y, decided);
			drawHeap2(swap_array_y,swap_array_y, decided);
			break;
			case "heapify2":
			console.log(type);
			drawHeap(swap_array_x,swap_array_y, decided);
			drawHeap2(swap_array_y,swap_array_y, decided);
			break;
			case "select":
			console.log(type);
			selected(swap_array_x,swap_array_y, decided);
			selected2(swap_array_y,swap_array_y, decided);
			break;
			case "swap":
			console.log(type);
			move(swap_array_x,swap_array_y, decided);
			move2(swap_array_y,swap_array_y, decided);
			break;
			case "decide":
			console.log(type);
			decide(swap_array_x,swap_array_y, decided);
			decide2(swap_array_x,swap_array_y, decided);
			break;
			case "初期化":
			console.log(type);
			decide(swap_array_x,swap_array_y, decided);
			decide2(swap_array_x,swap_array_y, decided);
			break;
		}
		step+=1;
		if(step>action.length-1){
			step=0;
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

	function heapify(array_data, index, max){
		var left = 2*index + 1;
		var right = 2*index + 2;

		var largest = index;
		
		if(left < max && array_data[left] > array_data[index]){
			largest = left;
		}

		if(right < max && array_data[right] > array_data[largest]){
			largest = right;
		}
		if(largest != index){
			swap(array_data, index, largest);
			heapify(array_data, largest, max);
		}
	}
	function buildHeap(array_data){
		console.log("buildHeap");
		for (var j=Math.floor(array_data.length/2) - 1 ; j>=0;j--){
			heapify(array_data, j, array_data.length);
		}

	}
	function heapsort(array_data){
		console.log("buildHeap");
		buildHeap(array_data);
		var tmp = copy(array_data);
		//action.push({type:"heapify", array:getSwapNumber(dataset,tmp), decided:array_data.length});
		action.push({type:"heapify", array_y:getSwapNumber(dataset,tmp),array_x:getSwapNumber(dataset,makeHeap(tmp, array_data.length)), decided:array_data.length});
		//console.log(makeHeap(tmp, array_data.length));
		for(var i = array_data.length - 1; i>0 ; i--){
			action.push({type:"select", array_y:getSwapNumber(dataset,tmp),array_x:getSwapNumber(dataset,makeHeap(tmp, i)), decided:i});

			console.log("swap");
			console.log(makeHeap(copy(array_data), i));
			swap(array_data, 0, i)
			tmp = copy(array_data);
			console.log(makeHeap(copy(array_data), i));
			action.push({type:"swap", array_y:getSwapNumber(dataset,tmp),array_x:getSwapNumber(dataset,makeHeap2(tmp, i)), decided:i});
			action.push({type:"decide", array_x:getSwapNumber(dataset,tmp),array_y:getSwapNumber(dataset,makeHeap2(tmp, i)), decided:i});

			console.log("heapify2");
			heapify(array_data, 0, i);
			tmp = copy(array_data);
			console.log(makeHeap(copy(array_data), i));
			action.push({type:"heapify2", array_y:getSwapNumber(dataset,tmp),array_x:getSwapNumber(dataset,makeHeap(tmp, i)), decided:i});
		}
		action.push({type:"decide", array_x:getSwapNumber(dataset,tmp),array_y:getSwapNumber(dataset,makeHeap(tmp, 0)), decided:0});
	}

	function makeHeap(array_data, decided){
		console.log(decided);
		var tmp = copy(array_data);
		switch(decided){
			case 7:
			return [tmp[3],tmp[1],tmp[4],tmp[0],tmp[5],tmp[2],tmp[6]];
			case 6:
			return [tmp[3],tmp[1],tmp[4],tmp[0],tmp[5],tmp[2],tmp[6]];
			case 5:
			return [tmp[3],tmp[1],tmp[4],tmp[0],tmp[2],tmp[5],tmp[6]];
			case 4:
			return [tmp[3],tmp[1],tmp[0],tmp[2],tmp[4],tmp[5],tmp[6]];
			case 3:
			return [tmp[1],tmp[0],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]];
			case 2:
			return [tmp[1],tmp[0],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]];
			case 1:
			return [tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]];
			case 0:
			return [tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]];
		}
	}
	function makeHeap2(array_data, decided){
		console.log(decided);
		var tmp = copy(array_data);
		switch(decided){
			case 7:
			return [tmp[3],tmp[1],tmp[4],tmp[0],tmp[5],tmp[2],tmp[6]];
			case 6:
			return [tmp[3],tmp[1],tmp[4],tmp[0],tmp[5],tmp[2],tmp[6]];
			case 5:
			return [tmp[3],tmp[1],tmp[4],tmp[0],tmp[5],tmp[2],tmp[6]];
			case 4:
//			return [tmp[0],tmp[0],tmp[0],tmp[0],tmp[4],tmp[5],tmp[6]];
			console.log("[tmp[3],tmp[1],tmp[0],tmp[2],tmp[4],tmp[5],tmp[6]]");
			console.log([tmp[3],tmp[1],tmp[4],tmp[0],tmp[2],tmp[5],tmp[6]]);
			return [tmp[3],tmp[1],tmp[4],tmp[0],tmp[2],tmp[5],tmp[6]];
			case 3:
			console.log("[tmp[1],tmp[0],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]]");
			console.log([tmp[1],tmp[0],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]]);
			return [tmp[3],tmp[1],tmp[0],tmp[2],tmp[4],tmp[5],tmp[6]];
			case 2:
			console.log("[tmp[1],tmp[0],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]]");
			console.log([tmp[1],tmp[0],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]])
			return [tmp[1],tmp[0],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]];
			case 1:
			console.log("[tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]]");
			console.log([tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]])
			return [tmp[1],tmp[0],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]];
			case 0:
			return [tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]];
		}
	}

	// コードハイライト
	var editor = ace.edit("editor");
	function setCodeLine(start, end){
		var range = editor.getSession().highlightLines(start, end, "code_highlight");
		if(range.id>3){
			editor.getSession().removeMarker(range.id-1);
		}
	}


})();