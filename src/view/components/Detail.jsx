import React from 'react';
import $ from 'jQuery';


export default  class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      title: '',
      contents: '',
      empathy_count: 0,
    };
  }

  componentDidMount() {
    $.get(`/ideas/${this.props.match.params.idea_id}`)
      .done((data) => {
        this.setState(data);
      });
  }

  render() {
    return (
      <div>
        <div id="header">
          <div id="profileDiv">
            <div id="profileImage">
            </div>
            <h3 id="name">
              {this.state.name}
            </h3>
          </div>
          <div id="titleDiv">
            <h1 id="title">
              {this.state.title}
            </h1>
          </div>
        </div>

        <hr />
        <div id="content">
          <h2 id="contentTitle">
            상세내용
          </h2>

          <h3 id="contentContent">
            {this.state.contents}
          </h3>
        </div>

        <div id="buttonDiv">
          <button type="button" className="btn btn-primary">
            <span className="glyphicon glyphicon-thumbs-up"></span>
            함께 해요
          </button>

          <button type="button" className="btn btn-success">
            <span className="glyphicon glyphicon-heart"></span>
            공감
          </button>
        </div>

        <div id="optDiv">
          <h3 id="comment">∨ 댓글 (8)</h3>
          <h3 id="recommend">∨ 공감 ({this.state.empathy_count})</h3>
        </div>
      </div>
    );
  }
};
