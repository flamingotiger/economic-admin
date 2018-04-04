import React,{Component} from 'react';
import styles from './ProfileList.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ProfileList extends Component{
  render(){
    return (
      <div className={cx('profileList')}>
        <div className={cx('closeBtn')} onClick={this.props.onRemoveUser}><img src="/assets/btn-cancle.svg" alt="xBtn"/></div>
        <div className={cx('profileEditWrapper')}>
          <div className={cx('profileUser')}>{this.props.subadmin}</div>
          <div className={cx('profileEdit')}>{this.props.subImg}</div>
        </div>
        <form className={cx('profileForm')}>
          <div className={cx('profileCheckBox')}>
            <label htmlFor="magazine"><input type="checkbox" id="magazine"/><span></span>MAGAZINE</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor="news"><input type="checkbox" id="news"/><span></span>NEWS</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor="startup"><input type="checkbox" id="startup"/><span></span>START_UP</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor="discussion"><input type="checkbox" id="discussion"/><span></span>DISCUSSION</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor="data"><input type="checkbox" id="data"/><span></span>DATA</label>
          </div>
        </form>
      </div>
    );
  }
}
ProfileList.defaultProps={
  subadmin:'USER1',
  subImg:'EDIT PROFILE'
}
export default ProfileList;
