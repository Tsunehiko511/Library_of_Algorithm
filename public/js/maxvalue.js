(function(){
	
	var count_anime = -1; // インクリメントしてから描画するので、－1から始める
	var max_anime = 12; // スライドの枚数
	var values = []; // 入力
	var maxValue = 0; // values[maxValue]がvaluesの最大値になる
	var canvas = document.getElementById('sample');
	var context = canvas.getContext('2d');
	var obj = []; // document.getElementById('code'+i) オブジェクトを格納する配列
	for (var i=0; i<6; i++){
		obj[i] = document.getElementById('code'+i);
	}

	// タッチスクリーンなら
	if (window.ontouchstart===null){
		// 素早くタップしたときにダブルタップとみなされて拡大されるのを防ぐ
		canvas.addEventListener('touchstart',function(e){ e.preventDefault(); goNext();},false);
	}

	// タッチスクリーンでないなら
	else{
		// 'click'(=onClick)を使わないのは、素早くクリックしたときにダブルクリックとみなされて画面が選択されるのを防ぐため
		canvas.addEventListener('mousedown',function(e){ e.preventDefault();},false);
		canvas.addEventListener('mouseup',goNext,false);
	}

	function goNext(){

		// インクリメント
		count_anime++;

		// 疑似コードのハイライトを消す
		for (var i=0; i<6; i++){
			obj[i].style.backgroundColor = 'transparent';
		}

		// 最後まで行ったら最初に戻す
		if (count_anime>=max_anime){
			count_anime = -1;

			return obj[5].style.backgroundColor = 'yellow';
		}

		// まずはcanvasをクリアする
		context.clearRect(0,0,canvas.width,canvas.height);

		context.font = 'normal 18px sans-serif';
		context.textBaseline = 'middle';
		context.textAlign = 'center';

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
				obj[0].style.backgroundColor = 'yellow';
			}
			else{
				if (n<10) obj[1].style.backgroundColor = 'yellow';
				if (values[maxValue]<values[n]){
					maxValue = n;
					obj[2].style.backgroundColor = 'yellow';
					obj[3].style.backgroundColor = 'yellow';
				}
			}
			context.fillStyle = 'black';
			context.fillText('max = '+maxValue,110,220);
			context.fillStyle = 'red';
			context.fillRect(100,200-values[maxValue]*barHeight,barWidth,values[maxValue]*barHeight);
			context.fillText(values[maxValue],100+barWidth/2,200-values[maxValue]*barHeight-20);
		}
		for (var i=0; i<10; i++){
			context.fillStyle = (n==i) ? 'green' : 'blue';
			context.fillRect(200+i*(barWidth+barMargin),200-values[i]*barHeight,barWidth,values[i]*barHeight);
			context.fillText(values[i],200+barWidth/2+i*(barWidth+barMargin),200-values[i]*barHeight-20);
			context.fillStyle = 'black';
			context.fillText(i,200+barWidth/2+i*(barWidth+barMargin),220);
		}
		if (count_anime>10){
			context.clearRect(50,200-values[maxValue]*barHeight-40,100,40);
			context.fillStyle = 'red';
			context.fillText('最大値は'+values[maxValue],100+barWidth/2,200-values[maxValue]*barHeight-20,100);
			obj[4].style.backgroundColor = 'yellow';
		}
	}

	// まずは実行
	goNext();

})();