import React,{Component} from 'react';
import styles from './ProfileList.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ProfileList extends Component{
  constructor(props){
    super(props);
    this.state={
      magachk:false,
      newschk:false,
      startupchk:false,
      discussionchk:false,
      datachk:false,
    }
    this.allCheckBox = this.allCheckBox.bind(this);
    this.newsCheckBox = this.newsCheckBox.bind(this);
    this.startupCheckBox = this.startupCheckBox.bind(this);
    this.discussionCheckBox = this.discussionCheckBox.bind(this);
    this.dataCheckBox = this.dataCheckBox.bind(this);
  }
  allCheckBox(){
    this.setState({magachk : !this.state.magachk});
      if(!this.state.magachk){
        this.setState({
          newschk: true,
          startupchk: true,
          discussionchk: true,
          datachk: true
        });
      }
    }
  newsCheckBox(e){this.setState({newschk : e.target.checked})}
  startupCheckBox(e){this.setState({startupchk : e.target.checked})}
  discussionCheckBox(e){this.setState({discussionchk : e.target.checked})}
  dataCheckBox(e){this.setState({datachk : e.target.checked})}

  render(){
    const {index, edit, onRemoveUser} = this.props;
    const {magachk, newschk, startupchk, discussionchk, datachk} = this.state;
    return (
      <div className={cx('profileList')}>
        <div className={cx('closeBtn')} onClick={(e) => onRemoveUser(index)}><img src="/assets/btn-cancle.svg" alt="xBtn"/></div>
        <div className={cx('profileEditWrapper')}>
          <div className={cx('profileUser')}>user{index}</div>
          <div className={cx('profileEdit')} onClick={this.props.handleEdit} data-key={index}>{edit}</div>
        </div>
        <form className={cx('profileForm')}>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`magazine${index}`}>
              <input
                type="checkbox"
                name="magazine"
                id={`magazine${index}`}
                checked={magachk}
                onChange={this.allCheckBox}
              />
              <span></span>MAGAZINE</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`news${index}`}>
              <input
                type="checkbox"
                name="news"
                id={`news${index}`}
                checked={newschk}
                onChange={this.newsCheckBox
                }
              />
            <span></span>NEWS</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`startup${index}`}>
              <input
                type="checkbox"
                name="startup"
                id={`startup${index}`}
                checked={startupchk}
                onChange={this.startupCheckBox
                }
              />
            <span></span>START_UP</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`discussion${index}`}>
              <input
                type="checkbox"
                name="discussion"
                id={`discussion${index}`}
                checked={discussionchk}
                onChange={this.discussionCheckBox
                }
              />
            <span></span>DISCUSSION</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`data${index}`}>
              <input
                type="checkbox"
                name="data"
                id={`data${index}`}
                checked={datachk}
                onChange={this.dataCheckBox
                }
              />
            <span></span>DATA</label>
          </div>
        </form>
      </div>
    );
  }
}
ProfileList.defaultProps={
  index:'1',
  edit:'EDIT PROFILE'
}
export default ProfileList;
