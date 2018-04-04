import React, {Component} from 'react';
import styles from './ProfilePage.scss';
import classNames from 'classnames/bind';
import { Navigate } from '../../Atoms';
import SetUserContainer from '../../../containers/SetUserContainer';
import * as actions from '../../../actions';
import { connect } from 'react-redux';

const cx = classNames.bind(styles);

class ProfilePage extends Component{
  constructor(props){
    super(props);
    this.state={
      openPanel:false,
    }
    this.addProfile = this.addProfile.bind(this);
  }
  addProfile(){
    this.setState({
      openPanel: !this.state.openPanel
    })
  }
  render(){
    const {openPanel} = this.state;
    const {onCreateUser} = this.props;
    return (
      <div className={cx('loginPage')}>
        <Navigate />
        <div className={cx('addProfileBtn')} onClick={this.addProfile}>
          <span>ADD PROFILE</span>
        </div>
        <div className={openPanel ? cx('addPanel','open') : cx('addPanel')}>
          <div className={cx('profileTitle')}>PROFILE</div>
          <div className={cx('profileLeft')}><input type="file"/></div>
          <div className={cx('profileRight')}>
            <div className={cx('rightText')}>
              <div className={cx('rightInput','first')}><input type="text" placeholder="NOM"></input></div>
              <div className={cx('rightInput')}><input type="text" placeholder="PRENOM"></input></div>
            </div>
            <div className={cx('textArea')}><textarea placeholder="MEMO"></textarea></div>
            <button type="button" onClick={() => onCreateUser(2)}>ADD</button>
          </div>
        </div>
        <SetUserContainer/>
      </div>
    )
  }
}

const mapToDispatch = (dispatch) => ({
    onCreateUser : (index) => dispatch(actions.createUser(index))
});

export default connect(null, mapToDispatch)(ProfilePage);
