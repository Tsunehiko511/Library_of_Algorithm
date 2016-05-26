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
            setColorLine(1);
			setColorLine(2);
			count_anime += 1;
			break;
        case 1:
            for (var t = 0; t<=6;t++){
                draw_line(t,1,'black');
            }
            deleteColorLine(1)
            deleteColorLine(2)
            setColorLine(3);
            count_anime += 1;
            break;
        case 2:
            draw_neighbor(k);
            deleteColorLine(3)
            setColorLine(4);
            count_anime += 1;
            break;
		// 数を数える(赤)
		case 3:
            deleteColorLine(4)
            setColorLine(5);
            setColorLine(6);
            draw_line(3,5,"orange");
			count_anime += 1;
			break;
		case 4:
            deleteColorLine(6);
            setColorLine(7);
			count_anime += 1;
			break;
		case 5:
            deleteColorLine(7);
            setColorLine(6);
            draw_line(2,5,"orange");
			count_anime += 1;
			break;
		case 6:
            deleteColorLine(6);
            setColorLine(7);
			count_anime += 1;
			break;
		case 7:
            deleteColorLine(7);
            setColorLine(8);
            draw_line(4,5,"orange");
			count_anime += 1;
			break;
		case 8:
            deleteColorLine(8);
            setColorLine(9);
            count_anime += 1;
			break;
		case 9:
            deleteColorLine(5);
            deleteColorLine(9);
            setColorLine(10);
			count_anime += 1;
			break;
		case 10:
			if(k==3){
				draw_fact("red");
                deleteColorLine(10);
                setColorLine(11);
			}else if(k==5){
				draw_fact("blue");
                deleteColorLine(10);
                setColorLine(13);
			}
			count_anime += 1;
			break;
        case 11:
            deleteColorLine(11);
            setColorLine(14);
            count_anime += 1;
            break;
		default:
			delet();
			draw_base();
			count_anime = 0;
			color_lines(15);
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

var count = 1;

function setColorLine(n){
    document.getElementById('code'+ n).style.backgroundColor = 'Yellow';
}
function deleteColorLine(n){
    document.getElementById('code'+ n).style.backgroundColor = 'transparent';
}

function color_lines(times){
	for(var i=times-1;i>0;i--){
		document.getElementById('code'+ i).style.backgroundColor = 'transparent';
	}
	for(var i=times+1;i<14;i++){
		document.getElementById('code'+ i).style.backgroundColor = 'transparent';
	}

	if(times<=14){
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
	if(count>14){
		count = 1;
	}
	document.getElementById('code'+ count).style.backgroundColor = '#FEFEC8';
	count += 1;
}

function start(){
	color_line();
	//setInterval("color_line()",1000);
}