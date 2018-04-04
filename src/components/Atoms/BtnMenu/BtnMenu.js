import React,{Component} from 'react';
import styles from './BtnMenu.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class BtnMenu extends Component{
  render(){
    return (
      <div className={this.props.openMenu ? cx('btnMenu','on') : cx('btnMenu')}>
        <div className={cx('cancleBox')} onClick={this.props.closeBtnMenu}>
          <img src="/assets/btn-cancle-box.svg" alt="cancleBox"/>
        </div>
        <div className={cx('btnMenuInner')}>
          <select>
              <option value="201712">2017-12</option>
              <option value="201712">2017-12</option>
              <option value="201712">2017-12</option>
              <option value="201712">2017-12</option>
          </select>
          <button className={cx('magazineBtn')}>MAIN ARTICLES</button>
          <button className={cx('removeBtn')} onClick={this.removeBtn}>REMOVE</button>
        </div>
      </div>
    );
  }
}

export default BtnMenu;
