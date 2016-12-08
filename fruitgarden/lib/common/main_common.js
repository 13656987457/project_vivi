$(function(){
	
	$("#carimage").click(function(){
		if($(this).hasClass("carImage")){
			$(this).removeClass("carImage");
			$(this).addClass("carImage_orange")
			$(".carnone").animate().slideDown();
		}else if($(this).hasClass("carImage_orange")){
			$(this).removeClass("carImage_orange");
			$(this).addClass("carImage");
			$(".carnone").animate().slideUp();
		}
	});
	
})
