$(function() {
	$(".header-content-list img").mouseover(function() {
		$(".header-content-list img:nth-child(" + ($(this).index()+1) + ")").css("filter", "grayscale(0)");
	}).mouseout(function() {
		$(".header-content-list img:nth-child(" + ($(this).index()+1) + ")").css("filter", "grayscale(100)");
	});
});