import React from 'react';
import styles from './SelectBtn.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SelectBtn = () => {
  return (
    <div className={cx('select')}>
      <select>
          <option value="201712">2017-12</option>
          <option value="201712">2017-12</option>
          <option value="201712">2017-12</option>
          <option value="201712">2017-12</option>
      </select>
    </div>
  );
}

export default SelectBtn;
