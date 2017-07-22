$(function() {
	var isRecommended1 = false;
	var isRecommended2 = false;

	$("button").mouseover(function() {
		$("button:nth-child(" + ($(this).index()+1) + ") .glyphicon").css("filter", "grayscale(0)");
	}).mouseout(function() {
		if(!isRecommended1)
			$("button:nth-child(1) .glyphicon").css("filter", "grayscale(100)");

		if(!isRecommended2)
			$("button:nth-child(2) .glyphicon").css("filter", "grayscale(100)");
	}).click(function() {
		if(isRecommended1)
			isRecommended1 = false;
		else
			isRecommended1 = true;

		if(isRecommended2)
			isRecommended2 = false;
		else
			isRecommended2 = true;
	});
});