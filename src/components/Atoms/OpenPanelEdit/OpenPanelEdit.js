import React,{Component} from 'react';
import styles from './OpenPanelEdit.scss';
import classNames from 'classnames/bind';
import { UserApi, ImageApi } from '../../../api';

const cx = classNames.bind(styles);

class OpenPanelEdit extends Component{
  constructor(props){
    super(props);
    const { lastName, email, password, firstName, memo, image, openPanel } = this.props;
    this.state={
      email:email,
      password:password,
      lastName:lastName,
      firstName:firstName,
      memo:memo,
      image:image,
      openPanel:openPanel,
      imagePreviewUrl:"",
      popup:false,
    }

    this.btnClick = this.btnClick.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props;
    const {  email, password, image, lastName, firstName, memo } = this.state
    const body = {
      "email":email,
      "password":password,
      "image":image,
      "lastName":lastName,
      "firstName":firstName,
      "memo":memo
    }
    UserApi.updateUser(id, body).then(res => console.log(res))
  }

  btnClick = () => {
    this.setState({ popup: !this.state.popup })
    setTimeout(()=>{
      this.setState({ popup: !this.state.popup })
      this.props.handleEdit()
    },1500)
  }

  handleImageChange = async (e)  => {
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
    const { openPanel, prevImg, changeText } = this.props;
    const { email, password, imagePreviewUrl, lastName, firstName, memo, popup } = this.state;
    return (
      <div className={openPanel ? cx('editPanel','open') : cx('editPanel')}>
        <form onSubmit={ (e) => { this.handleSubmit(e) } }>
          <div className={cx('profileTitle')}>PROFILE</div>
          <div className={cx('profileLeft')}>
            <input type="file" accept='image/*' onChange={(e)=>this.handleImageChange(e)}/>
            <img className={cx('img')} src={imagePreviewUrl ? imagePreviewUrl : prevImg} alt=""/>
          </div>
          <div className={cx('profileRight')}>
            <div className={cx('rightText')}>
              <div className={cx('rightInput','first')}><input type="email" name="email" placeholder="EMAIL" value={email} onChange={ (e) => this.setState({email:e.target.value}) }/></div>
              <div className={cx('rightInput')}><input type="password" disabled name="pw" placeholder="PASSWORD" value={password} onChange={ (e) => this.setState({password:e.target.value}) }/></div>
              <div className={cx('rightInput','first')}><input type="text" name="lastName" placeholder="NOM" value={lastName} onChange={ (e) => this.setState({lastName:e.target.value}) }/></div>
              <div className={cx('rightInput')}><input type="text" name="firstName" placeholder="PRENOM" value={firstName} onChange={ (e) => this.setState({firstName:e.target.value}) }/></div>
            </div>
            <div className={cx('textArea')}><textarea placeholder="MEMO" value={memo} onChange={(e) => this.setState({memo:e.target.value})}></textarea></div>
            <button type="submit" onClick={() => { this.btnClick(); changeText(this.state)} }>CHANGE</button>
            <div className={popup? cx('successEdit','on') : cx('successEdit')}>수정되었습니다</div>
          </div>
        </form>
      </div>
    );
  }
}
export default OpenPanelEdit;
