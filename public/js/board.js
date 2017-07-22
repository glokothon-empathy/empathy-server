$(function() {
    // click on button submit
    $("#submitBtn").click(function() {
        // send ajax
        $.ajax({
            url: '#', // url where to submit the request
            type : "POST", // type of action POST || GET
            dataType : 'json', // data type
            data : $("#formDiv").serialize(), // post data || get data
            success : function(result) {
                // you can see the result from the console
                // tab of the developer tools
                alert(result);
            },
            error: function(xhr, resp, text) {
                alert(xhr, resp, text);
            }
        })
    });
});