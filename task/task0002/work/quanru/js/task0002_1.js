function hobbyOnclick (){
	$.click("#subBtn", listenner);
}
function listenner (event){
	var hobbies = uniqArray($("#hobbyInput").value.split(/[\s;,，、 ；]/));
	if(hobbies.length > 10 || (hobbies.length == 1 &&hobbies[0] === "") )
	{
		if(!$("#warn"))
		{
			var hobbyWarn = document.createElement("div");
			var warnText = document.createTextNode("至少输入一个爱好且不能超过十个！");
			hobbyWarn.appendChild(warnText);
			hobbyWarn.style.color="red";
			hobbyWarn.id="warn";
			hobbyWarn.style.display="block";
			$("body").insertBefore(hobbyWarn,$("#subBtn"));
		}
		else
		{
			$("#warn").style.display="block";
		}
		return;
	}
	for (var i = 0; i < hobbies.length; i++) {
		if(hobbies[i] === "" || hobbies[i] == " " || typeof(hobbies[i]) == "undefined")
		{
			hobbies.splice(i, 1);
			i--;
		}
	}
	//hobbies = hobbies.join("、")
	var hobbyCheckbox = [];
	for (var j = 0; j < hobbies.length; j++) {
		hobbyCheckbox[j] = document.createElement("input");
		hobbyCheckbox[j].type = "checkbox";
		var hobbyText = document.createTextNode(hobbies[j]);
		$("body").appendChild(hobbyCheckbox[j]);
		$("body").appendChild(hobbyText);
	}
	
	if($("#warn"))
	{
		$("#warn").style.display="none";
	}
}

window.onload = hobbyOnclick;