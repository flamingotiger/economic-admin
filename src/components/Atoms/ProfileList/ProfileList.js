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
  //체크박스--------------------------------------------------
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
  //--------------------------------------------------------
  handleEdit(){this.setState({openPanel:!this.state.openPanel})}
  chkValue = () => {
    const { idx } = this.props
    if(this.props[idx]){
      this.setState({
          magachk: this.props[idx].magachk,
          newschk: this.props[idx].newschk,
          startupchk: this.props[idx].startupchk,
          discussionchk: this.props[idx].discussionchk,
          datachk: this.props[idx].datachk,
      })
    }
  }
  componentDidMount(){
    this.chkValue();
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
    const {idx, img, name, firstname, memo } = this.props;
    const { openPanel, openCancel, magachk, newschk, startupchk, discussionchk, datachk} = this.state;
    const uservalue = this.props
    return (
      <div className={cx('listWrapper')}>
      <div className={cx('profileList')}>
        <div className={cx('closeBtn')} onClick={() => this.handleCancel(1)}>
          <img src="/assets/btn-cancle.svg" alt="xBtn"/>
        </div>
        <Cancel
          idx={idx}
          openCancel={openCancel}
          handleCancel={this.handleCancel}
        />
        <div className={cx('profileEditWrapper')}>
          <div className={cx('profileUser')}>user{idx}</div>
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
                onChange={this.newsCheckBox}
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
                onChange={this.startupCheckBox}
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
                onChange={this.discussionCheckBox}
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
                onChange={this.dataCheckBox}
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
        memo={memo}
        magachk={magachk}
        newschk={newschk}
        startupchk={startupchk}
        discussionchk={discussionchk}
        datachk={datachk}
        uservalue={uservalue}
        openPanel={openPanel}
        />
      </div>
    );
  }
}
export default ProfileList;
