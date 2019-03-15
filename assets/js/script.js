$(document).ready(function() {
	if(!$("html").hasClass("svg")) {
        $(".visuel img").attr("src", $(".visuel img").attr("src").replace(".svg", ".png"));
    }
});