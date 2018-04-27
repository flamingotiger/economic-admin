import React,{Component} from 'react';
import styles from './ProfileList.scss';
import classNames from 'classnames/bind';
import { OpenPanelEdit, Cancel } from '../../Atoms';

const cx = classNames.bind(styles);

class ProfileList extends Component{
  constructor(props){
    super(props);
    this.state={
      openPanel:false,
      openCancel:false,
      magachk:this.props.magachk,
      newschk:this.props.newschk,
      startupchk:this.props.startupchk,
      discussionchk:this.props.discussionchk,
      datachk:this.props.datachk,
      openPanelEdit:false,
    }
    this.handleCancel = this.handleCancel.bind(this);
  }
  allCheckBox = () => {
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
  handleEdit = () => { this.setState({openPanel:!this.state.openPanel}) }
  componentDidMount(){
    this.props.getIdx(this.props.idx);
  }
  handleCancel(close){
    if(close){
      this.setState({openCancel:true})
    }else{
      this.setState({openCancel:false})
    }
  }
  render(){
    const {idx, img, email, password, name, firstname, memo } = this.props;
    const { openPanel, openCancel, magachk, newschk, startupchk, discussionchk, datachk} = this.state;
    return (
      <div className={cx('listWrapper')}>
      <div className={cx('profileList')}>
        <div className={cx('closeBtn')} onClick={() => this.handleCancel(true)}>
          <img src="/assets/btn-cancle.svg" alt="xBtn"/>
        </div>
        <Cancel
          idx={idx}
          openCancel={openCancel}
          handleCancel={this.handleCancel}
        />
        <div className={cx('profileEditWrapper')}>
          <div className={cx('profileUser')}>{firstname}</div>
          <div className={cx('profileEdit')} onClick={this.handleEdit}>EDIT PROFILE</div>
        </div>
        <form className={cx('profileForm')}>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`magazine${idx}`}>
              <input
                type="checkbox"
                name="magazine"
                idx={`magazine${idx}`}
                checked={magachk}
                onChange={this.allCheckBox}
              />
              <span></span>MAGAZINE</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`news${idx}`}>
              <input
                type="checkbox"
                name="news"
                idx={`news${idx}`}
                checked={newschk}
                onChange={() => this.setState({newschk : !this.state.newschk})}
              />
            <span></span>NEWS</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`startup${idx}`}>
              <input
                type="checkbox"
                name="startup"
                idx={`startup${idx}`}
                checked={startupchk}
                onChange={() => this.setState({startupchk : !this.state.startupchk})}
              />
            <span></span>START_UP</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`discussion${idx}`}>
              <input
                type="checkbox"
                name="discussion"
                idx={`discussion${idx}`}
                checked={discussionchk}
                onChange={() => this.setState({discussionchk : !this.state.discussionchk})}
              />
            <span></span>DISCUSSION</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`data${idx}`}>
              <input
                type="checkbox"
                name="data"
                idx={`data${idx}`}
                checked={datachk}
                onChange={() => this.setState({datachk : !this.state.datachk})}
              />
            <span></span>DATA</label>
          </div>
        </form>
      </div>
      <OpenPanelEdit
        idx={idx}
        img={img}
        name={name}
        firstname={firstname}
        email={email}
        password={password}
        memo={memo}
        magachk={magachk}
        newschk={newschk}
        startupchk={startupchk}
        discussionchk={discussionchk}
        datachk={datachk}
        openPanel={openPanel}
        />
      </div>
    );
  }
}
export default ProfileList;
