//点击“注册”事件：将信息保存在cookie中 ,并提示注册成功

$(function(){
	
	var USERNAME = "USERNAME";//定义一个常量，用来记录用户名
	var PASSWORD = "PASSWORD";//定义一个常量，用来记录密码
	
	//先判断开始cookie中是否存在name为USERNAME的值，name为PASSWORD的值。存在则取出来
	var usernameStr = getCookie(USERNAME);
	//得到name为GOODNAME的value，注意取出来的value是字符串的类型。
	//如  商品1&商品2&商品3
	var passwordStr = getCookie(PASSWORD);
	//得到name为PASSWORD的value，注意取出来的value是字符串的类型
	//如 45&56&57&65
	
	//定义两个空数组，用来存储usernameStr和passwordStr这些字符串
	var usernameArr = [];
	var passwordArr = [];
	
	//判断usernameStr和passwordStr是否为空：为空则不执行以下代码。不为空则存入数组中
	if(usernameStr){
		//将字符串转换为数组
		usernameArr = usernameStr.split("&");
		//[商品1,商品2,商品3]
	}
	if(passwordStr){
		//将字符串转换为数组
		passwordArr = passwordStr.split("&");
		//[45,56,57,65]
	}
	console.log("usernameArr" + usernameArr);//为了查看添加商品之前cookie之中保存了哪些商品
	console.log("passwordArr" + passwordArr);//同理
	
	//========>这是注册时保存的cookie
	//第一步先把数据存入到cookie中
	$(".submit").click(function(){
		//得到用户名和密码
		var user = $(".tel").val();
		var pass = $("#pass").val();
		
		//现在需要把user和pass加入到usernameArr和passwordArr中去
		//封装一个函数
		saveCookie(user,pass);
		//提示注册成功！
		alert("注册成功！");
		
	})
	
	
	function saveCookie(user,pass){
		usernameArr.push(user);
		passwordArr.push(pass);
		//需要将数组中的数据保存在cookie中去，因此将数组中的数据转换为字符串，因为保存在cookie中的数据只能为字符串
		var username = usernameArr.join("&");
		var passWord = passwordArr.join("&");
		
		//现在准备保存在cookie中的数据已经准备好了。接下来就是更新cookie中的数据
		deleteCookie(USERNAME);
		deleteCookie(PASSWORD);
		
		var d = new Date();
//		d.setDate(d.getDate() + 7);设置七天后过期
		
		var cookieText1 = setCookie(USERNAME,username);
	    var cookieText2 = setCookie(PASSWORD,passWord);
	    console.log(cookieText1);
	    console.log(cookieText2);
	}


	var GOODNAME = "GOODNAME";//定义一个常量，用来记录商品的名称
	var GOODPRICE = "GOODPRICE";//定义一个常量，用来记录商品的价格
	
	//先判断开始cookie中是否存在name为GOODNAME的值，name为GOODPRICE的值。存在则取出来
	var goodnameStr = getCookie(GOODNAME);
	//得到name为GOODNAME的value，注意取出来的value是字符串的类型。
	//如  商品1&商品2&商品3
	var goodpriceStr = getCookie(GOODPRICE);
	//得到name为GOODPRICE的value，注意取出来的value是字符串的类型
	//如 45&56&57&65
	
	//定义两个空数组，用来存储goodnameStr和goodpriceStr这些字符串
	var goodnameArr = [];
	var goodpriceArr = [];
	
	//判断goodNameStr和goodPriceStr是否为空：为空则不执行以下代码。不为空则存入数组中
	if(goodnameStr){
		//将字符串转换为数组
		goodnameArr = goodnameStr.split("&");
		//[商品1,商品2,商品3]
	}
	if(goodpriceStr){
		//将字符串转换为数组
		goodpriceArr = goodpriceStr.split("&");
		//[45,56,57,65]
	}
	console.log("goodnameArr" + goodnameArr);//为了查看添加商品之前cookie之中保存了哪些商品
	console.log("goodpriceArr" + goodpriceArr);//同理
	
	//======>这是加入购物车时保存的cookie
	$(".s-car").click(function(){
		
		//如果当前s-car的兄弟元素有两个：代表得到是main.html中的商品的详情
		//如果当前s-car的兄弟元素有一个：代表得到是fruit.html中的商品的详情
		
		if($(this).siblings().length == 2){
			console.log(1314);
			var product_name = $(this).siblings().eq(0).text();
			var product_sprice_size = $(this).siblings().eq(1).text();
			
		}else if($(this).siblings().length == 1){
			var product_size = $(this).prev().children().text();
			var product_name_price = $(this).parent().prev().text();
			product_name_price = product_name_price.replace(/\s+/g,""); 
			var product_price = $(this).parent().prev().children().text();
			var product_name = product_name_price.split(product_price)[1];
			var product_sprice_size = product_price + "/" + product_size;
			console.log(product_sprice_size);
		}
		
		saveGoodCookie(product_name,product_sprice_size);
		//以上已将商品的信息保存到cookie中去了
		
		//控制购物车的出现
		$(".cover").css("display","block");
		$(".shop-cart").css("display","block");
	});
	
	//先得到商品名称、商品价格、商品规格
	$(".btn-primary").click(function(){
		//product_name  product_sprice_size
		var product_name = $(".name h3").text();
		var product_price = $(".price01 span").text();
		var product_size = $(".size span").text();
		var product_sprice_size = product_price + "/" + product_size;
		saveGoodCookie(product_name,product_sprice_size);
		//以上已将商品的信息保存到cookie中去了
		
		//控制购物车的出现
		$(".cover").css("display","block");
		$(".shop-cart").css("display","block");
	});
	
	function saveGoodCookie(name,price){
		goodnameArr.push(name);
		goodpriceArr.push(price);
		//需要将数组中的数据保存在cookie中去，因此将数组中的数据转换为字符串，因为保存在cookie中的数据只能为字符串
		var goodname = goodnameArr.join("&");
		var goodprice = goodpriceArr.join("&");
		
		//现在准备保存在cookie中的数据已经准备好了。接下来就是更新cookie中的数据
		deleteCookie(GOODNAME);
		deleteCookie(GOODPRICE);
		
		var d = new Date();
		//d.setDate(d.getDate() + 7);
		setCookie(GOODNAME,goodname);
	    setCookie(GOODPRICE,goodprice);
	}
});
