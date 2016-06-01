(function(){
	
	var canvas = document.getElementById('sample');
	var ctx = canvas.getContext('2d');
	var obj = []; // document.getElementById('code'+i) オブジェクトを格納する配列
	for (var i=0; i<9; i++){
		obj[i] = document.getElementById('code'+i);
	}

	var count_anime = 0;
	var count_neighbor = 0;
	var count_step = 0;

	var w = canvas.width, h = canvas.height, w2 = w/8, h2 = h/4;
	var radius = 30;
	var edge = [1,6,2,4,4,1,7,5,2,3]; // 辺の長さ
	var node = [
		{
			x: w2, // ノードのx座標
			y: 2*h2, // ノードのy座標
			score: 0, // ノードのスコア（暫定最短距離）。スタートノードは0、他は無限大
			visited: false, // 処理済みか。すべての隣接ノードを調べ終えたら処理済みにする
			connected: [1,2] // 隣接ノード
		},
		{x: 3*w2, y: h2, score: Infinity, visited: false, connected: [0,2,3,4], from: -1},
		{x: 3*w2, y: 3*h2, score: Infinity, visited: false, connected: [0,1,3,4], from: -1},
		{x: 5*w2, y: h2, score: Infinity, visited: false, connected: [1,2,4,5], from: -1},
		{x: 5*w2, y: 3*h2, score: Infinity, visited: false, connected: [1,2,3,5], from: -1},
		{x: 7*w2, y: 2*h2, score: Infinity, visited: false, connected: [3,4], from: -1}
	];
	var current = 0; // 現在のノード


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
	}

	function goNext(){

		// 疑似コードのハイライトを消す
		for (var i=0; i<obj.length; i++){
			obj[i].style.backgroundColor = 'transparent';
		}

		// まずはcanvasをクリアする
		ctx.clearRect(0,0,canvas.width,canvas.height);

		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		ctx.font = 'normal 16px sans-serif';
		ctx.fillStyle = 'black';
		ctx.fillText('スタート',w2,1.4*h2);
		ctx.fillText('ゴール',w-w2,1.4*h2);

		var makeRed = {
			edge: [0,0,0,0,0,0,0,0],
			node: [0,0,0,0,0,0],
			score: [0,0,0,0,0,0]
		};

		if (count_anime==0){
			for (var i=0; i<node.length; i++){
				node[i].visited = false;
				node[i].score = (i==0) ? 0 : Infinity;
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
				obj[7].style.backgroundColor = 'yellow';
				while (node[current].from>=0){
					var A = findEdge(current,node[current].from);
					makeRed.edge[A] = 1;
					current = node[current].from;
				}
				obj[obj.length-1].style.backgroundColor = 'yellow';
			}else{
				makeRed.node[current] = 1;
				obj[1].style.backgroundColor = 'yellow';
				count_anime++;
			}
		}else if (count_anime==2){
			while (node[node[current].connected[count_neighbor]].visited){
				count_neighbor++;
				if (count_neighbor>=node[current].connected.length){
					count_anime++;
					return goNext();
				}
			}
			makeRed.node[current] = 1;
			if (count_step<3) makeRed.score[current] = 1;
			var neighbor = node[current].connected[count_neighbor];
			var A = findEdge(current,neighbor);
			makeRed.edge[A] = 1;
			if (count_step==0) obj[3].style.backgroundColor = 'yellow';
			if (count_step>=1){
				makeRed.score[neighbor] = 1;
				obj[4].style.backgroundColor = 'yellow';
				if (node[neighbor].score<=node[current].score+edge[A]) count_step++;
			}
			if (count_step>=2 && node[neighbor].score>node[current].score+edge[A]){
				node[neighbor].score = node[current].score+edge[A];
				node[neighbor].from = current;
				obj[5].style.backgroundColor = 'yellow';
			}
			count_step++;
			if (count_step==3){
				count_step = 0;
				count_neighbor++;
				if (count_neighbor>=node[current].connected.length) count_anime++;
			}
		}else if (count_anime==3){
			count_anime = 1;
			count_neighbor = 0;
			count_step = 0;
			node[current].visited = true;
			obj[6].style.backgroundColor = 'yellow';
		}

		ctx.font = 'normal 20px sans-serif';
		for (var i=0,a=0; i<node.length; i++){
			for (var j=0; j<node[i].connected.length; j++){
				var k = node[i].connected[j];
				if (i<k){
					ctx.beginPath();
					ctx.moveTo(node[i].x,node[i].y);
					ctx.lineTo(node[k].x,node[k].y);
					if (makeRed.edge[a]){
						ctx.lineWidth = 4;
						ctx.strokeStyle = ctx.fillStyle = 'red';
					}else{
						ctx.lineWidth = 1;
						ctx.strokeStyle = ctx.fillStyle = 'black';
					}
					ctx.stroke();
					var posX = (node[i].x+node[k].x)/2, posY = (node[i].y+node[k].y)/2;
					if (node[i].x==node[k].x) posX -= 10;
					else if (node[i].y>node[k].y) posX -= 10;
					else if (node[i].y<node[k].y) posX += 10;
					if (node[i].y==node[k].y) posY -= 12;
					else if (node[i].x<node[k].x) posY -= 10;
					else if (node[i].x>node[k].x) posY += 10;

					if (a==4){ posX -= 35; posY -= 30;}
					if (a==5){ posX -= 28; posY += 35;}

					ctx.fillText(edge[a],posX,posY);
					a++;
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
			var txt = isFinite(node[i].score) ? node[i].score : '∞';
			if (makeRed.score[i]){
				ctx.lineWidth = 4;
				ctx.fillStyle = 'red';
			}else{
				ctx.lineWidth = 1;
				ctx.fillStyle = 'black';
			}
			ctx.fillText(txt,node[i].x,node[i].y);
		}
	}

	function findEdge(a,b){
		if (a>b){ var temp = a; a = b; b = temp;}
		var arr = [[0,1],[0,2],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4],[3,5],[4,5]];
		for (var A=0; A<10; A++){
			if (arr[A][0]==a && arr[A][1]==b) return A;
		}
	}

	// まずは実行
	goNext();

})();