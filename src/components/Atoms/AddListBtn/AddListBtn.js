import React from 'react';
import styles from './AddListBtn.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const AddListBtn = ({menu}) => {
    return (
      <Link to={`/admin/add=${menu}`}>
        <div className={cx('btnWrapper')}>
          <div className={cx('AddListBtn')}>
            <img src="/assets/icon-plus.svg" alt="naviIcon"/>
          </div>
        </div>
      </Link>
    );
}

export default AddListBtn;
