import React, { Component } from 'react';
import styles from './AdminList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ImageApi, UserApi, SectorApi } from '../../../api';

const cx = classNames.bind(styles);
class AdminList extends Component{
  constructor(props){
    super(props);
    this.state={
      check:false,
      publishDate:"",
      image:"",
      sector:""
    }
  }

  handleCheck = (e) => {
    this.setState((prevState) => ({check: !prevState.check}))
  }

  componentDidMount(){
    let day = moment(this.props.date, "YYYY-MM-DD").fromNow();
    let publish = day.replace(" year", "년").replace(" months", "개월").replace(" days", "일").replace(" ago", "").replace("in ", "");
    let number = publish.replace(/\d+[개]+[월]/g,"").replace(/\d+[년]/g,"");
    let days = number.replace(/[일]/g,"")
    //기준이 되는 날짜
    if(days <= 27 && days > 0 ){
      days += "일전"
      this.setState({ publishDate: days })
    }
    ImageApi.viewThumbnailImage(this.props.image, 256).then(res => this.setState({ image: res.config.url }))
    UserApi.getUser(this.props.reporter).then(res => this.setState({firstName: res.data.user.firstName, lastName:res.data.user.lastName}))
    SectorApi.getSector(this.props.sector).then(res => this.setState({sector: res.data.sector.name}))
  }

  render(){
    const { check, publishDate, image, firstName, lastName, sector } = this.state;
    const { id, openmenu, date, title, magazine, selectItem } = this.props;
    if(magazine){
      return (
        <div className={cx('newsList')} >
          <div className={cx('listCheck')}>
            <label htmlFor={`newsListCheck${id}`} data-item={id}>
              <input
                type="radio"
                name={`newsItem${selectItem}`}
                id={`newsListCheck${id}`}
                onChange={(e) => this.props.getIdx(e)}
              />
              <span></span>
            </label>
          </div>
          <div className={cx('listImg')}>
            <img src={image} alt=""/>
          </div>
          <div className={cx('listText')}>
            <dl>
              <dt>
                <span className={cx('listTitle')}>
                  {sector}
                </span>
                <span>
                  {date}
                </span>
              </dt>
              <dd>{title}</dd>
            </dl>
            <div className={cx('listReport')}>
              <span className={cx('first')}>{publishDate}</span>
              <span className={cx('last')}>{firstName} {lastName}</span>
            </div>
          </div>
        </div>
      );
    }else{
      return (
        <div className={cx('newsList')}>
          <div className={cx('listCheck')}>
            <label htmlFor={`newsListCheck${id}`} data-item={id}>
              <input
                type="checkbox"
                name="newscheck"
                id={`newsListCheck${id}`}
                checked={ this.props.checkAll ? this.props.checkAll : check }
                onChange={(e) => this.handleCheck(e)}
              />
              <span onClick={openmenu}></span>
            </label>
          </div>
          <Link to={`/admin/add=news/${id}`}>
            <div className={cx('listImg')}>
              <img src={image} alt=""/>
            </div>
            <div className={cx('listText')}>
              <dl>
                <dt>
                  <span className={cx('listTitle')}>
                    {sector}
                  </span>
                  <span>
                    {date}
                  </span>
                </dt>
                <dd>{title}</dd>
              </dl>
              <div className={cx('listReport')}>
                <span className={cx('first')}>{publishDate}</span>
                <span className={cx('last')}>{firstName} {lastName}</span>
              </div>
            </div>
          </Link>
        </div>
      );
    }
  }
}

export default AdminList;
