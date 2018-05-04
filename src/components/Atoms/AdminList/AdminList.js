import React, { Component } from 'react';
import styles from './AdminList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';

const cx = classNames.bind(styles);
class AdminList extends Component{
  constructor(props){
    super(props);
    this.state={
      check:false,
      publishDate:""
    }
  }

  handleCheck = (e) => {
    this.setState((prevState) => ({check: !prevState.check}))
  }

  componentDidMount(){
    let day = moment(this.props.date, "YYYY-MM-DD").fromNow();
    let publish = day.replace(" year", "년").replace(" months", "개월").replace(" day", "일").replace(" ago", "전");
    let number = publish.replace(/\d+(?= 일)/,"");
    //기준이 되는 날짜
    if(number <= 7){
      this.setState({ publishDate: publish })
    }
  }

  render(){
    const { check, publishDate } = this.state;
    const { idx, openmenu, menu, img, cate, date,
       ftitle, publish, reporter, magazine, selectItem } = this.props;
    if(magazine){
      return (
        <div className={cx('newsList')} >
          <div className={cx('listCheck')}>
            <label htmlFor={`newsListCheck${idx}`} data-item={idx}>
              <input
                type="radio"
                name={`newsItem${selectItem}`}
                id={`newsListCheck${idx}`}
                onChange={(e) => this.props.getIdx(e)}
              />
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
              <span className={cx('first')}>{publishDate}</span>
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
                <span className={cx('first')}>{publishDate}</span>
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
