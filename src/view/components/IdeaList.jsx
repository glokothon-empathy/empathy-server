import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import Idea from './Idea';

export default class IdeaList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideas: [],
    };
    this.mapIdeas = this.mapIdeas.bind(this);
  }

  componentDidMount() {
    $.get('/ideas').done((data)=>{
      this.setState({ ideas: data });
    });
  }

  mapIdeas(ideas) {
    const idea_chunks = _.chunk(ideas, 3);
    return idea_chunks.map((chunk,idx) => (
      <div className="row">
        {chunk.map((idea, idx) => (
          <Idea
            id={idea.user_id}
            title={idea.title}
            empathy_count={idea.empathy_count}
          />))
        }
      </div>
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="col-lg-12">
            <h2 className="page-header" id="idea_header">아이디어 공모 <small>당신의 멋진 아이디어를 뽐내 보세요!</small></h2> 
        </div>
        {this.mapIdeas(this.state.ideas)}
      </div>
    );
  }
}
