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
    //체크박스--------------------------------------------------
    this.allCheckBox = this.allCheckBox.bind(this);
    this.newsCheckBox = this.newsCheckBox.bind(this);
    this.startupCheckBox = this.startupCheckBox.bind(this);
    this.discussionCheckBox = this.discussionCheckBox.bind(this);
    this.dataCheckBox = this.dataCheckBox.bind(this);
    //--------------------------------------------------------
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  //체크박스-------------------------------------------------------------
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
  newsCheckBox(){this.setState({newschk : !this.state.newschk})}
  startupCheckBox(){this.setState({startupchk : !this.state.startupchk})}
  discussionCheckBox(){this.setState({discussionchk : !this.state.discussionchk})}
  dataCheckBox(){this.setState({datachk : !this.state.datachk})}
  //-------------------------------------------------------------------
  handleEdit(){this.setState({openPanel:!this.state.openPanel})}
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
            <label
              htmlFor={`magazine${idx}`}
              onClick={this.allCheckBox}
              >
              <input
                type="checkbox"
                name="magazine"
                idx={`magazine${idx}`}
                checked={magachk}
              />
              <span></span>MAGAZINE</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label
              htmlFor={`news${idx}`}
              onClick={this.newsCheckBox}
            >
              <input
                type="checkbox"
                name="news"
                idx={`news${idx}`}
                checked={newschk}
              />
            <span></span>NEWS</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label
              htmlFor={`startup${idx}`}
              onClick={this.startupCheckBox}
              >
              <input
                type="checkbox"
                name="startup"
                idx={`startup${idx}`}
                checked={startupchk}
              />
            <span></span>START_UP</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label
              htmlFor={`discussion${idx}`}
              onClick={this.discussionCheckBox}
              >
              <input
                type="checkbox"
                name="discussion"
                idx={`discussion${idx}`}
                checked={discussionchk}
              />
            <span></span>DISCUSSION</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label
              htmlFor={`data${idx}`}
              onClick={this.dataCheckBox}
              >
              <input
                type="checkbox"
                name="data"
                idx={`data${idx}`}
                checked={datachk}
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
