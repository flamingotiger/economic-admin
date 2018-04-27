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
            magachk={content.magazineManager}
            newschk={content.newsManager}
            startupchk={content.startUpManager}
            discussionchk={content.discussionManager}
            datachk={content.dataManager}
            admin={content.admin}
            idx={content._id}
            email={content.email}
            firstname={content.firstName}
            name={content.lastName}
            password={content.password}
            img={content.image}
            memo={content.memo}
            getIdx={this.props.getIdx}
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
