function startAnimation() {
	//「#obj」を「0.5」秒かけて「left」方向に「200」px アニメーションさせる
	TweenMax.to('#obj', 1.5, { left: 200});
}

var count = 1;
function color_line(){
	if(count > 1){
		var num = count -1;
		document.getElementById('code'+ num).style.backgroundColor = 'transparent';
	}
	if(count>13){
		count = 1;
	}
	document.getElementById('code'+ count).style.backgroundColor = '#FEFEC8';
	count += 1;
}