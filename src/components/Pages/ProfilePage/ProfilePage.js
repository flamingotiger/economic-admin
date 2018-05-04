import React, { Component } from 'react';
import styles from './ProfilePage.scss';
import classNames from 'classnames/bind';
import { Navigate, OpenPanel } from '../../Atoms';
import { ProfileLists } from '../../Molecules';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserApi } from '../../../api';

const cx = classNames.bind(styles);

class ProfilePage extends Component{
  constructor(props){
    super(props);
    this.state={
      openPanel:false,
      openPanelEdit:false,
      profile:[],
      loading:false
    }

  }

  profilePanel = (open) => {
    if(open){ this.setState((prevState) => ({openPanel: !prevState.openPanel})) }
    else{ this.setState({openPanel: false}) }
  }

  componentDidMount(){
    UserApi.listUser().then(res => this.setState({ profile: res.data.users, loading:true}))
  }
  componentWillUpdate(nextProps){
    if(this.props.profile !== nextProps.profile){
    UserApi.listUser().then(res => this.setState({ profile: res.data.users, loading:true}))
    }
  }
  getId = (id) => { this.setState({ id : id })}

  render(){
    const { user } = this.props.user;
    const { profile, openPanel, loading } = this.state;
    if(!loading) return null;
    if(user === undefined || user.admin === false) {
      return (
        <Redirect to="/admin/notallow"/>
      );
    }
    return (
      <div className={cx('profilePage')}>
        <Navigate />
          <div className={cx('addProfileBtn')} onClick={() => this.profilePanel(true)}>
            <span>ADD PROFILE</span>
          </div>
          <OpenPanel
            profile={profile}
            openPanel={openPanel}
            profilePanel={this.profilePanel}
            id={this.state.id}
            />
          <ProfileLists
            profile={profile}
            onRemoveUser={this.props.onRemoveUser}
            onEditUser={this.props.onEditUser}
            getId={this.getId}
          />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
    user:state.login
})
export default connect(mapStateToProps)(ProfilePage);
