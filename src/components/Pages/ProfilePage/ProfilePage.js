import React, {Component} from 'react';
import styles from './ProfilePage.scss';
import classNames from 'classnames/bind';
import { Navigate, OpenPanel } from '../../Atoms';
import { ProfileLists } from '../../Molecules';
import axios from 'axios';

const cx = classNames.bind(styles);

class ProfilePage extends Component{
  constructor(props){
    super(props);
    this.state={
      openPanel:false,
      openPanelEdit:false,
      profile:[]
    }
    this.profilePanel = this.profilePanel.bind(this);
  }

  //패널열기
  profilePanel(open){
    if(open){
      this.setState((prevState) => ({openPanel: !prevState.openPanel}))
    }else{
      this.setState({openPanel: false})
    }
  }
  getIdx = (idx) => { this.setState({ idx : idx })}

  //get api
  componentDidMount(){
    axios.get('https://honghakbum.github.io/economic-admin/profile.json')
    .then(res => this.setState({ profile : res.data.profile }))
    .catch(err => console.log(err))
  }
  render(){
    const { profile, openPanel } = this.state;
    return (
      <div className={cx('profilePage')}>
        <Navigate />
        <div className={cx('addProfileBtn')} onClick={() => this.profilePanel(1)}>
          <span>ADD PROFILE</span>
        </div>
        <OpenPanel
          profile={profile}
          openPanel={openPanel}
          profilePanel={this.profilePanel}
          idx={this.state.idx}
          />
        <ProfileLists
          profile={profile}
          onRemoveUser={this.props.onRemoveUser}
          onEditUser={this.props.onEditUser}
          getIdx={this.getIdx}
        />
      </div>
    )
  }
}

export default ProfilePage;
