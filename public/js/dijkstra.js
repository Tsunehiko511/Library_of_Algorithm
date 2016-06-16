(function(){
	
	var canvas = document.getElementById('sample');
	var ctx = canvas.getContext('2d');


	var count_anime = 0;
	var count_neighbor = 0;
	var count_step = 0;

	var w = canvas.width, h = canvas.height, w2 = w/8, h2 = h/4;
	var radius = 33;
	var node = [
		{
			x: w2, // ノードのx座標
			y: 2*h2, // ノードのy座標
			score: 0, // ノードのスコア（暫定最短距離）。スタートノードは0、他は無限大
			txt: '0',
			visited: false, // 処理済みか。すべての隣接ノードを調べ終えたら処理済みにする
			distance: [0,1,5,0,0,0] // 各ノードまでの距離。0は未接続
		},
		{x: 3*w2, y: h2, score: Infinity, txt: '∞', visited: false, distance: [1,0,2,4,4,0], from: -1},
		{x: 3*w2, y: 3*h2, score: Infinity, txt: '∞', visited: false, distance: [5,2,0,1,6,0], from: -1},
		{x: 5*w2, y: h2, score: Infinity, txt: '∞', visited: false, distance: [0,4,1,0,5,2], from: -1},
		{x: 5*w2, y: 3*h2, score: Infinity, txt: '∞', visited: false, distance: [0,4,6,5,0,3], from: -1},
		{x: 7*w2, y: 2*h2, score: Infinity, txt: '∞', visited: false, distance: [0,0,0,2,3,0], from: -1}
	];
	var current; // 現在のノード
	var goalNode = 5;


	canvas.addEventListener('click',function(){goNext();},false);
	/*
	// タッチスクリーンなら
	if (window.ontouchstart===null){
		// e.preventDefault()で、素早くタップしたときにダブルタップとみなされて拡大されるのを防ぐ
		canvas.addEventListener('touchstart',function(e){ e.preventDefault(); goNext();},false);
	}

	// タッチスクリーンでないなら
	else{
		// 'click'(=onClick)を使わないのは、素早くクリックしたときにダブルクリックとみなされて画面が選択されるのを防ぐため
		canvas.addEventListener('mousedown',function(e){ e.preventDefault();},false);
		canvas.addEventListener('mouseup',goNext,false);
	}*/

	function goNext(){

		// まずはcanvasをクリアする
		ctx.clearRect(0,0,canvas.width,canvas.height);

		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.font = 'normal 16px sans-serif';
		ctx.fillStyle = 'black';
		ctx.fillText('スタート',w2,1.4*h2);
		ctx.fillText('ゴール',w-w2,1.4*h2);

		var makeRed = {
			edge: [
				[0,0,0,0,0,0],
				[0,0,0,0,0,0],
				[0,0,0,0,0,0],
				[0,0,0,0,0,0],
				[0,0,0,0,0,0],
				[0,0,0,0,0,0]
			],
			node: [0,0,0,0,0,0],
			score: [0,0,0,0,0,0]
		};

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
				if (!node[i].visited && node[i].score<minScore){
					current = i;
					minScore = node[i].score;
					flag = true;
				}
			}
			if (!flag){
				count_anime = 0;
				count_neighbor = 0;
				count_step = 0;
				node[current].visited = true;
				setCodeLine(19, 19);// obj[7].style.backgroundColor = 'yellow';
				current = goalNode;
				while (node[current].from>=0){
					if (node[current].from>current) makeRed.edge[current][node[current].from] = 1;
					else makeRed.edge[node[current].from][current] = 1;
					current = node[current].from;
				}
				setCodeLine(19, 19); // 終了
			}else{
				makeRed.node[current] = 1;
				setCodeLine(9, 9);// obj[1].style.backgroundColor = 'yellow';
				count_anime++;
			}
		}else if (count_anime==2){
			while (node[current].distance[count_neighbor]===0 || node[count_neighbor].visited){
				count_neighbor++;
				if (count_neighbor>=node.length){
					count_anime++;
					return goNext();
				}
			}
			var dist = node[current].distance[count_neighbor];
			makeRed.node[current] = 1;
			if (count_step<3) makeRed.score[current] = 1;
			if (current>count_neighbor) makeRed.edge[count_neighbor][current] = 1;
			else makeRed.edge[current][count_neighbor] = 1;
			if (count_step<2) {	
				setCodeLine(12+count_step, 13+count_step);
				if(count_step==1){
					setCodeLine(13+count_step, 13+count_step);
				}
			}// obj[count_step+3].style.backgroundColor = 'yellow';
			if (count_step>=1){
				makeRed.score[count_neighbor] = 1;
				node[count_neighbor].txt = node[count_neighbor].txt+'>'+(node[current].score+dist)+'?';
			}
			if (count_step>=2){
				if (node[count_neighbor].score>node[current].score+dist){
					node[count_neighbor].score = node[current].score+dist;
					node[count_neighbor].from = current;
					setCodeLine(15, 16); // obj[5].style.backgroundColor = 'yellow';
				}else setCodeLine(15, 16);// obj[4].style.backgroundColor = 'yellow';
				node[count_neighbor].txt = node[count_neighbor].score;
			}

			count_step++;
			if (count_step==3){
				count_step = 0;
				count_neighbor++;
				if (count_neighbor>=node.length) count_anime++;
			}
		}else if (count_anime==3){
			count_anime = 1;
			count_neighbor = 0;
			count_step = 0;
			node[current].visited = true;
			setCodeLine(18, 18) // 処理済みにする
		}

		ctx.font = 'normal 20px sans-serif';
		for (var i=0; i<node.length-1; i++){
			for (var j=i+1; j<node.length; j++){
				if (node[i].distance[j]>0){
					if (makeRed.edge[i][j]){
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
					else if (node[i].y>node[j].y) posX -= 10;
					else if (node[i].y<node[j].y) posX += 10;
					if (node[i].y==node[j].y) posY -= 12;
					else if (node[i].x<node[j].x) posY -= 10;
					else if (node[i].x>node[j].x) posY += 10;

					if (i==1&&j==4){ posX -= 35; posY -= 30;}
					if (i==2&&j==3){ posX -= 28; posY += 35;}

					ctx.fillText(node[i].distance[j],posX,posY);
				}
			}
		}

		ctx.font = 'normal 26px sans-serif';
		for (var i=0; i<node.length; i++){
			ctx.beginPath();
			ctx.arc(node[i].x,node[i].y,radius,0,2*Math.PI,false);
			if (node[i].visited){
				ctx.fillStyle = 'pink';
			}else{
				ctx.fillStyle = 'white';
			}
			ctx.fill();
			if (makeRed.node[i]){
				ctx.lineWidth = 4;
				ctx.strokeStyle = 'red';
			}else{
				ctx.lineWidth = 1;
				ctx.strokeStyle = 'black';
			}
			ctx.stroke();
			if (makeRed.score[i]){
				ctx.lineWidth = 4;
				ctx.fillStyle = 'red';
			}else{
				ctx.lineWidth = 1;
				ctx.fillStyle = 'black';
			}
			ctx.fillText(node[i].txt,node[i].x,node[i].y);
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