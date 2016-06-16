(function(){
	var editor = ace.edit("editor");
	//画像を配列に格納する
	var img = new Array();

	img[0] = new Image();
	img[0].src = "/img/ga_nap/ga_nap.1.png";
	for(var i=1; i<=15;i++){
		img[i] = new Image();
		img[i].src = "/img/ga_nap/ga_nap."+i+".png";
	}
	img[16] = new Image();
	img[16].src = "/img/ga_nap/ga_nap.15.png";

	//画像番号用のグローバル変数
	var cnt=1;


	//画像切り替え関数
	function changeIMG(){
	  //画像番号を進める
	  if (cnt == 16){
	  	cnt=1;
	  }
	  else{
	  	cnt++;
	  }
	  //画像を切り替える
	  document.getElementById("def_ga").src=img[cnt].src;
	}
	function changeLINE(){
		if(cnt==1){
			setCodeLine(6,6);
		}
		else if(cnt<=5){
			setCodeLine(8,8);
		}
		else if(cnt==6){
			setCodeLine(9,9);
		}
		else if(cnt<=10){
			setCodeLine(10,10);
		}
		else if(cnt<=13){
			setCodeLine(11,11);
		}
		else if(cnt==14){
			setCodeLine(7,7);
		}
		else if(cnt==15){
			setCodeLine(12,12);
		}
		else if(cnt==16){
			setCodeLine(13,13);
		}
		else{
			setCodeLine(12,12);
		}
	}

	var anime = document.getElementById('anime');
	// タッチスクリーンなら
	if (window.ontouchstart===null){
		// 素早くタップしたときにダブルタップとみなされて拡大されるのを防ぐ
		anime.addEventListener('touchstart',function(e){ e.preventDefault();changeLINE();changeIMG();},false);
	}
	// タッチスクリーンでないなら
	else{
		// 'click'(=onClick)を使わないのは、素早くクリックしたときにダブルクリックとみなされて画面が選択されるのを防ぐため
		anime.addEventListener('mousedown',function(e){ e.preventDefault();},false);
		anime.addEventListener('mouseup',changeIMG,false);
		anime.addEventListener('mouseup',changeLINE,false);
	}


	// コードハイライト
	function setCodeLine(start, end){
		var range = editor.getSession().highlightLines(start, end, "code_highlight");
		if(range.id>3){
			editor.getSession().removeMarker(range.id-1);
		}
	}

})();