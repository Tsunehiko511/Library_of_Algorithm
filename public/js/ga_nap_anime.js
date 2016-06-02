// setColorLine(1);

var editor = ace.edit("editor");

//画像を配列に格納する
var img = new Array();
const PNG_L = 21
img[0] = new Image();
img[0].src = "/img/ga_nap_anime/ga_nap_anime.1.png";
for(var i=1; i<=PNG_L;i++){
	img[i] = new Image();
	img[i].src = "/img/ga_nap_anime/ga_nap_anime."+i+".png";
}
/*img[16] = new Image();
img[16].src = "/img/ga_nap/ga_nap_anime.15.png";
*/
//画像番号用のグローバル変数
var cnt=1;

//画像切り替え関数
function changeIMG(){
  //画像番号を進める
  if (cnt == PNG_L){
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
setCodeLine();
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





