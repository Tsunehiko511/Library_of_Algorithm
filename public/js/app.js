onload = function() {
	draw_base();
};

var count_anime = 0;
function anime(k){

	switch(count_anime){
		case 0:
			draw_line();
			color_lines(3);
			count_anime += 1;
			break;
		case 1:
			draw_neighbor(k);
			color_lines(5);
			count_anime += 1;
			break;
		// 数を数える(赤)
		case 2:
			color_lines(6);
			count_anime += 1;
			break;
		case 3:
			color_lines(7);
			count_anime += 1;
			break;
		case 4:
			color_lines(6);
			count_anime += 1;
			break;
		case 5:
			color_lines(7);
			count_anime += 1;
			break;
		case 6:
			color_lines(8);
			count_anime += 1;
			break;
		case 7:
			color_lines(9);
			count_anime += 1;
			break;
		case 8:
			color_lines(10);
			count_anime += 1;
			break;
		case 9:
			if(k==3){
				draw_fact("red");
				color_lines(11);
			}else if(k==5){
				draw_fact("blue");
				color_lines(13);
			}
			count_anime += 1;
			break;
		default:
			delet();
			draw_base();
			count_anime = 0;
			color_lines(14);
			break;
	}
}
function delet(){
    var canvas = document.getElementById("sample");
    var context = canvas.getContext('2d');
    context.clearRect(0,0,canvas.width,canvas.height);
}

function draw_base() {
  //描画コンテキストの取得
  var canvas = document.getElementById('sample');
  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    //ここに具体的な描画内容を指定する
    context.beginPath();
    context.arc(350,220, 15, 0, Math.PI*2, false);
    context.fillStyle = "green";
    context.fill();
    //0
    context.font= 'bold 20px Century Gothic';
    context.beginPath();
    context.arc(400,200, 15, 0, Math.PI*2, false);
    context.fillStyle = "red";
    context.fill();
    context.fillStyle = "black";
    context.fillText('a3,b3',400,185);
    //1
    context.beginPath();
    context.arc(400,280, 15, 0, Math.PI*2, false);
    context.fillStyle = "red";
    context.fill();
    context.fillStyle = "black";
    context.fillText('a2,b2',400,265);
    // 2
    context.beginPath();
    context.arc(270,280, 15, 0, Math.PI*2, false);
    context.fillStyle = "blue";
    context.fill();
    context.fillStyle = "black";
    context.fillText('a4,b4',270,265);
    // 3
    context.beginPath();
    context.arc(210,240, 15, 0, Math.PI*2, false);
    context.fillStyle = "blue";
    context.fill();
    context.fillStyle = "black";
    context.fillText('a5,b5',210,225);
    // 4
    context.beginPath();
    context.arc(300,60, 15, 0, Math.PI*2, false);
    context.fillStyle = "blue";
    context.fill();
    context.fillStyle = "black";
    context.fillText('a1,b1',300,45);
    // 5
    context.beginPath();
    context.arc(400,30, 15, 0, Math.PI*2, false);
    context.fillStyle = "red";
    context.fill();
    context.fillStyle = "black";
    context.fillText('a0,b0',400,15);
    // 6
    context.beginPath();
    context.arc(500,20, 15, 0, Math.PI*2, false);
    context.fillStyle = "red";
    context.fill();
    context.fillStyle = "black";
    context.fillText('a6,b6',500,45);
  }
}
function draw_line(){
  var canvas = document.getElementById('sample');
  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.moveTo(350,220);
    // 1
    context.lineTo(400,200);
    context.closePath();
    context.stroke();
    // 2
    context.beginPath();
    context.moveTo(350,220);
    //座標を指定してラインを引いていく
    context.lineTo(400,280);
    context.closePath();
    context.stroke();
    // 3
    context.beginPath();
    context.moveTo(350,220);
    //座標を指定してラインを引いていく
    context.lineTo(270,280);
    context.closePath();
    context.stroke();
    // 4
    context.beginPath();
    context.moveTo(350,220);
    //座標を指定してラインを引いていく
    context.lineTo(210,240);
    context.closePath();
    context.stroke();
    // 5
    context.beginPath();
    context.moveTo(350,220);
    //座標を指定してラインを引いていく
    context.lineTo(300,60);
    context.closePath();
    context.stroke();
    // 6
    context.beginPath();
    context.moveTo(350,220);
    //座標を指定してラインを引いていく
    context.lineTo(400,30);
    context.closePath();
    context.stroke();
    // 7
    context.beginPath();
    context.moveTo(350,220);
    //座標を指定してラインを引いていく
    context.lineTo(500,20);
    context.closePath();
    context.stroke();
  }
  draw_base();
}

function draw_neighbor(k){
  var canvas = document.getElementById('sample');
  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    //ここに具体的な描画内容を指定する
    context.beginPath();
    if(k==3){
    	context.arc(350,220, 120, 0, Math.PI*2, false);
    }else if(k==5){
    	context.arc(350,220, 180, 0, Math.PI*2, false);    	
    }
    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.fillText('k=3',450,120);
    context.stroke();
    context.closePath();
  }
}
function draw_fact(color){
  var canvas = document.getElementById('sample');
  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    //ここに具体的な描画内容を指定する
    context.beginPath();
    context.arc(350,220, 16, 0, Math.PI*2, false);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  }
}

var count = 1;

function color_lines(times){
	for(var i=times-1;i>0;i--){
		document.getElementById('code'+ i).style.backgroundColor = 'transparent';
	}
	for(var i=times+1;i<14;i++){
		document.getElementById('code'+ i).style.backgroundColor = 'transparent';
	}

	if(times<=13){
		document.getElementById('code'+ times).style.backgroundColor = 'Yellow';
	}
}

function color_line(){
    for(var i=count-1;i>0;i--){
        document.getElementById('code'+ i).style.backgroundColor = 'transparent';
    }
    for(var i=count+1;i<14;i++){
        document.getElementById('code'+ i).style.backgroundColor = 'transparent';
    }
	if(count>13){
		count = 1;
	}
	document.getElementById('code'+ count).style.backgroundColor = '#FEFEC8';
	count += 1;
}

function start(){
	color_line();
	//setInterval("color_line()",1000);
}