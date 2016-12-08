$(function(){
	
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
	
	//接下来就是将取出来的cookie值与填写的用户名和密码进行比较
	//点击登录按钮事件：判断与保存的cookie保存的电话号码和密码进行匹配;相同则跳转到首页，不同则弹出提示框：用户名或密码错误
	$(".login").click(function(){
		
		var myName = $("#user").val();
		var myPass = $("#pass").val();
		
		console.log(myName);
		console.log(myPass);
		
		//遍历保存的用户民和密码
		for(var i = 0; i < unameArr.length; i++){
			if(myName == unameArr[i] && myPass == upassArr[i]){
				alert("登录成功！");
				location.href = "main.html";
				
			}else{
				alert("用户名或密码错误！");
				continue;
			}
		}
		
		
	});
	//=======>以上是取用户名和密码的cookie
	
	//=======>以下是得到保存在cookie中的商品名称和单价和规格
	var GOODNAME = "GOODNAME";//定义一个常量，用来记录商品的名称
	var GOODPRICE = "GOODPRICE";//定义一个常量，用来记录商品的价格
	//第一步：实现获取到已保存的cookie中的数据(需要传一个实参：GOODNAME、GOODPRICE)即商品名和商品价格
	var gname = getCookie(GOODNAME);
	var gprice = getCookie(GOODPRICE);
	//这里的gname和gprice是字符串类型的，需要将其转换为数组类型，以便取出进行读取和修改
	var gnameArr = [];
	var gpriceArr = [];
	if(gname){
		gnameArr = gname.split("&");//用来保存商品名称
	}
	if(gprice){
		gpriceArr = gprice.split("&");//用来保存商品价格
	}
	console.log(gnameArr);
	console.log(gpriceArr);
	//以上，就可以取出了保存在cookie中的数据了
	
	//接下来就是创建新的节点元素，将这些数据展示出来
	//第一步：先遍历这两个数组中元素的长度：用来判断是创建几个装这些数据的div
	
	for(var j = 0;j < gpriceArr.length; j++){
		
		//得到放置商品名称的数组中的一个个名字
		var good_name = gnameArr[j];
		
		//由于得到的商品的价格和规格是这样的："￥39.00/4个"，所以需要将这个字符串变为一个数组，这个数组中有两个元素分别保存单价和规格
		var price_size_arr = gpriceArr[j].split("/");
		//这样就得到了：["￥39.00", "4个"]
		
		var oHtml_1 = "<li><div class='cart-box clearfix'><div class='cart-img pull-left'><a><img src='img/global_1.jpg'/></a></div>";
		var oHtml_2 = oHtml_1 + "<div class='cart-name pull-left'><p><a>" + good_name + "</a></p></div>";
		var oHtml_3 = oHtml_2 + "<div class='spec-num pull-left'><p>" + price_size_arr[1] + "</p></div>";
		var oHtml_4 = oHtml_3 + "<div class='price-single pull-left'><p>" + price_size_arr[0] + "</p></div>";
		var oHtml_5 = oHtml_4 + "<div class='good-num-change pull-left clearfix'>";
		var oHtml_6 = oHtml_5 + "<span class='pull-left btn-minus'>-</span>";
		var oHtml_7 = oHtml_6 + "<input class='pull-left' disabled='' type='tel' name='qty' value='1'>";
		var oHtml_8 = oHtml_7 + "<span class='pull-left btn-plus'>+</span></div>";
		var oHtml_9 = oHtml_8 + "<div class='sum pull-left'><p>" + price_size_arr[0] + "</p></div>";
		var oHtml_10 = oHtml_9 + "<div class='delete pull-left'><p>删除</p></div></div></li>";
		
		//将生成的oHtml_10加载到.list-good中去
		$(".list-good").append($(oHtml_10));
	}
	
	//=======>删除功能：
	
	$(".delete p").click(function(){
		$(this).css("text-decoration","underline");
		
		//得到当前所点击的对象所在的元素中的：商品名称、商品价格
		console.log($(this).parent().siblings().eq(1).text());
		var current_goodname = $(this).parent().siblings().eq(1).text();
		
		//在页面上删除
		$(this).parent().parent().parent()[0].remove($(this).parent().parent().parent()[0]);
		
		console.log(gnameArr);
		console.log(gpriceArr);
		
		//遍历gnameArr数组中的元素，看是否有和current_goodname相匹配的：过滤掉匹配的，留下不匹配的
		var position ;//用position这个变量存储数组中与其相匹配的下标
		for(var k = 0; k < gnameArr.length; k++){
			
			if(gnameArr[k] == current_goodname){
				position = k;
				break;//跳出循环
			}
			
		}
		
		console.log(position);
		
		//删除所有存储的cookie
		deleteCookie(GOODNAME);
		deleteCookie(GOODPRICE);
		
		//删除之后会发现cookie中没有值了
		console.log(getCookie(GOODNAME));
		console.log(getCookie(GOODPRICE));
		
		//删除数组gnameArr中下标为position的元素
		var new_nameArr = removeElename(position);
		var new_priceArr = removeEleprice(position);
		
		var new_nameStr = new_nameArr.join("$");
		var new_priceStr = new_priceArr.join("$");
		
		//将新得到的数组中的元素保存在cookie中
		
		//现在准备保存在cookie中的数据已经准备好了。接下来就是更新cookie中的数据
		deleteCookie(GOODNAME);
		deleteCookie(GOODPRICE);
		
		var d = new Date();
		//d.setDate(d.getDate() + 7);
		setCookie(GOODNAME,new_nameStr);
	    setCookie(GOODPRICE,new_priceStr);
	    
	    
		
	})
	
	function removeElename(pos){
		for(var m = pos; m < gnameArr.length - 1;m++){
			gnameArr[m] = gnameArr[m + 1];
		}
		gnameArr.length = gnameArr.length - 1;
		console.log(gnameArr);
		return gnameArr;
		//将这两个数组放到一个
		
	}
	function removeEleprice(pos){
		
		for(var n = pos; n < gpriceArr.length - 1; n++){
			gpriceArr[n] = gpriceArr[n + 1];
		}
		gpriceArr.length = gpriceArr.length - 1;
		console.log(gpriceArr);
		return gpriceArr;
		//将这两个数组放到一个
		
	}
	
	
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
	
})