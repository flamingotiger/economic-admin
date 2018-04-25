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
            getIdx={this.props.getIdx}
            idx={content.idx}
            img={content.img}
            name={content.name}
            firstname={content.firstname}
            email={content.email}
            password={content.password}
            memo={content.memo}
            magachk={content.magachk}
            newschk={content.newschk}
            startupchk={content.startupchk}
            discussionchk={content.discussionchk}
            datachk={content.datachk}
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
