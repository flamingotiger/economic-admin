import React,{Component} from 'react';
import styles from './BtnMenu.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class BtnMenu extends Component{
  render(){
    return (
      <div className={this.props.openMenu ? cx('btnMenu','on') : cx('btnMenu')}>
        <div className={cx('cancelBox')} onClick={this.props.closeBtnMenu}>
          <img src="/assets/btn-cancle-box.svg" alt="cancelBox"/>
        </div>
        <button className={cx('removeBtn')} onClick={this.props.removeBtn}>REMOVE</button>
      </div>
    );
  }
}

export default BtnMenu;
