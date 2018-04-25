import React,{Component} from 'react';
import styles from './OpenPanel.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(styles);

class OpenPanel extends Component{
  constructor(props){
    super(props);
    this.state={
      openPanel:this.props.openPanel,
      img:'',
      email:'',
      password:'',
      name:'',
      firstname:'',
      memo:'',
    }
    this.addEmail = this.addEmail.bind(this);
    this.addPassword = this.addPassword.bind(this);
    this.addProfileName = this.addProfileName.bind(this);
    this.addProfileFirstName = this.addProfileFirstName.bind(this);
    this.addProfileMemo = this.addProfileMemo.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
  }
  addEmail(e){this.setState({email:e.target.value})}
  addPassword(e){this.setState({password:e.target.value})}
  addProfileName(e){this.setState({name:e.target.value})}
  addProfileFirstName(e){this.setState({firstname:e.target.value})}
  addProfileMemo(e){this.setState({memo:e.target.value})}
  handleSubmit(e){
    e.preventDefault();
    console.log('api POST사용');
    const { img, email, password, name, firstname, memo } = this.state;
    //api POST
    axios.post('https://jsonplaceholder.typicode.com/posts',{
      email:email,
      password:password,
      img:img,
      name:name,
      firstname:firstname,
      memo:memo
    }).then(res => console.log(res));
    //초기화
    this.setState({
      email:'',
      password:'',
      img:'',
      name:'',
      firstname:'',
      memo:''
    })
    this.setState({openPanel:false});
  }
  //ImgEdit
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({img: reader.result});
    }
    reader.readAsDataURL(file)
  }
  render(){
    const { openPanel, profilePanel } = this.props;
    const { img, email, password, name, firstname, memo } = this.state;
    return (
      <div className={openPanel ? cx('addPanel','open') : cx('addPanel')}>
        <form onSubmit={e => this.handleSubmit(e) }>
          <div className={cx('profileTitle')}>PROFILE</div>
          <div className={cx('profileLeft')}>
            <input type="file" accept='image/*' onChange={(e) => this.handleImageChange(e)}/>
            <img className={cx('img')} src={img} alt=""/>
          </div>
          <div className={cx('profileRight')}>
            <div className={cx('rightText')}>
              <div className={cx('rightInput','first')}><input type="email" name="email" placeholder="EMAIL" value={email} onChange={this.addEmail}/></div>
              <div className={cx('rightInput')}><input type="text" name="pw" placeholder="PASSWORD" value={password} onChange={this.addPassword}/></div>
              <div className={cx('rightInput','first')}><input type="text" name="name" placeholder="NOM" value={name} onChange={this.addProfileName}/></div>
              <div className={cx('rightInput')}><input type="text" name="firstname" placeholder="PRENOM" value={firstname} onChange={this.addProfileFirstName}/></div>
            </div>
            <div className={cx('textArea')}><textarea placeholder="MEMO" name="memo" value={memo} onChange={this.addProfileMemo}></textarea></div>
            <button type="submit" onClick={() => profilePanel(false)}>ADD</button>
          </div>
        </form>
      </div>
    );
  }
}

export default OpenPanel;
