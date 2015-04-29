function hobbyOnclick (){
	$.click("#btn", listenner);
}

function fromNow (){
	var endDateStr = $("#etad").value.split("-");
	var year = endDateStr[0], month = endDateStr[1], day = endDateStr[2];
	var endDate = new Date(year,month-1,day);
	var nowDate = new Date();
	var leftTime = endDate.getTime() - nowDate.getTime();
	var leftSecond = parseInt(leftTime/1000);
	var day1=Math.floor(leftSecond/(60*60*24)); 
	var hour=Math.floor((leftSecond-day1*24*60*60)/3600); 
	var minute=Math.floor((leftSecond-day1*24*60*60-hour*3600)/60); 
	var second=Math.floor(leftSecond-day1*24*60*60-hour*3600-minute*60); 
	$("#showTime").innerHTML = "距离"+year+"年"+month+"月"+day+"日还有："+day1+"天"+hour+"小时"+minute+"分"+second+"秒"; 
}

function listenner (event){
	window.setInterval(fromNow, 1000);
}
window.onload = hobbyOnclick;