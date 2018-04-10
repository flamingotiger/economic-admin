import React from 'react';
import styles from './ProfileLists.scss';
import classNames from 'classnames/bind';
import { ProfileList } from '../../Atoms';

const cx = classNames.bind(styles);
class ProfileLists extends React.Component{

  renderContent= () => {
    const userValue = this.props.profile.userValue
    const profile = userValue.map((content,i) => {
      return <ProfileList
            key={i}
            index={content.index}
            {...userValue}
            onRemoveUser={this.props.onRemoveUser}
            handleEdit={this.props.handleEdit}
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
