import React,{Component} from 'react';
import styles from './ProfileLists.scss';
import classNames from 'classnames/bind';
import { ProfileList } from '../../Atoms';

const cx = classNames.bind(styles);
class ProfileLists extends Component{

  renderContent= () => {
    const profile = this.props.profile.map((content,i) => {
      return <ProfileList
            key={i}
            idx={content.idx}
            img={content.img}
            name={content.name}
            firstname={content.firstname}
            memo={content.memo}
            popup={content.popup}
            onRemoveUser={this.props.onRemoveUser}
            onEditUser={this.props.onEditUser}
            getIdx={this.props.getIdx}
            magachk={this.props.magachk}
            newschk={this.props.newschk}
            startupchk={this.props.startupchk}
            discussionchk={this.props.discussionchk}
            datachk={this.props.datachk}
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
