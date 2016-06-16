onload = function() {
	draw_base();
};

function runLines(times){
    for (var t = 0; t<=times;t++){
        setTimeout("draw_line("+t+",1,'black')", t*250)
    }
}

var count_anime = 0;
function anime(k){

	switch(count_anime){
		case 0:
			runLines(6);
			count_anime += 1;
            setCodeLine(9,9);
			break;
        case 1:
            delet();
            for (var t = 0; t<=6;t++){
                draw_line(t,1,'black');
            }
            count_anime += 1;
            break;
        case 2:
            draw_neighbor(k);
            count_anime += 1;
            setCodeLine(10,10);
            break;
		// 数を数える(赤)
		case 3:
            delet();
            draw_neighbor(k);
            draw_line(3,5,"orange");
			count_anime += 1;
            setCodeLine(13,13);
			break;
		case 4:
			count_anime += 1;
            setCodeLine(14,14);
			break;
		case 5:
            delet();
            draw_neighbor(k);
            draw_line(2,5,"orange");
			count_anime += 1;
            setCodeLine(13,13);
			break;
		case 6:
			count_anime += 1;
            setCodeLine(14,14);
			break;
		case 7:
            delet();
            draw_neighbor(k);
            draw_line(4,5,"orange");
			count_anime += 1;
            setCodeLine(15,15);
			break;
		case 8:
            count_anime += 1;
            setCodeLine(16,16);
			break;
		case 9:
			count_anime += 1;
            setCodeLine(18,18);
			break;
		case 10:
			if(k==3){
				draw_fact("red");
            setCodeLine(19,19);
			}else if(k==5){
				draw_fact("blue");
			}
			count_anime += 1;
			break;
        case 11:
            count_anime += 1;
            break;
		default:
			delet();
			draw_base();
			count_anime = 0;
            setCodeLine(22,22);
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
    context.closePath();
  }
}
function position(n){
    switch(n){
        case -1:
        return {x:350,y:220};
        case 0:
        return {x:400,y:30};
        case 1:
        return {x:300,y:60};
        case 2:
        return {x:400,y:280};
        case 3:
        return {x:400,y:200};
        case 4:
        return {x:270,y:280};
        case 5:
        return {x:210,y:240};
        case 6:
        return {x:500,y:20};
        default:
        return {x:350,y:220};
    }
}


function draw_line(n,width,color){
    var canvas = document.getElementById('sample');
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
        context.beginPath();
        context.lineWidth = width;
        context.strokeStyle = color;
        context.moveTo(position(-1).x,position(-1).y);
        // 1
        context.lineTo(position(n).x,position(n).y);
        context.stroke();
        context.closePath();
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


// コードハイライト
var editor = ace.edit("editor");
function setCodeLine(start, end){
    var range = editor.getSession().highlightLines(start, end, "code_highlight");
    if(range.id>3){
        editor.getSession().removeMarker(range.id-1);
    }
}
