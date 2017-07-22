import React from 'react';
import $ from 'jquery';

export default class Board extends React.Component {
  componentDidMount() {
    // click on button submit
    $("#submitBtn").click(function() {

      var data = {
        title : $("#title").val(),
        contents : $("#contents").val()
      };

      $.ajax({
        url: '/ideas', 
        type : 'post',
        dataType : 'json', 
        contentType: 'application/json',
        data : JSON.stringify(data),
        // processData: false,
        success : function(result, textStatus, jQxhr) {
          //alert("SUCCESS");
          window.history.back();
        },
        error: function(xhr, textStatus, err) {
          alert("Fail");
        }
      })
    });
  }

  render() {
    return(
      <div>
        <div class="container">
          <h1>아이디어 등록하기</h1>
        </div>
        <hr />
        <div id="formDiv">
          <div class="form-group">
            <label for="title">제목 :</label>
            <input type="text" class="form-control" id="title" placeholder="제목을 입력하세요." />
          </div>
          <div class="form-group">
            <label for="title">내용 :</label>
            <textarea class="form-control" id="contents" rows="24" placeholder="내용을 입력하세요." />
          </div>
          <input type="submit" class="btn btn-default" id="submitBtn" />
        </div>
      </div>
    );
  }
};
