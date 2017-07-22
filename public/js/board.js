$(function() {
    // click on button submit
    $("#submitBtn").click(function() {
  
        var data = {
            title : $("#formDiv").find("#title").val(),
            contents : $("#formDiv").find("#contents").val()
        };

        $.ajax({
            url: '/ideas', // url where to submit the request
            type : 'post', // type of action POST || GET
            dataType : 'json', // data type
            contentType: 'application/json',
            data : JSON.stringify(data), // $("#formDiv").serialize(), // post data || get data
            // processData: false,
            success : function(result, textStatus, jQxhr) {
                // you can see the result from the console
                // tab of the developer tools
                alert("SUCCESS");
            },
            error: function(xhr, textStatus, err) {
                alert("Fail");
            }
        })
    });
});