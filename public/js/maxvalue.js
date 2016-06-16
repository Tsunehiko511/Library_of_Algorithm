(function(){
	/*var cnv = document.getElementById('myCanvas');
	var ctx = cnv.getContext('2d');
	ctx.fillRect(20,20,cnv.width-40,cnv.height-40);*/

	var count_anime = -1; // インクリメントしてから描画するので、－1から始める
	var max_anime = 12; // スライドの枚数
	var values = []; // 入力
	var maxValue = 0; // values[maxValue]がvaluesの最大値になる
	var cnv = document.getElementById('myCanvas');
	var ctx = cnv.getContext('2d');

	// タッチスクリーンなら
	if (window.ontouchstart===null){
		// 素早くタップしたときにダブルタップとみなされて拡大されるのを防ぐ
		cnv.addEventListener('touchstart',function(e){ e.preventDefault(); goNext();},false);
	}

	// タッチスクリーンでないなら
	else{
		// 'click'(=onClick)を使わないのは、素早くクリックしたときにダブルクリックとみなされて画面が選択されるのを防ぐため
		cnv.addEventListener('mousedown',function(e){ e.preventDefault();},false);
		cnv.addEventListener('mouseup',goNext,false);
	}

	function goNext(){

		// インクリメント
		count_anime++;


		// 最後まで行ったら最初に戻す
		if (count_anime>=max_anime){
			count_anime = -1;
			return setCodeLine(20,20);
		}

		// まずはcnvをクリアする
		ctx.clearRect(0,0,cnv.width,cnv.height);

		ctx.font = 'normal 18px sans-serif';
		ctx.textBaseline = 'middle';
		ctx.textAlign = 'center';
		// バーの幅、バーとバーの隙間、バーの単位あたりの高さ
		var barWidth = 30, barMargin = 5, barHeight = 7;

		if (count_anime==0){
			for (var i=0; i<10; i++){
				values[i] = 1+Math.floor(Math.random()*20); // 1～20までの乱数
			}
		}
		var n = count_anime-1;
		if (n>=0){
			if (n==0){
				maxValue = n;
				setCodeLine(4,4);
			}
			else{
				if (n<10) setCodeLine(6,6);
				if (values[maxValue]<values[n]){
					maxValue = n;
					setCodeLine(7,7);
				}
			}
			ctx.fillStyle = 'black';
			ctx.fillText('max',110,220);
			ctx.fillStyle = 'red';
			ctx.fillRect(100,200-values[maxValue]*barHeight,barWidth,values[maxValue]*barHeight);
			ctx.fillText(values[maxValue],100+barWidth/2,200-values[maxValue]*barHeight-20);
		}
		for (var i=0; i<10; i++){
			ctx.fillStyle = (n==i) ? 'green' : 'blue';
			ctx.fillRect(200+i*(barWidth+barMargin),200-values[i]*barHeight,barWidth,values[i]*barHeight);
			ctx.fillText(values[i],200+barWidth/2+i*(barWidth+barMargin),200-values[i]*barHeight-20);
			ctx.fillStyle = 'black';
			ctx.fillText(i,200+barWidth/2+i*(barWidth+barMargin),220);
		}
		if (count_anime>10){
			ctx.clearRect(50,200-values[maxValue]*barHeight-40,100,40);
			ctx.fillStyle = 'red';
			ctx.fillText('最大値は'+values[maxValue],100+barWidth/2,200-values[maxValue]*barHeight-20,100);
			setCodeLine(8,8);
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