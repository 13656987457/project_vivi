onload = function(){
				var oList = document.getElementById("list");
				var aLi   = oList.getElementsByTagName("li");
				
				var oList2 = document.getElementById("list2");
				var aLi2   = oList2.getElementsByTagName("li");
				
				//让图片个数增加一倍
				oList.innerHTML += oList.innerHTML;
				
				
				//每张图片的宽度
				var iWidth = aLi[0].offsetWidth;
				
				//根据图片个数来设置ul的宽度
				oList.style.width = iWidth*aLi.length + "px";
				
				//声明一个变量i，来计算图片的下标
				var i = 0;
				
				//启动定时器
				var timer = setInterval(move,3000);
				
				
				
				//切换图片的方法
				function move(){
					i++;//切换下一张图片
					var iLeft = -iWidth*i;//目标值
					//开始执行动画
					startMove(oList,"left",iLeft,next);
					
					//修改按钮的状态
					for(var j=0;j<aLi2.length;j++){
						if(j==i){//
							aLi2[j].className = "active";
						}else{
							aLi2[j].className = "";
						}
					}
					
					if(i==aLi.length/2){
						aLi2[0].className = "active";
					}
					
				}
				
				
				//图片执行完毕回调函数
				function next(){
					if(i>=aLi.length/2){
						//瞬间移动到第一张图片
						oList.style.left = 0;
						i=0;
					}
				}
				
				//=========给按钮添加点击事件
				for(var j=0;j<aLi2.length;j++){
					aLi2[j].index = j;
					aLi2[j].onclick = function(){
						i = this.index -1;
						btnMove();
					}
				}
				
				//点击按钮之后触发的函数
				function btnMove(){
					move();
					clearInterval(timer);
					timer = setInterval(move,3000);
				}
				
				//鼠标移入，鼠标移出事件
				
				oList.onmouseover = function(){
					clearInterval(timer);
				}
				
				oList.onmouseout = function(){
					timer = setInterval(move,3000);
				}
				
				
			}
	
	$(function(){
		
		//点击购物车以后，让购物车开始动画。切换成另外一张图片。并弹出提示框
		$(".s-car").click(function(){
			//使用animate动画后使用回调函数：使弹出提示框
		});
		
	})