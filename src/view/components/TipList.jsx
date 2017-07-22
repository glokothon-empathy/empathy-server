import React from 'react';
import _ from 'lodash';
import $ from 'jquery';
import Tip from './Tip';

export default class TipList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tips: [],
    };
    this.mapTips = this.mapTips.bind(this);
  }

  componentDidMount() {
    $.get('/tips').done((data)=>{
      this.setState({ tips: data });
    });
  }

  mapTips(tips) {
    const tip_chunks = _.chunk(tips, 3);
    return tip_chunks.map((chunk,idx) => (
      <div className="row">
        {chunk.map((tip, idx) => (
          <Tip
            tip_id={tip.tip_id}
            title={tip.title}
            user_name={tip.name}
            empathy_count={tip.empathy_count}
          />))
        }
      </div>
    ));
  }
  
  render() {
    return (
      <div className="container tip-body">
        <div id="superDiv">
         <div id="reviewDiv">
			    <h1 className="tip-title">해커톤 꿀팁!</h1>
          <small>당신의 멋진 꿀팁을 공유하세요!</small>
          <hr class="tip-hr"/>
        
        {this.mapTips(this.state.tips)}
        </div>
      </div>
    </div>
    );
  }
}
