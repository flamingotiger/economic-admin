import React,{Component} from 'react';
import styles from './OpenPanel.scss';
import classNames from 'classnames/bind';
import { UserApi, ImageApi } from '../../../api';

const cx = classNames.bind(styles);

class OpenPanel extends Component{
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      lastName:"",
      firstName:"",
      image:undefined,
      memo:"",
      imagePreviewUrl:"",
      popup:false,
      popuptext:''
    }

  }

  btnClick = () => {
    this.setState({ popup: !this.state.popup })
    setTimeout(()=>{
      this.setState({ popup: !this.state.popup })
    },1500)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName, image, memo } = this.state;
    if(!email){
      this.setState({popuptext: 'email을 등록해주세요'})
      return false;
    }else if(!password){
      this.setState({popuptext: 'password를 입력해주세요'})
      return false;
    }else if(!firstName){
      this.setState({popuptext: 'firstName을 입력해주세요'})
      return false;
    }else if(!lastName){
      this.setState({popuptext: 'lastName을 입력해주세요'})
      return false;
    }else if(!image){
      this.setState({popuptext: 'image를 입력해주세요'})
      return false;
    }else{
      this.setState({popuptext: '입력이 완료되었습니다.'})
    }
    const body = {
      "email":email,
      "password":password,
      "firstName":firstName,
      "lastName":lastName,
      "image":image,
      "memo":memo,
      "magazineManager":false,
      "newsManager":true,
      "startUpManager":false,
      "discussionManager":false,
      "dataManager":false,
      "admin":false
    }
    UserApi.addUser(body)
    this.setState({
      email:"",
      password:"",
      image:"",
      lastName:"",
      firstname:"",
      memo:"",
    })
    this.props.profilePanel(false)
  }

  handleImageChange = async (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    await this.setState({ file:file })
    reader.onloadend = () => {
       this.setState({ imagePreviewUrl: reader.result });
    }
    reader.readAsDataURL(file)
    const formData = new FormData();
    await formData.append("image" , this.state.file);
    await ImageApi.addImage(formData).then(res => this.setState({ image: res.data.image._id }))
  }

  render(){
    const { openPanel } = this.props;
    const { image, email, password, lastName, firstName, memo, imagePreviewUrl } = this.state;
    return (
      <div className={openPanel ? cx('addPanel','open') : cx('addPanel')}>
        <form onSubmit={e => this.handleSubmit(e) }>
          <div className={cx('profileTitle')}>PROFILE</div>
          <div className={cx('profileLeft')}>
            <input type="file" accept='image/*' onChange={(e) => this.handleImageChange(e)}/>
            <img className={cx('img')} src={imagePreviewUrl} alt=""/>
          </div>
          <div className={cx('profileRight')}>
            <div className={cx('rightText')}>
              <div className={cx('rightInput','first')}><input type="email" name="email" placeholder="EMAIL" value={email} onChange={(e) => this.setState({ email:e.target.value })}/></div>
              <div className={cx('rightInput')}><input type="text" name="pw" placeholder="PASSWORD" value={password} onChange={(e) => this.setState({ password:e.target.value })}/></div>
              <div className={cx('rightInput','first')}><input type="text" name="name" placeholder="NOM" value={lastName} onChange={(e) => this.setState({ lastName:e.target.value })}/></div>
              <div className={cx('rightInput')}><input type="text" name="firstname" placeholder="PRENOM" value={firstName} onChange={(e) => this.setState({ firstName:e.target.value })}/></div>
            </div>
            <div className={cx('textArea')}><textarea placeholder="MEMO" name="memo" value={memo} onChange={(e) => this.setState({memo:e.target.value})}></textarea></div>
            <button type="submit" onClick={this.btnClick}>ADD</button>
            <div className={this.state.popup? cx('successEdit','on') : cx('successEdit')}>{this.state.popuptext}</div>
          </div>
        </form>
      </div>
    );
  }
}

export default OpenPanel;
