window.onload = drag;
var lefts = 4, rights = 4;
function drag (event) {
	$("#wrap").onmousedown = fnDown;
}

function fnDown(event) {
	var dragBox = event.target, nextElement = 1,
	posX = event.clientX  - dragBox.offsetLeft,
	posY = event.clientY - dragBox.offsetTop,
	newId;
	document.onmousemove = function(event) {
	dragBox.style.left = event.clientX - posX + 'px';
	dragBox.style.top =  event.clientY - posY + 'px';
	dragBox.style.opacity = 0.5;
	if(nextElement !== null && event.clientX > ($("#wrapLeft").offsetLeft + 250) && event.target.parentElement.id == "wrapLeft"){
		nextElement = dragBox.nextSibling;
		while(nextElement){
			
			if( nextElement !== null && nextElement.nodeType == 1)
			{
				nextElement.style.top = nextElement.offsetTop - 50 + 'px';
				newId = nextElement.id.substring(7) - 1;
				nextElement.id = "leftBox" + newId;
			}
			nextElement = nextElement.nextSibling;
		}
	}
		else if(nextElement !== null && event.clientX < ($("#wrapRight").offsetLeft) && event.target.parentElement.id == "wrapRight"){
			nextElement = dragBox.nextSibling;
			while(nextElement){
				
				if( nextElement !== null && nextElement.nodeType == 1)
				{
					nextElement.style.top = nextElement.offsetTop - 50 + 'px';
					newId = nextElement.id.substring(8) - 1;
					nextElement.id = "rightBox" + newId;
				}
				nextElement = nextElement.nextSibling;
			}
		
	}
	};
	document.onmouseup = function (event) {
		var newBox = document.createElement("div");
		if($("#wrapRight").offsetLeft < event.clientX && event.target.parentElement.id == "wrapLeft" ){
			dragBox.parentNode.removeChild(dragBox);
			lefts--;
			rights++;
			newBox.id = "rightBox" + rights;
			newBox.className = "dragBox";
			newBox.style.top = (rights-1)*50 + "px";
			$("#wrapRight").appendChild(newBox);
			document.onmousemove = null;
			document.onmouseup = null;
		}
		else if(($("#wrapLeft").offsetLeft + 250) > event.clientX && event.target.parentElement.id == "wrapRight"){
			dragBox.parentNode.removeChild(dragBox);
			rights--;
			lefts++;
			newBox.id = "leftBox" + lefts;
			newBox.className = "dragBox";
			newBox.style.top = (lefts-1)*50 + "px";
			$("#wrapLeft").appendChild(newBox);
			document.onmousemove = null;
			document.onmouseup = null;
		}
		else
		{
			document.onmousemove = null;
			document.onmouseup = null;
		}
	};
}