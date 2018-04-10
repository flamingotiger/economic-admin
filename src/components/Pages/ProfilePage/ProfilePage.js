import React, {Component} from 'react';
import styles from './ProfilePage.scss';
import classNames from 'classnames/bind';
import { Navigate, OpenPanel, OpenPanelEdit} from '../../Atoms';
import { ProfileContainer } from '../../../containers';
import * as actions from '../../../actions';
import { connect } from 'react-redux';

const cx = classNames.bind(styles);

class ProfilePage extends Component{
  constructor(props){
    super(props);
    this.state={
      openPanel:false,
      openPanelEdit:false,
      index:0,
      img:'',
      name:'',
      firstname:'',
      memo:'',
    }
    this.profilePanel = this.profilePanel.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  profilePanel(){this.setState((prevState) => ({openPanel: !prevState.openPanel}))}
  handleSubmit(e){
    e.preventDefault();
    //초기화
    this.setState({
      img:'',
      name:'',
      firstname:'',
      memo:''
    })
  }
  handleEdit(e){
    this.setState({
      index:Number(e.target.getAttribute("data-key")),
      openPanelEdit:!this.state.openPanelEdit
    })
  }
  render(){
    const uservalue = this.props.profile.userValue[this.state.index]
    const { openPanel, openPanelEdit } = this.state;
    return (
      <div className={cx('profilePage')}>
        <Navigate />
        <div className={cx('addProfileBtn')} onClick={this.profilePanel}>
          <span>ADD PROFILE</span>
        </div>
        <OpenPanel onCreateUser={this.props.onCreateUser} openPanel={openPanel}/>
        <ProfileContainer handleEdit={this.handleEdit}/>
        <OpenPanelEdit onCreateUser={this.props.onCreateUser} uservalue={uservalue} openPanelEdit={openPanelEdit}/>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  profile:state.profile,
});

const mapToDispatch = (dispatch) => ({
    onCreateUser : ({index, img, name, firstname, memo}) =>
    dispatch(actions.createUser({index, img, name, firstname, memo}))
});

export default connect(mapStateToProps, mapToDispatch)(ProfilePage);
