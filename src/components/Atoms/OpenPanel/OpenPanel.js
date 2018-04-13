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
      name:'',
      firstname:'',
      memo:'',
    }
    this.addProfileName = this.addProfileName.bind(this);
    this.addProfileFirstName = this.addProfileFirstName.bind(this);
    this.addProfileMemo = this.addProfileMemo.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
  }
  addProfileName(e){this.setState({name:e.target.value})}
  addProfileFirstName(e){this.setState({firstname:e.target.value})}
  addProfileMemo(e){this.setState({memo:e.target.value})}
  handleSubmit(e){
    e.preventDefault();
    console.log('api POST사용');
    const {img, name, firstname, memo} = this.state;
    //test api
    axios.post('https://jsonplaceholder.typicode.com/posts',{
      img:img,
      name:name,
      firstname:firstname,
      memo:memo
    }).then(res => console.log(res));
    //초기화
    this.setState({
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
    const { img, name, firstname, memo } = this.state;
    return (
      <div className={openPanel ? cx('addPanel','open') : cx('addPanel')}>
        <form onSubmit={ (e) => { this.handleSubmit(e) } }>
          <div className={cx('profileTitle')}>PROFILE</div>
          <div className={cx('profileLeft')}>
            <input type="file" accept='image/*' onChange={(e) => this.handleImageChange(e)}/>
            <img className={cx('img')} src={img} alt=""/>
          </div>
          <div className={cx('profileRight')}>
            <div className={cx('rightText')}>
              <div className={cx('rightInput','first')}><input type="text" placeholder="NOM" value={name} onChange={this.addProfileName}/></div>
              <div className={cx('rightInput')}><input type="text" placeholder="PRENOM" value={firstname} onChange={this.addProfileFirstName}/></div>
            </div>
            <div className={cx('textArea')}><textarea placeholder="MEMO" value={memo} onChange={this.addProfileMemo}></textarea></div>
            <button type="submit" onClick={() => profilePanel(0)}>ADD</button>
          </div>
        </form>
      </div>
    );
  }
}

export default OpenPanel;
