import React,{Component} from 'react';
import styles from './NewsTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class NewsTemplate extends Component{
  render(){
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
            <div className={cx('addDate')}><input type="text" placeholder="DATE"></input></div>
          </div>
        </div>
        <div className={cx('templateWrapper')}>
          <div className={cx('inputText')}><input type="text" placeholder="TITLE"></input></div>
          <div className={cx('textArea')}>
            <textarea placeholder="TEXT"></textarea>
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

export default NewsTemplate;
