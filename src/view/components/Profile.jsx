import React from 'react';
import $ from 'jQuery';


export default  class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      contents: '',
      interest_world: '',
      phone_no: '',
      profile_image: '',
    };
  }

  componentDidMount() {
    $.get(`/users/profiles?owner=${this.props.match.params.owner_id}`)
      .done((data) => {
        this.setState(data[0]);
      });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1><span id="name">{this.state.name}</span>님의 프로필</h1>
          <span className="glyphicons glyphicons-arrow-left"></span>
        </div>
        <hr />
        <div id="profile">
          <div id="profileIntro">
            <div id="profileImage" className="col-xs-3">
              <div id="image">
              </div>
            </div>
            <div id="profileInfo" className="container-fluid col-xs-3">
              <div className="profileDetail">
                <h2>관심분야</h2>
                <h3>{this.state.interest_world}</h3>
              </div>
              <div className="profileDetail">
                <h2>연락처</h2>
                <h3>{this.state.email}</h3>
              </div>
            </div>
          </div>
          <div id="profileOneline">
            <h2>한줄 소개</h2>
            <h3>{this.state.contents}</h3>
          </div>
        </div>
        <div className="container">
          <h1>활동 내역</h1>
        </div>
        <hr />
      </div>
    );
  }
};
