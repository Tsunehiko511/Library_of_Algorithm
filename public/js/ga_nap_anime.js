(function(){
	const PNG_NUMBER = 21
	var editor = ace.edit("editor");
	var photo = document.getElementById('ga_nap_png');
	var img = getImgFile("/img/ga_nap_anime/ga_nap_anime.", PNG_NUMBER)
	//画像番号用のグローバル変数
	var cnt=1;

	// タッチスクリーンなら
	if (window.ontouchstart===null){
		// 素早くタップしたときにダブルタップとみなされて拡大されるのを防ぐ
		photo.addEventListener('touchstart',function(e){ e.preventDefault(); changeIMG();setCodeLine();},false);
	}

	// タッチスクリーンでないなら
	else{
		// 'click'(=onClick)を使わないのは、素早くクリックしたときにダブルクリックとみなされて画面が選択されるのを防ぐため
		photo.addEventListener('mousedown',function(e){ e.preventDefault();},false);
		photo.addEventListener('mouseup',changeIMG,false);
		photo.addEventListener('mouseup',setCodeLine,false);
	}

	setCodeLine();


	function getImgFile(path, number){
		var img = new Array();
		img[0] = new Image();
		img[0].src = path+"1.png";
		for(var i=1; i<=number;i++){
			img[i] = new Image();
			img[i].src = path+i+".png";
		}	
		return img
	}

	//画像切り替え関数
	function changeIMG(){
	  //画像番号を進める
	  if (cnt == PNG_NUMBER){
	  	cnt=1;
	  }
	  else{
	  	cnt++;
	  }
	  //画像を切り替える
	  document.getElementById("ga_nap_png").src=img[cnt].src;
	}

	function setCodeLine(){
		var startline = getCodeHighlight(cnt)[0];
		var endline = getCodeHighlight(cnt)[1];
		var range = editor.getSession().highlightLines(startline, endline, "code_highlight");
		if(range.id>3){
			editor.getSession().removeMarker(range.id-1);
		}
	}

	function getCodeHighlight(k){
		if(k==1){
			return [8,8];
		}else if(k<=3){
			return [12,13];
		}else if(k==4){
			return [15,15];
		}else if(k==5){
			return [12,13];
		}else if(k==6){
			return [18,18];
		}else if(k==7){
			return [19,19];
		}else if(k<=10){
			return [22,22];
		}else if(k<=12){
			return [23,24];
		}else if(k<=13){
			return [26,26];
		}else if(k<=15){
			return [28,30];
		}else if(k<=16){
			return [31,31];
		}else if(k<=18){
			return [34,35];
		}else if(k==21){
			return [38,38];
		}else{
			return [-1,-1];
		}
	}
})();