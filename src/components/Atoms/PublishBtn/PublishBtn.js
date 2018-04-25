import React from 'react';
import styles from './PublishBtn.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PublishBtn = () => {
  return (
    <div className={cx('publishBtn')}>
      <button className={cx('magazineBtn')}>MAIN ARTICLES</button>
    </div>
  );
}

export default PublishBtn;
