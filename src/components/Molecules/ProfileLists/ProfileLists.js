import React from 'react';
import styles from './ProfileLists.scss';
import classNames from 'classnames/bind';
import { ProfileList } from '../../Atoms';

const cx = classNames.bind(styles);
class ProfileLists extends React.Component{

  renderContent= () => {
    const userAttr = this.props.setuser.userAttr
    const profile = userAttr.map((content,i) => {
      return <ProfileList
            key={i}
            index={i}
            {...userAttr}
            onRemoveUser={this.props.onRemoveUser}
          />
      })
    return profile
  }
    render(){
      return (
        <div className={cx('profileLists')}>
        {this.renderContent()}
        </div>
      );
    }
}
export default ProfileLists;
