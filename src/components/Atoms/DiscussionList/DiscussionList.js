import React, { Component } from 'react';
import styles from './DiscussionList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
class DiscussionList extends Component{
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
    const { idx, img, title1, title2, year, month, publish1,
       reporter1, publish2, reporter2, openmenu, menu, magazine} = this.props
    if(magazine){
      return (
        <div className={cx('discussionList')} id={idx}>
          <div className={cx('listCheck')}>
            <label htmlFor={`newsListCheck${idx}`}>
              <input type="radio" name="listradio" id={`newsListCheck${idx}`} />
              <span></span>
            </label>
          </div>
          <div className={cx('listImg')}>
            <img src={img} alt="img"/>
            <div className={cx('label')}>
              <span className={cx('year')}>{year}</span>
              <span className={cx('month')}>{month}</span>
            </div>
          </div>
          <div className={cx('listText')}>
            <div className={cx('topText')}>
              <div className={cx('listTitle')}>{title1}</div>
              <div className={cx('listReport')}>
                <span className={cx('first')}>{publish1}</span>
                <span className={cx('last')}>{reporter1}</span>
              </div>
            </div>
            <div className={cx('bottomText')}>
              <div className={cx('listTitle')}>{title2}</div>
              <div className={cx('listReport')}>
                <span className={cx('first')}>{publish2}</span>
                <span className={cx('last')}>{reporter2}</span>
              </div>
            </div>
          </div>
      </div>
      )
    }else{
      return (
        <div className={cx('discussionList')}>
          <div className={cx('listCheck')}>
            <label htmlFor={`newsListCheck${idx}`} data-item={idx}>
              <input
                type="checkbox"
                name="discussioncheck"
                id={`newsListCheck${idx}`}
                checked={ this.props.checkAll ? this.props.checkAll : check }
                onChange={(e) => this.handleCheck(e)}/>
              <span onClick={openmenu}></span>
            </label>
          </div>
          <Link to={`/admin/add=${menu}/${idx}`}>
          <div className={cx('listImg')}>
            <img src={img} alt="img"/>
            <div className={cx('label')}>
              <span className={cx('year')}>{year}</span>
              <span className={cx('month')}>{month}</span>
            </div>
          </div>
          <div className={cx('listText')}>
            <div className={cx('topText')}>
              <div className={cx('listTitle')}>{title1}</div>
              <div className={cx('listReport')}>
                <span className={cx('first')}>{publish1}</span>
                <span className={cx('last')}>{reporter1}</span>
              </div>
            </div>
            <div className={cx('bottomText')}>
              <div className={cx('listTitle')}>{title2}</div>
              <div className={cx('listReport')}>
                <span className={cx('first')}>{publish2}</span>
                <span className={cx('last')}>{reporter2}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      );
    }
  }
}
DiscussionList.defaultProps={
  img:"undefined",
  title1:"undefined",
  title2:"undefined",
  year:"undefined",
  month:"undefined",
  publish1:"undefined",
  reporter1:"undefined",
  publish2:"undefined",
  reporter2:"undefined"
}

export default DiscussionList;
