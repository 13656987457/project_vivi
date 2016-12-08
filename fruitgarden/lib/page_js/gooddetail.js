window.onload = function(){
	var oList2 = document.getElementsByClassName("smallImg")[0];//左边的小图片
	var aLi2   = oList2.getElementsByTagName("li");//左边的四张小图片
	
	var oList = document.getElementsByClassName("bigImg")[0];//右边的大图片
	var aLi   = oList.getElementsByTagName("li");
	
	//自动轮播
	oList.innerHTML += oList.innerHTML;//让大图片的数量增加一倍
	//每张大图片的高度
	var iHeight = aLi[0].offsetHeight;
	//大图片的下标
	var i = 0;
	
	//启动定时器，每隔3秒实现图片切换
	var timer = setInterval(move,3000);
	
	//图片切换的方法
	function move(){
		i++;//表示要切换下一张图片
		var iTop = -i*iHeight;//计算得到目标值
		startMove(oList,"top",iTop,next);
		
		//====修改按钮的状态
		for(var j=0;j<aLi2.length;j++){
			if(i==j){//要显示的图片
				aLi2[j].className = "cur";//显示图片状态a
			}else{
				aLi2[j].className = "";
			}
		}
		
		if(i==aLi.length/2){//如果是第四张图片,向让按钮时第一张图片的选中状态
			aLi2[0].className = "active";
			
		}
	}	
		
		//=============给按钮添加鼠标移进和移出事件
		for(var j=0;j<aLi2.length;j++){
				
				aLi2[j].index = j;
				aLi2[j].onclick = function(){
					//切换图片
					i = this.index -1 ;//因为move方法里的i会加1
					btnMove();
				}
				
			}
			
			
		//点击按钮之后切换图片的方法
		function btnMove(){
			
			
			move();//立即切换图片
			//清除旧的定时器
			clearInterval(timer);
			//设置新的定时器
			timer = setInterval(move,3000);
		}
		
		//鼠标移入，鼠标移出事件
				
		oList.onmouseover = function(){
			clearInterval(timer);
		}
		
		oList.onmouseout = function(){
			timer = setInterval(move,3000);
		}
	
	
	//切换图片完毕回调函数
	function next(){
		if(i>=aLi.length/2){
			//瞬间回到第一张图片
			oList.style.top = 0;
			i = 0;
		}
	}
	
	//让js-fixed一直浮在浏览器的顶部。直到滚动条到顶部的距离小于js-fixed到浏览器顶部的距离
	var oFixed = document.getElementById("js-fixed");
	var fixedtop = oFixed.offsetTop; 
	window.onscroll = function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop > fixedtop){
			oFixed.style.position = "fixed";
			oFixed.style.top = "0";
		}else{
			oFixed.style.position = "static";
			oFixed.style.top = fixedtop + "px";
		}
	}
}

