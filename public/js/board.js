$(function() {
    var server_ip = "http://127.0.0.1:3000/ideas";
    // click on button submit
    $("#submitBtn").click(function() {

        alert(typeof 'aa');
        alert(typeof 'bb');

        // send ajax
        $.ajax({
            url: server_ip, // url where to submit the request
            type: "POST", // type of action POST || GET
            dataType: "json", // data type.
            contentType: 'application/json',
            async: false,
            data: {
                title: "aa",
                contents: "aaa"
            }, // post data || get data
            success : function(result) {
                console.log(result);
            },
            error: function(e) {
                console.log(e);
                alert("FAILED!");
            }
        });
    });
});