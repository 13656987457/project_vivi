$(function(){
	$(".city").hover(function(){//移进
		
		$(this).css("background","white");
		$(".cities").show();
		
	},function(){//移出
		
		$(this).css("background","");
		$(".cities").hide();
		
	});
	
	$(".cities").hover(function(){
		$(".cities").show();
	},function(){
		$(".cities").hide();
	});
	
	var USERNAME = "USERNAME";//定义一个常量，用来记录用户名
	var PASSWORD = "PASSWORD";//定义一个常量，用来记录密码
	//第一步：实现获取到已保存的cookie中的数据(需要传一个实参：USERNAME、PASSWORD)
	var uname = getCookie(USERNAME);
	var upass = getCookie(PASSWORD);
	
	var unameArr = [];
	var upassArr = [];
	//这里的uname和upass是字符串类型的，需要将其转换为数组类型，以便取出进行读取和修改
	if(uname){
		unameArr = uname.split("&");//用来保存用户名数组
	}
	if(upass){
		upassArr = upass.split("&");//用来保存密码数组
	}
	console.log(unameArr);
	console.log(upassArr);
	//以上，就可以取出了保存在cookie中的数据了
	
	$(".login").text("您好！");
	$(".register").text(unameArr[0]);
	
})
