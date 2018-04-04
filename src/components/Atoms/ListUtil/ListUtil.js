import React,{Component} from 'react';
import styles from './ListUtil.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ListUtil extends Component{
  render(){
    return (
      <div className={cx('listUtil')}>
        <div className={cx('allCheck')}><label htmlFor="allCheck"><input type="checkbox" id="allCheck"/><span></span>ALL</label></div>
        <div className={cx('menuToggle')} onClick={this.props.menuToggle}><img src="/assets/btn-menu.svg" alt="menuImg"/></div>
      </div>
    );
  }
}

export default ListUtil;
