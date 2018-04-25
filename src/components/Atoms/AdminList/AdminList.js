import React, { Component } from 'react';
import styles from './AdminList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
class AdminList extends Component{
  constructor(props){
    super(props);
    this.state={
      check:false,
    }
  }
  handleCheck = (e) => {
    this.setState((prevState) => ({check: !prevState.check}))
  }
  render(){
    const { check } = this.state;
    const { idx, openmenu, menu, img, cate, date,
       ftitle, publish, reporter, magazine } = this.props;
    if(magazine){
      return (
        <div className={cx('newsList')} id={idx}>
          <div className={cx('listCheck')}>
            <label htmlFor={`newsListCheck${idx}`} >
              <input type="radio" name="listradio" id={`newsListCheck${idx}`} />
              <span></span>
            </label>
          </div>
          <div className={cx('listImg')}>
            <img src={img} alt="img"/>
          </div>
          <div className={cx('listText')}>
            <dl>
              <dt>
                <span className={cx('listTitle')}>
                  {cate}
                </span>
                <span>
                  {date}
                </span>
              </dt>
              <dd>{ftitle}</dd>
            </dl>
            <div className={cx('listReport')}>
              <span className={cx('first')}>{publish}</span>
              <span className={cx('last')}>{reporter}</span>
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <div className={cx('newsList')}>
          <div className={cx('listCheck')}>
            <label htmlFor={`newsListCheck${idx}`} data-item={idx}>
              <input
                type="checkbox"
                name="newscheck"
                id={`newsListCheck${idx}`}
                checked={ this.props.checkAll ? this.props.checkAll : check }
                onChange={(e) => this.handleCheck(e)}
              />
              <span onClick={openmenu}></span>
            </label>
          </div>
          <Link to={`/admin/add=${menu}/${idx}`}>
            <div className={cx('listImg')}>
              <img src={img} alt="img"/>
            </div>
            <div className={cx('listText')}>
              <dl>
                <dt>
                  <span className={cx('listTitle')}>
                    {cate}
                  </span>
                  <span>
                    {date}
                  </span>
                </dt>
                <dd>{ftitle}</dd>
              </dl>
              <div className={cx('listReport')}>
                <span className={cx('first')}>{publish}</span>
                <span className={cx('last')}>{reporter}</span>
              </div>
            </div>
          </Link>
        </div>
      );
    }
  }
}
AdminList.defaultProps={
  img:"undefined",
  cate:"undefined",
  date:"undefined",
  ftitle:"undefined",
  publish:"undefined",
  reporter:"undefined"
}

export default AdminList;
