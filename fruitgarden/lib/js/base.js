//cookie的设置
function setCookie(name,value,expires,path,domain,secure){
//将name和value用URI编码一下
	var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
	if(expires instanceof Date){//由于参数都是字符串类型，所以需要把expires测试一下，看是否是日期类型
		cookieText += "; expires=" + expires;
	}
	if(path){//看一下是否传了这下参数
		cookieText += "; path=" + path;	//注意分号后面要有空格
	}
	if(domain){
		cookieText += "; domain=" + domain;
	}
	if(secure){
		cookieText += "; secure=" + secure;
	}
	//将cookieText加到document.cookie上去
	document.cookie = cookieText;
	//返回值为已解码的cookie值--->cookieText
	return decodeURIComponent(cookieText);
}
//cookie的获取
function getCookie(name){
//先要获取到保存的cookie值
	var cookie = decodeURIComponent(document.cookie);
	//经过上面得到了：name=lisa; pass=123445; age=16这一字符串
	//为了判断是否这一字符串中含有name的值需要先把这一字符串转换为数组，然后在进行遍历
	var arr = cookie.split("; ");
//得到的是[name=lisa,pass=123445,age=16]这一数组
	for(var i = 0;i < arr.length;i++){
		var arr1 = arr[i].split("=");
		if(arr1.length >= 2){
			if(arr1[0] == name){
				return arr1[1];
			}
		}
	}
	return "";//如果遍历一次发现没有匹配的结果就返回空
}
//cookie的删除
function deleteCookie(name){
//由于要主动删除cookie,要先创建一个日期对象。得到当前日期
	var date = new Date();
	document.cookie = decodeURIComponent(name) + "=; expires=" + date;
	return document.cookie;
}

	/*var d = new Date();
	d.setDate(d.getDate() + 7);
	
	var cookieText = setCookie("user","张三",d);
	var cookieText1 = setCookie("pass","12345",d);
	
	//console.log(cookieText);
	//console.log(cookieText1);
	
	//获取cookie中name对应的value值
	var value = getCookie("user");
	//console.log(value);
	var value1 = getCookie("pass");
	//console.log(value1);
	
	//删除cookie中name对应的value
	var cookieText2 = deleteCookie("user");
	console.log(cookieText2);
	console.log(document.cookie);*/
			