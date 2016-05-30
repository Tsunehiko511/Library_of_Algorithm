setColorLine(1);

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
  document.getElementById("ga_nap_png").src=img[cnt].src;
}
function changeLINE(){
	if(cnt==1){
		deleteColorLine(8);
		setColorLine(1);
	}
	else if(cnt<=5){
		setColorLine(2);
		deleteColorLine(1);
		setColorLine(3);
	}
	else if(cnt==6){
		deleteColorLine(3);
		setColorLine(4);

	}
	else if(cnt<=10){
		deleteColorLine(4);
		setColorLine(5);
	}
	else if(cnt<=13){
		deleteColorLine(5);
		setColorLine(6);
	}
	else if(cnt==14){
		deleteColorLine(6);
	}
	else if(cnt==15){
		deleteColorLine(2);
		setColorLine(7);
	}
	else if(cnt==16){
		deleteColorLine(7);
		setColorLine(8);
	}
	else{
		deleteColorLine(8);
	}
	var startline = getCodeHighlight(cnt)[0];
	var endline = getCodeHighlight(cnt)[1];
	var range = editor.getSession().highlightLines(startline, endline, "code_highlight");
	console.log(range.id);
	if(range.id>3){
		editor.getSession().removeMarker(range.id-1);
	}
}

function setColorLine(n){
	if(n<-1){
		return 0;
	}
	document.getElementById('code'+ n).style.backgroundColor = 'Yellow';
}
function deleteColorLine(n){
	if(n<-1){
		return 0;
	}
	document.getElementById('code'+ n).style.backgroundColor = 'transparent';
}
function getCnt(){
	return cnt;
}
function getCodeHighlight(k){
	if(k==0){
		return [9,16];
	}else if(k<=5){
		return [23,32];
	}else if(k==6){
		return [33,34];
	}else if(k<=10){
		return [36,56];
	}else if(k<=13){
		return [58,64];
	}else{
		return [-1,-1];
	}
}





