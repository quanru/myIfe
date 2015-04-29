// AJAX封装
function ajax(url, options) {
    if( window.XMLHttpRequest )
    {
    	xmlhttp = new XMLHttpRequest();
    }
    else
    {
    	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
    	if( xmlhttp.readyState == 4 && xmlhttp.status == 200 )
    	{
    		options.onsuccess(xmlhttp.responseText, xmlhttp);
    	}
    };
    var transManner = options.type || "POST";
    xmlhttp.open(transManner, url, true);
    if( transManner == "POST" && options.data !== undefined )
    {
    		var queryArray = [];
    		for(var attr in options.data){
                                        queryArray.push(attr + "=" + options.data[attr]);
	
    		}
            queryString=queryArray.join("&");
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(queryString);
    }
    else
    {
    		xmlhttp.send();
    }
    
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {

}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie = cookieName + "=" + encodeURIComponent(cookieValue) +( (expiredays === null ) ? "" : ";expires=" + exdate.toGMTString()) ;
}

// 获取cookie值
function getCookie(cookieName) {
	if( document.cookie.length > 0 )
	{
		c_start = document.cookie.indexOf(cookieName + "=");
		if( c_start != -1 )
		{
			c_start = c_start + cookieName.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if( c_end == -1 ) c_end = document.cookie.length;
			return decodeURIComponent(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

function clickListener(event) {
    console.log(event);
}

$.on=function(selector, event,listener)
{
    addEvent($(selector),event,listener);
};

$.click=function(selector, listener) 
{
	addClickEvent($(selector),listener);
};

$.un=function(selector, event, listener) 
{
	removeEvent($(selector),event,listener);
};

$.delegate=function(selector, tag, event, listener) 
{
	delegateEvent($(selector), tag, event, listener);
};

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    element.onclick=listener;
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
	document.onkeydown = function()
	{
		if(window.event.keyCode == 13)
		{
	   		listener();
		}
	};

}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
	event = "on" + event;
    	element[event]=listener;
}

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
	var eleChild = element.children;
	do{
		for (var i = 0; i < eleChild.length; i++) {
			addEvent(eleChild[i],eventName,listener);
		}
		eleChild = eleChild.children;
	}while(eleChild !== undefined);

}


// 移除element对象对于event事件发生时执行listener的响应，当listener为空时，移除所有响应函数
function removeEvent(element, event, listener) {
    event = "on" + event;
    element[event] = null;
    if( listener === null )
    {
    	for(var e in element){
    		if( e.substring(0,2) == "on" )
    		{
    			element[e]=null;
    		}
    	}
    }
}
function clicklistener(event) {
    alert('hi');
}

// 实现一个简单的Query
function getElementsByAttributeValue (attr,attrValue) {
	var elementArray = [];
	elementArray = document.getElementsByTagName("*");
	for (var i = 0; i < elementArray.length; i++)
	{
		if (elementArray[i].getAttribute(attr) == attrValue)
		{
			return elementArray[i];
		}
	}
}
function getElementsByAttribute (attr) {
	var elementArray = [];
	elementArray = document.getElementsByTagName("*");
	for (var i = 0; i < elementArray.length; i++)
	{

		for(var j = 0, length2 = elementArray[i].attributes.length; j < length2; j++){
			if ( elementArray[i].attributes[j].localName == attr)
			{
				return elementArray[i];
			}
		}

	}
}

function getElementsByClassNameFrom (e, firestClassName) {
	for (var i = 0; i < e.length; i++) {
		if( e[i].nodeType==1 && e[i].className == firestClassName)
			return e[i];
	}
}
function $(selector) {
	var selectors = selector.split(" ");
	var d;
	var selectors2;
	if( selectors.length == 1)
	{
		switch(selectors[0][0])
		{
			case '#':
				d = document.getElementById(selectors[0].substring(1));
				break;
			case '.':
				d = document.getElementsByClassName(selectors[0].substring(1));
				break;
			case '[':
				if(selectors[0].match(/['=']/))
				{
					selectors2 = selectors[0].substring(1,selectors[0].length-1);
					selectors2=selectors2.split("=");
					d = getElementsByAttributeValue(selectors2[0],selectors2[1]);
				}
				else
				{
					selectors2 = selectors[0].substring(1,selectors[0].length-1);
					d = getElementsByAttribute(selectors2);
				}
				break;
			default:
				d = document.getElementsByTagName(selectors);
				d = d[0];
				break;
		}
	}
	else
	{
		var e = document.getElementById(selectors[0].substring(1));
		var x = e.childNodes;
		d = getElementsByClassNameFrom(x,selectors[1].substring(1));
	}
	return d;
}

// 为dom增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    eleName = element.className;
    if( eleName.length === 0 ){
    	element.className = newClassName;
    	return;
    }
    if(elementClassName == newClassName || elementClassName.match(new RegExp("(^|\\s)" + newClassName + "(\\s|$)")))return;
    element.className = element.className + " ";
}

// 移除dom中的样式oldClassName
function removeClass(element, oldClassName) {
    eleName = element.className;
    if( eleName.length === 0 ){
    	return;
    }
    if( elementClassName == oldClassName ){
    	element.className = "";
    	return;
    }
    if( elementClassName.match(new RegExp("(^|\\s)" + oldClassName + "(\\s|$)")))
    	element.className = element.className.replace(new RegExp("(^|\\s)" + oldClassName + "(\\s|$)"), ' ');
}

// 判断siblingNode和dom是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
	return element.parentNode === siblingNode.parentNode;
}
// 获取dom相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    /*var x = e. offsetLeft;
    var y = e.offsetTop;
    if(e.offsetParent != null )
    {
    	x += getPosition(e.offsetParent);
    	y += getPosition(e.offsetParent);
    }*/
    var pos = box.getBoundingClientRect();
    return {x:pos.left,y:pos.top};
}

// 判断是否为邮箱地址
function isEmail(emailStr) {
	return /^(\w+@\w+\.\w+)$/.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    return /^(1+\d{10})$/.test(phone);
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var newArr = [];
    newArr[0] = arr[0];
    for (var i = 1; i < arr.length; i++) {
    	var total = 0;
    	for(var j = 0, length2 = newArr.length; j < length2; j++){
    		if( arr[i] != newArr[j] )
    			total++;
    	}
    	if( total == length2 )
    		newArr[i] = arr[i];
    }
    return newArr;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 先暂时不要简单的用一句正则表达式来实现
function trim(str) {
  whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
  for (var i = 0,len = str.length; i < len; i++) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(i);
      break;
    }
  }
  for (i = str.length - 1; i >= 0; i--) {
    if (whitespace.indexOf(str.charAt(i)) === -1) {
      str = str.substring(0, i + 1);
      break;
    }
  }
  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参赛传递
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
    	fn.call({},arr[i], i);
    }
}


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var j = 0;
	for(var i in obj){
		j++;
	}
	return j;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) 
{
	var o, i;
	if( typeof(src) != "object" || src === null ) return src;
	if( src instanceof(Array))
	{
		o = [];
		for ( i = 0; i < src.length; i++) 
		{
			if( typeof(src[i]) == "object" && src[i] !== null )
			{
				o[i] = arguments.callee(src[i]);
			}
			else
			{
				o[i] = src[i];
			}
		}
	}
	else
	{
		o = {};
		for( i in src)
		{
			if( typeof(src[i]) == "object" && src[i] !== null )
			{
				o[i] = arguments.callee(src[i]);
			}
			else
			{
				o[i] = src[i];
			}
		}
	}
	return o;
}

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof(fn) === 'function';
}