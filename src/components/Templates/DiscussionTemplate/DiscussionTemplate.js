import React,{Component} from 'react';
import styles from './DiscussionTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class DiscussionTemplate extends Component{
  constructor(props){
    super(props);
    this.state={
      fontsize:12,
      fontweight:"normal"
    }
    this.fontSizeUp= this.fontSizeUp.bind(this);
    this.fontSizeDown= this.fontSizeDown.bind(this);
    this.fontBold= this.fontBold.bind(this);
  }

  fontSizeUp(){
    if(this.state.fontsize < 30){
      this.setState({
        fontsize: this.state.fontsize + 2,
      })
    }
  }

  fontSizeDown(){
    if(this.state.fontsize > 10){
      this.setState({
        fontsize: this.state.fontsize - 2,
      })
    }
  }
  fontBold(){
    if(this.state.fontweight === "normal"){
      this.setState({
        fontweight:"bold"
      })
    }else{
      this.setState({
        fontweight:"normal"
      })
    }
  }

  render(){
    const textFontSize = {
      fontSize: this.state.fontsize,
      fontWeight: this.state.fontweight,
    }
    return (
      <div className={cx('template')}>
        <div className={cx('title')}>{(this.props.addvalue).toUpperCase()}</div>
        <div className={cx('upLoadWrapper')}>
          <div className={cx('fileUpLoads')}>
            <div className={cx('fileUpLoad')}><input type="file"/></div>
            <div className={cx('fileUpLoad')}><input type="file"/></div>
            <div className={cx('fileUpLoad')}><input type="file"/></div>
          </div>
          <div className={cx('utilSelect')}>
            <button className={cx('addEnglish')}><div className={cx('englishBtn')}></div><span>ADD ENGLISH</span></button>
              <select className={cx('selectList')} defaultValue="SELECT">
                  <option value="">SELECT</option>
                  <option value="1">1</option>
                  <option value="1">1</option>
                  <option value="1">1</option>
              </select>
          </div>
        </div>
        <div className={cx('templateWrapper')}>
          <div className={cx('inputText')}><input type="text" placeholder="TITLE"></input></div>
          <div className={cx('textArea')}>
            <textarea placeholder="TEXT" style={textFontSize}></textarea>
              <div className={cx('textUtil')}>
                <div className={cx('utilImg')}><input type="file"/><span>IMAGE</span></div>
                <div onClick={this.fontSizeUp}>A+</div>
                <div onClick={this.fontSizeDown}>A-</div>
                <div className={cx('utilBold')} onClick={this.fontBold}>BOLD</div>
              </div>
          </div>
          <div className={cx('sourceInput')}><input type="text" placeholder="SOURCE"></input></div>
        </div>
        <div className={cx('publish')}>
          <div className={cx('text')}>MODIFIÉ  3j</div>
          <button>PUBLISH</button>
          <div className={cx('deleteBtn')}><img src="https://www.simuladordeinvestimentos.com/images/clear.png" alt="deleteBtn"/></div>
        </div>
      </div>
    )
  }
}

export default DiscussionTemplate;
