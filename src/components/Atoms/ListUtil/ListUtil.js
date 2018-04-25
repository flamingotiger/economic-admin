import React from 'react';
import styles from './ListUtil.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ListUtil = ({menuToggle, listCheckAll}) => {
    return (
      <div className={cx('listUtil')} >
        <div className={cx('allCheck')}>
          <label htmlFor="allCheck" >
            <input type="checkbox" id="allCheck" onChange={listCheckAll}/><span></span>ALL</label>
          </div>
        <div className={cx('menuToggle')} onClick={menuToggle}><img src="/assets/btn-menu.svg" alt="menuImg"/></div>
      </div>
    );
}
export default ListUtil;
