(function(){
	
	var canvas = document.getElementById('sample');
	var ctx = canvas.getContext('2d');

	var w = canvas.width, h = canvas.height, w2 = w/8, h2 = h/4;
	var radius = 30;
	var node = [
		{x: w2,y: 2*h2, score: 0, visited: false, distance: [0,8,4,0,0,0], from: [], alpha: 'A'},
		{x: 3*w2, y: h2, score: Infinity, visited: false, distance: [8,0,1,9,3,0], from: [], alpha: 'B'},
		{x: 3*w2, y: 3*h2, score: Infinity, visited: false, distance: [4,1,0,2,7,0], from: [], alpha: 'C'},
		{x: 5*w2, y: h2, score: Infinity, visited: false, distance: [0,9,2,0,5,6], from: [], alpha: 'D'},
		{x: 5*w2, y: 3*h2, score: Infinity, visited: false, distance: [0,3,7,5,0,5], from: [], alpha: 'E'},
		{x: 7*w2, y: 2*h2, score: Infinity, visited: false, distance: [0,0,0,6,5,0], from: [], alpha: 'F'}
	];
	var current; // 現在のノード
	var goalNode = 5;
	var answerPath;
	var answerDist = 0;

	// 距離をランダムに設定
	for (var i=0; i<node.length-1; i++){
		for (var j=i+1; j<node.length; j++){
			if (node[i].distance[j]>0){
				var rand = 1+Math.floor(9*Math.random());
				node[i].distance[j] = rand;
				node[j].distance[i] = rand;
			}
		}
	}

	document.getElementById('myForm').addEventListener('submit',function(e){
		e.preventDefault();
		var val = document.getElementById('myInput').value;
		if (val==='') return;
		var isCorrect = false;
		for (var i=0,aLen=answerPath.length; i<aLen; i++) if (val==answerPath[i]){ isCorrect = true; break;}
		var str = (isCorrect) ? '正解！' : '不正解';
		if (isCorrect && aLen>1){
			var temp = [];
			for (var j=0; j<aLen; j++) if (i!=j) temp.push(answerPath[j]);
			str += '（'+temp+'も正解）';
		}
		document.getElementById('myMessage').innerHTML = str;
	},false);

	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.textBaseline = 'middle';
	ctx.textAlign = 'center';
	ctx.font = 'normal 16px sans-serif';
	ctx.fillStyle = 'black';
	ctx.fillText('スタート',w2,1.4*h2);
	ctx.fillText('ゴール',w-w2,1.4*h2);

	ctx.font = 'normal 20px sans-serif';
	for (var i=0; i<node.length-1; i++){
		for (var j=i+1; j<node.length; j++){
			if (node[i].distance[j]>0){
				ctx.beginPath();
				ctx.moveTo(node[i].x,node[i].y);
				ctx.lineTo(node[j].x,node[j].y);
				ctx.lineWidth = 1;
				ctx.strokeStyle = ctx.fillStyle = 'black';
				ctx.stroke();
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
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.fillStyle = 'black';
		ctx.fillText(node[i].alpha,node[i].x,node[i].y);
	}

	while (true){
		var minScore = Infinity, flag = false;
		for (var i=0; i<node.length; i++){
			if (!node[i].visited && node[i].score<minScore){
				current = i;
				minScore = node[i].score;
				flag = true;
			}
		}
		if (!flag){
			node[current].visited = true;
			answerPath = [];
			answerDist = 0;
			for (var i=0; i<node[goalNode].from.length; i++){
				recursive(node[goalNode].from[i],node[goalNode].alpha);
			}
			function recursive(where,path){
				if (where===0) return answerPath.push(node[0].alpha+path);
				for (var I=0; I<node[where].from.length; I++) recursive(node[where].from[I],node[where].alpha+path);
			}
			break;
		}
		for (var i=0; i<node.length; i++) if (node[current].distance[i]>0){
			var tempDistance = node[current].score+node[current].distance[i];
			if (node[i].score>tempDistance){
				node[i].score = tempDistance;
				node[i].from = [current];
			}else if (node[i].score==tempDistance){
				node[i].from.push(current);
			}
		}
		node[current].visited = true;
	}

	var str = '&nbsp;<b>';
	for (var i=0; i<node.length; i++) str += node[i].alpha;
	str += '</b><br>';
	for (var i=0; i<node.length; i++){
		str += '<b>'+node[i].alpha+'</b>';
		for (var j=0; j<node.length; j++){
			str += node[i].distance[j]>0 ? node[i].distance[j] : '-';
		}
		str += '<br>';
	}
	document.getElementById('matrix').innerHTML = str;
	document.getElementById('distBE').innerHTML = node[1].distance[4];

})();