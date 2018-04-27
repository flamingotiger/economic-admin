import React,{Component} from 'react';
import styles from './OpenPanelEdit.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(styles);

class OpenPanelEdit extends Component{
  constructor(props){
    super(props);
    const { name, email, password, firstname, memo, img, magachk, openPanel,
       newschk, startupchk, discussionchk, datachk } = this.props;
    this.state={
      email:email,
      password:password,
      name:name,
      firstname:firstname,
      memo:memo,
      img:img,
      magachk:magachk,
      openPanel:openPanel,
      newschk:newschk,
      startupchk:startupchk,
      discussionchk:discussionchk,
      datachk:datachk,
      popup:false,
    }
    this.addMemo = this.addMemo.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
    this.btnClick = this.btnClick.bind(this);
  }
  addMemo(e){this.setState({memo:e.target.value})}
  handleSubmit(e){
    e.preventDefault();
    console.log('여기서 api PUT사용')
    const {  email, password, img, name, firstname, memo, popup, openPanel,
       magachk, newschk, startupchk, discussionchk, datachk } = this.state
    //파라미터에 해당하는 `url${idx}` 값을 토대로 put
    axios.put('https://honghakbum.github.io/economic-admin/profile.json',{
        magachk:magachk,
        openPanel:openPanel,
        newschk:newschk,
        startupchk:startupchk,
        discussionchk:discussionchk,
        datachk:datachk,
        email:email,
        password:password,
        img:img,
        name:name,
        firstname:firstname,
        memo:memo,
        popup:popup
    }).then(res => console.log(res))
  }
  //popup
  btnClick = () => {
    this.setState({ popup: !this.state.popup })
    setTimeout(()=>{
      this.setState({ popup: !this.state.popup })
    },1500)
  }
  //imgEdit
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => { this.setState({img: reader.result}); }
    reader.readAsDataURL(file)
  }
  render(){
    const { openPanel } = this.props;
    const { email, password, img, name, firstname, memo, popup } = this.state;
    return (
      <div className={openPanel ? cx('editPanel','open') : cx('editPanel')}>
        <form onSubmit={ (e) => { this.handleSubmit(e) } }>
          <div className={cx('profileTitle')}>PROFILE</div>
          <div className={cx('profileLeft')}>
            <input type="file" accept='image/*' onChange={(e)=>this.handleImageChange(e)}/>
            <img className={cx('img')} src={img} alt=""/>
          </div>
          <div className={cx('profileRight')}>
            <div className={cx('rightText')}>
              <div className={cx('rightInput','first')}><input type="email" name="email" placeholder="EMAIL" value={email} onChange={ (e) => this.setState({email:e.target.value}) }/></div>
              <div className={cx('rightInput')}><input type="text" name="pw" placeholder="PASSWORD" value={password} onChange={ (e) => this.setState({password:e.target.value}) }/></div>
              <div className={cx('rightInput','first')}><input type="text" name="name" placeholder="NOM" value={name} onChange={ (e) => this.setState({name:e.target.value}) }/></div>
              <div className={cx('rightInput')}><input type="text" name="fitstname" placeholder="PRENOM" value={firstname} onChange={ (e) => this.setState({firstname:e.target.value}) }/></div>
            </div>
            <div className={cx('textArea')}><textarea placeholder="MEMO" value={memo} onChange={this.addMemo}></textarea></div>
            <button type="submit" onClick={this.btnClick}>CHANGE</button>
            <div className={popup? cx('successEdit','on') : cx('successEdit')}>수정되었습니다</div>
          </div>
        </form>
      </div>
    );
  }
}
export default OpenPanelEdit;
