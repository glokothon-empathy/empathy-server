import React from 'react';
import $ from 'jquery';

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
    return ideas.map((idea, idx) => (
      <Idea
        id={idea.user_id}
        title={idea.title}
        empathy_count={empathy_count}
      />
    ));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.mapIdeas(this.state.ideas)}
        </div>
      </div>
    );
  }
}
