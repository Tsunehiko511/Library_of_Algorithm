(function(){
	
	var canvas = document.getElementById('sample');
	var ctx = canvas.getContext('2d');

	var count_anime = 0;
	var count_neighbor = 0;
	var count_step = 0;

	var w = canvas.width, h = canvas.height, w2 = w/6, h2 = h/6;
	var boxWidth = 80, boxHeight = 70;
	var d01 = 1, d12 = 6, d34 = 3, d45 = 5, d67 = 5, d78 = 3,
	    d03 = 7, d14 = 2, d25 = 4, d36 = 3, d47 = 2, d58 = 6;
	var node = [
		{
			x: w2, // ノードのx座標
			y: h2, // ノードのy座標
			distance: [0,d01,0,d03,0,0,0,0,0], // 各ノードまでの距離。0は未接続
			heuristics: 4
		},
		{x: 3*w2, y: h2, distance: [d01,0,d12,0,d14,0,0,0,0], heuristics: 3},
		{x: 5*w2, y: h2, distance: [0,d12,0,0,0,d25,0,0,0], heuristics: 2},
		{x: w2, y: 3*h2, distance: [d03,0,0,0,d34,0,d36,0,0], heuristics: 3},
		{x: 3*w2, y: 3*h2, distance: [0,d14,0,d34,0,d45,0,d47,0], heuristics: 2},
		{x: 5*w2, y: 3*h2, distance: [0,0,d25,0,d45,0,0,0,d58], heuristics: 1},
		{x: w2, y: 5*h2, distance: [0,0,0,d36,0,0,0,d67,0], heuristics: 2},
		{x: 3*w2, y: 5*h2, distance: [0,0,0,0,d47,0,d67,0,d78], heuristics: 1},
		{x: 5*w2, y: 5*h2, distance: [0,0,0,0,0,d58,0,d78,0], heuristics: 0}
	];
	var current; // 現在のノード
	var goalNode = 8;

	if (window.ontouchstart===null){
		canvas.addEventListener('touchstart',function(e){ e.preventDefault(); goNext();},false);
	}else{
		canvas.addEventListener('mousedown',function(e){ e.preventDefault();},false);
		canvas.addEventListener('mouseup',goNext,false);
	}

	function goNext(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.font = 'normal 16px sans-serif';
		ctx.fillStyle = 'black';
		ctx.fillText('スタート',w2,h2-boxHeight/2-15);
		ctx.fillText('ゴール',5*w2,5*h2+boxHeight/2+15);

		var mark = {edge: [], node: [], score: [], codes: []};
		for (var i=0,I=node.length; i<I; i++){
			mark.node[i] = 0;
			mark.edge[i] = [];
			for (var j=0; j<I; j++) mark.edge[i][j] = 0;
			mark.score[i] = 0;
		}

		if (count_anime==0){
			for (var i=0; i<node.length; i++){
				node[i].visited = false;
				node[i].score = (i==0) ? 0 : Infinity;
				node[i].txt = (i==0) ? '0' : '∞';
				node[i].from = -1;
			}
			count_anime++;
		}else if (count_anime==1){
			var minScore = Infinity, flag = false;
			for (var i=0; i<node.length; i++){
				if (!node[i].visited && node[i].score+node[i].heuristics<minScore){
					current = i;
					minScore = node[i].score+node[i].heuristics;
					flag = true;
				}
			}
			if (!flag){
				count_anime = 5;
				return goNext();
			}else{
				mark.node[current] = 1;
				mark.codes[1] = 1;//始まり
				setCodeLine(10,10);
				count_anime++;
				if (current==goalNode) count_anime = 5;
			}
		}else if (count_anime==2){
			while (node[current].distance[count_neighbor]===0){
				count_neighbor++;
				if (count_neighbor>=node.length){
					count_anime++;
					return goNext();
				}
			}
			var dist = node[current].distance[count_neighbor];
			mark.node[current] = 1;
			if (count_step<3) mark.score[current] = 1;
			if (current>count_neighbor) mark.edge[count_neighbor][current] = 1;
			else mark.edge[current][count_neighbor] = 1;
			if (count_step<2) {
				mark.codes[count_step+4] = 1;setCodeLine(14,15);
				if(count_step==1){
					setCodeLine(17,17);
				}
			}
			if (count_step>=1){
				mark.score[count_neighbor] = 1;
				if (node[count_neighbor].score<=node[current].score+dist) count_step++;
			}
			if (count_step>=2){
				if (node[count_neighbor].score>node[current].score+dist){
					node[count_neighbor].visited = false;
					node[count_neighbor].score = node[current].score+dist;
					node[count_neighbor].from = current;
					//4,7 隣接点のスコア＝暫定スコア,隣接点の直前の頂点＝現在位置 18,19
					setCodeLine(18,19);
					mark.codes[6] = 1;
				}else{setCodeLine(17,17); mark.codes[5] = 1;}//11 if 隣接点のスコア＞暫定スコア
				node[count_neighbor].txt = node[count_neighbor].score;
			}

			count_step++;
			if (count_step==3){
				count_step = 0;
				count_neighbor++;
				if (count_neighbor>=node.length) count_anime++;
			}
		}else if (count_anime==3){
			count_anime -= 2;
			count_neighbor = 0;
			count_step = 0;
			node[current].visited = true;
			mark.codes[7] = 1;
			setCodeLine(21,21)
		}else if (count_anime==5){
			mark.node[current] = 1;
			count_anime = 0;
			count_neighbor = 0;
			count_step = 0;
			node[current].visited = true;
			while (node[current].from>=0){
				if (node[current].from>current) mark.edge[current][node[current].from] = 1;
				else mark.edge[node[current].from][current] = 1;
				current = node[current].from;
			}
			mark.codes[2] = 1;
			mark.codes[8] = 1;
			setCodeLine(11,11)
		}

		ctx.font = 'normal 20px sans-serif';
		for (var i=0; i<node.length-1; i++){
			for (var j=i+1; j<node.length; j++){
				if (node[i].distance[j]>0){
					if (mark.edge[i][j]){
						ctx.lineWidth = 4;
						ctx.strokeStyle = ctx.fillStyle = 'red';
					}else{
						ctx.lineWidth = 1;
						ctx.strokeStyle = ctx.fillStyle = 'black';
					}
					ctx.beginPath();
					ctx.moveTo(node[i].x,node[i].y);
					ctx.lineTo(node[j].x,node[j].y);
					ctx.stroke();
					if (node[i].from==j || node[j].from==i){
						var theta = Math.atan2(node[j].y-node[i].y,node[j].x-node[i].x);
						var midX = (2*node[j].x+node[i].x)/3, midY = (2*node[j].y+node[i].y)/3;
						ctx.beginPath();
						if (node[j].from==i) ctx.moveTo(midX+8*Math.cos(theta),midY+8*Math.sin(theta));
						else ctx.moveTo(midX-8*Math.cos(theta),midY-8*Math.sin(theta));
						theta += Math.PI/2;
						ctx.lineTo(midX+6*Math.cos(theta),midY+6*Math.sin(theta));
						ctx.lineTo(midX-6*Math.cos(theta),midY-6*Math.sin(theta));
						ctx.closePath();
						ctx.fill();
					}
					var posX = (node[i].x+node[j].x)/2, posY = (node[i].y+node[j].y)/2;
					if (node[i].x==node[j].x) posX -= 10;
					if (node[i].y==node[j].y) posY -= 12;
					ctx.fillText(node[i].distance[j],posX,posY);
				}
			}
		}

		ctx.font = 'normal 20px sans-serif';
		for (var i=0; i<node.length; i++){
			ctx.beginPath();
			ctx.rect(node[i].x-boxWidth/2,node[i].y-boxHeight/2,boxWidth,boxHeight);
			if (node[i].visited){
				ctx.fillStyle = 'pink';
			}else{
				ctx.fillStyle = 'white';
			}
			ctx.fill();
			if (mark.node[i]){
				ctx.lineWidth = 4;
				ctx.strokeStyle = 'red';
			}else{
				ctx.lineWidth = 1;
				ctx.strokeStyle = 'black';
			}
			ctx.stroke();
			if (mark.score[i]){
				ctx.lineWidth = 4;
				ctx.fillStyle = 'red';
			}else{
				ctx.lineWidth = 1;
				ctx.fillStyle = 'black';
			}
			ctx.fillText('S='+node[i].txt,node[i].x,node[i].y-15,boxWidth);
			ctx.fillStyle = 'black';
			ctx.fillText('H='+node[i].heuristics,node[i].x,node[i].y+15,boxWidth);
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

	// まずは実行
	goNext();

})();