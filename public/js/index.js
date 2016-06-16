(function(){
	const SPEED = 400;
	var w = 550, h = 350, barPadding = 60;
	var dataset = [5,9,8,3,1,6,4];
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
								 	return 4 * d+2 ;
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

	function move(swap_array,insert){
			graph.transition()
					 .duration(SPEED)
					 .attr("cx", function(d, i){
					 	var point = swap_array[i][1];// 置換行列
					 	return point * (w / dataset.length) + barPadding;;
					 })
					 .attr("fill", function(d, i){
					 	var point = swap_array[i][1];
				    if (point == insert){
					 		return "red";
					 	}
					 	else{
					 		return "black";
					 	}
					 })
				 .attr("cy", function(d, i){
				 	var point = swap_array[i][1];
				 	if (point == insert){
					 	return h/2+100;
				 	}
				 	return h/2;
				 });
		text.transition()
				.duration(SPEED)
				.attr("x", function(d, i){
				 var point = swap_array[i][1];					
				 var barXPosition = point * (w / dataset.length) + barPadding;
				 return barXPosition;
				})
			 .attr("y", function(d, i){
			 	var point = swap_array[i][1];
			 	if (point == insert){
				 return h/2+15+5 * d + 100;
			 	}
					return h/2+15+5 * d;
			 });
	};

	var step = 0;
	var action = [];

	init();
	insertionsort(new_dataset);
	action.push({type:"初期化", value:getSwapNumber(dataset,dataset), redPoint:-1});


	function view(){
		var type = action[step].type;
		var swap_array = action[step].value;
		var point = action[step].redPoint;
		switch(type){
			case "選択":
			move(swap_array, point);
			setCodeLine(9,9);
			break;
			case "比較1":
			setCodeLine(10,10);
			break;
			case "比較2":
			setCodeLine(12,12);
			break;
			case "移動":
			setCodeLine(13,14);
			move(swap_array, point);
			break;
			case "挿入":
			setCodeLine(15,15);
			move(swap_array, point);
			break;
			case "初期化":
			setCodeLine(16,16);
			move(swap_array, point);
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

	function insertionsort(array_data){
		for(var i = 1; i<array_data.length; i++){
			var tmp = array_data[i];
			
			action.push({type:"選択",value:getSwapNumber(dataset,array_data),redPoint:i});
			action.push({type:"比較1", value:0, redPoint:0});

			if(tmp < array_data[i-1]){
				var insert = i;

				action.push({type:"比較2", value:0, redPoint:0});

				while(tmp<array_data[insert-1] && insert>0){
					array_data[insert] = array_data[insert-1];
					var copy_tmp = copy(array_data);
					copy_tmp[insert] =　tmp;	
					insert --;
					if(insert+1 != i){

						action.push({type:"移動", value:getSwapNumber(dataset,copy_tmp), redPoint:insert+1});
						action.push({type:"比較2", value:0, redPoint:0});

					}
				}
				array_data[insert] = tmp;
				var tmp2 = copy(array_data);

				action.push({type:"移動", value:getSwapNumber(dataset,tmp2), redPoint:insert});
				action.push({type:"比較2", value:0, redPoint:0});
				action.push({type:"挿入", value:getSwapNumber(dataset,tmp2)});

			}
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



setInterval(function steps() {
	view();
}, 500);

})();