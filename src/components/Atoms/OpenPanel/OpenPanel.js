import React,{Component} from 'react';
import styles from './OpenPanel.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class OpenPanel extends Component{
  constructor(props){
    super(props);
    this.state={
      index:0,
      img:'',
      name:'',
      firstname:'',
      memo:'',
    }
    this.addProfileName = this.addProfileName.bind(this);
    this.addProfileFirstName = this.addProfileFirstName.bind(this);
    this.addProfileMemo = this.addProfileMemo.bind(this);
    this.addProfileImg = this.addProfileImg.bind(this);
    this.indexPlus = this.indexPlus.bind(this);
    this.handleSubmit =this.handleSubmit.bind(this);
  }
  addProfileName(e){this.setState({name:e.target.value})}
  addProfileFirstName(e){this.setState({firstname:e.target.value})}
  addProfileMemo(e){this.setState({memo:e.target.value})}
  addProfileImg(e){this.setState({img:e.target.value})}
  indexPlus(e){this.setState((prevState) => ({index: prevState.index}));}
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
    const { onCreateUser, openPanel } = this.props;
    const { index, img, name, firstname, memo } = this.state;
    return (
      <div className={openPanel ? cx('addPanel','open') : cx('addPanel')}>
        <form onSubmit={ (e) => { onCreateUser({index, img, name, firstname, memo}); this.handleSubmit(e) } }>
          <div className={cx('profileTitle')}>PROFILE</div>
          <div className={cx('profileLeft')}>
            <input type="file" value={img} onChange={this.addProfileImg}/>
            <img className={cx('img')} src={img} alt="img"/>
          </div>
          <div className={cx('profileRight')}>
            <div className={cx('rightText')}>
              <div className={cx('rightInput','first')}><input type="text" placeholder="NOM" value={name} onChange={this.addProfileName}/></div>
              <div className={cx('rightInput')}><input type="text" placeholder="PRENOM" value={firstname} onChange={this.addProfileFirstName}/></div>
            </div>
            <div className={cx('textArea')}><textarea placeholder="MEMO" value={memo} onChange={this.addProfileMemo}></textarea></div>
            <button type="submit" onClick={this.indexPlus}>ADD</button>
          </div>
        </form>
      </div>
    );
  }
}

export default OpenPanel;
