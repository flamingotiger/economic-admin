import React,{Component} from 'react';
import styles from './OpenPanelEdit.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class OpenPanelEdit extends Component{
  constructor(props){
    super(props);
    this.state={
      openPanel:false,
      index:0,
      img:'',
      imgs:this.props.uservalue.img,
      name:this.props.uservalue.name,
      firstname:this.props.uservalue.firstname,
      memo:this.props.uservalue.memo,
    }
    this.addProfileName = this.addProfileName.bind(this);
    this.addProfileFirstName = this.addProfileFirstName.bind(this);
    this.addProfileMemo = this.addProfileMemo.bind(this);
    this.addProfileImg = this.addProfileImg.bind(this);
    this.profilePanel = this.profilePanel.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
  }
  profilePanel(){this.setState((prevState) => ({openPanel: !prevState.openPanel}))}
  addProfileName(e){this.setState({name:e.target.value})}
  addProfileFirstName(e){this.setState({firstname:e.target.value})}
  addProfileMemo(e){this.setState({memo:e.target.value})}
  addProfileImg(e){this.setState({img:e.target.value})}
  handleSubmit(e){
    e.preventDefault();
    //초기화
    this.setState({
      img:'',
      name:'',
      firstname:'',
      memo:''
    })
  }
  render(){
    const { onCreateUser, openPanelEdit } = this.props;
    const { index, img, name, firstname, memo, imgs } = this.state;
    console.log(this.props.uservalue)
    console.log(this.state)
    return (
      <div className={openPanelEdit ? cx('addPanel','open') : cx('addPanel')}>
        <form onSubmit={ (e) => { onCreateUser({index, img, name, firstname, memo}); this.handleSubmit(e) } }>
          <div className={cx('profileTitle')}>PROFILE</div>
          <div className={cx('profileLeft')}>
            <input type="file" value={img} onChange={this.addProfileImg}/>
            <img className={cx('img')} src={imgs} alt="img"/>
          </div>
          <div className={cx('profileRight')}>
            <div className={cx('rightText')}>
              <div className={cx('rightInput','first')}><input type="text" placeholder="NOM" value={name} onChange={this.addProfileName}/></div>
              <div className={cx('rightInput')}><input type="text" placeholder="PRENOM" value={firstname} onChange={this.addProfileFirstName}/></div>
            </div>
            <div className={cx('textArea')}><textarea placeholder="MEMO" value={memo} onChange={this.addProfileMemo}></textarea></div>
            <button type="submit">CHANGE</button>
          </div>
        </form>
      </div>
    );
  }
}
OpenPanelEdit.defaultProps={
  imgFile:"https://www.bzh.be/img.php?src=https://www.sortir-en-bretagne.fr/images/no-image.png&w=330&h=200&zc=1"
}
export default OpenPanelEdit;
