import React,{ Component } from 'react';
import styles from './AddMagazine.scss';
import classNames from 'classnames/bind';
import { Navigate, AddListBtn } from '../../Atoms';
import { MagazinePopup } from '../../Organisms';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getApi, postApi, putApi } from '../../../api';

const cx = classNames.bind(styles);
class DateBtn extends Component {
  //Date button style (react-datepicker)
  render () {
    return (
      <button
        className={cx('addDate')}
        onClick={this.props.onClick}>
        {this.props.value ? this.props.value : "DATE"}
      </button>
    )
  }
}
class AddMagazine extends Component{
  constructor(props){
    super(props);
    this.state={
      popup:"",
      loading:false,
      calendarDate:"DATE",
      startDate:moment(),
      newsItem0:undefined,
      newsItem1:undefined,
      disItem:undefined,
      newsTitle:undefined,
      disTitle:undefined,
      startupTitle:undefined,
      dataTitle:undefined
    }
  }
  handlePopup = (cate) => { this.setState({popup: cate}) }
  componentDidMount(){
    getApi().then(res => this.setState({data : res.data, loading:true}))
  }
  //Calendar
  onClickDay = (value) => this.setState({calendarDate: String(value)});
  handleChange = (date) => this.setState({ startDate: date });
  getIdx = (e) => {
    const check = Number(e.target.parentNode.getAttribute('data-item'))
    this.setState({ [e.target.name]: check})
  }
  render(){
    const { popup, loading, data, newsItem0, newsItem1, disItem } = this.state;
    if(!loading){
      return null
    }
    return (
      <div className={cx('addMagazineWrapper')}>
        {this.state.popup &&
          <MagazinePopup popup={popup} getIdx={(e) => this.getIdx(e)} />
        }
        <AddListBtn menu="magazine"/>
        <Navigate />
        <div className={cx('addMagazine')}>
          <div className={cx('topMagazine')}>
            <div className={cx('fileUpLoad')}>
              <input type="file"/>
            </div>
            <div className={cx('addDateWrapper')}>
              <DatePicker
                customInput={<DateBtn />}
                dateFormat="YYYY-MM-DD"
                selected={this.state.startDate}
                onChange={this.handleChange}
                minDate={moment()}
                maxDate={moment().add(30, "days")}
              />
            </div>
            <div className={cx('blackLine')}></div>
          </div>
          <div className={cx('newsMagazine')}>
            <div className={cx('inputText')}>
              <input
                type="text"
                placeholder="News-title"
                />
            </div>
            <ul className={cx('subTitle')}>
              <li className={cx('subTitleList','list1')}>
                {newsItem0 >= 0?
                  data.news[newsItem0].f_title
                  :
                  ""
                }
              </li>
              <li className={cx('subTitleList','list2')}>
                {newsItem1 >= 0?
                  data.news[newsItem1].f_title
                  :
                  ""
                }
              </li>
            </ul>
            <div className={cx('newsSelect1')} onClick={(cate) => this.handlePopup("news1")}>
              {newsItem0 >= 0?
                (
                <div className={cx('newsContent')}>
                  <div className={cx('text')}>
                    <div className={cx('newsLeft')}>
                      <div className={cx('category')}>{data.news[newsItem0].cate}</div>
                      <p>{data.news[newsItem0].f_text}</p>
                    </div>
                    <div className={cx('newsRight')}>
                      <div className={cx('newsImg')}><img src={data.news[newsItem0].img} alt="columnImg"/></div>
                      <p>{data.news[newsItem0].f_text}</p>
                    </div>
                  </div>
                </div>
                )
                :
                <dl>
                  <dt>NEWS</dt>
                  <dd>SELECT POST</dd>
                </dl>
              }
            </div>
            <div className={cx('newsSelect2')} onClick={(cate) => this.handlePopup("news2")}>
              {newsItem1 >= 0?
                (
                <div className={cx('newsContent')}>
                  <div className={cx('text')}>
                    <div className={cx('newsLeft')}>
                      <div className={cx('category')}>{data.news[newsItem1].cate}</div>
                      <p>{data.news[newsItem1].f_text}</p>
                    </div>
                    <div className={cx('newsRight')}>
                      <div className={cx('newsImg')}><img src={data.news[newsItem1].img} alt="columnImg"/></div>
                      <p>{data.news[newsItem1].f_text}</p>
                    </div>
                  </div>
                </div>
                )
                :
                <dl>
                  <dt>NEWS</dt>
                  <dd>SELECT POST</dd>
                </dl>
              }
            </div>
          </div>
          <div className={cx('disMagazine')}>
            <div className={cx('HomeDiscussionTitle')}>
              <h2 className={cx('title')}>
                <span>POUR? CONTRE?</span>
                <div className={cx('inputText')}>
                  <input
                    type="text"
                    placeholder="Discussion-title"
                  />
                </div>
              </h2>
            </div>
            <div className={cx('disSelect')} onClick={(cate) => this.handlePopup("discussion")}>
              { disItem >= 0 ?
                <div className={cx('text')}>
                  <div className={cx('column','column1')}>
                    <img src={data.discussion[disItem].img} alt="columnImg"/>
                  </div>
                  <div className={cx('column','column2')}>
                    {data.discussion[disItem].f_text1}
                    {data.discussion[disItem].f_text2}
                  </div>
                  <div className={cx('column','column3')}>
                    <img src={data.discussion[disItem].img} alt="columnImg"/>
                  </div>
                </div>
                :
              (<dl>
                <dt>DISCUSSION</dt>
                <dd>SELECT POST</dd>
              </dl>)
              }
            </div>
          </div>
          <div className={cx('startupMagazine')}>
            <div className={cx('inputText')}>
              <input type="text" placeholder="Startup-title" />
            </div>
            <div className={cx('startupSelect')} onClick={(cate) => this.handlePopup("startup1")}>
              <dl>
                <dt>STARTUP</dt>
                <dd>SELECT POST</dd>
              </dl>
            </div>
            <div className={cx('startupSelect','center')} onClick={(cate) => this.handlePopup("startup2")}>
              <dl>
                <dt>STARTUP</dt>
                <dd>SELECT POST</dd>
              </dl>
            </div>
            <div className={cx('startupSelect')} onClick={(cate) => this.handlePopup("startup3")}>
              <dl>
                <dt>STARTUP</dt>
                <dd>SELECT POST</dd>
              </dl>
            </div>
          </div>
          <div className={cx('dataMagazine')}>
            <div className={cx('inputText')}>
              <input type="text" placeholder="Data-title" />
            </div>
              <div className={cx('dataSelect')} onClick={(cate) => this.handlePopup("data")}>
                <dl>
                  <dt>DATA</dt>
                  <dd>SELECT POST</dd>
                </dl>
              </div>
          </div>
          <div className={cx('publish')}>
            <div className={cx('text')}>MODIFIÉ  3j</div>
            <button>PUBLISH</button>
            <div className={cx('deleteBtn')}><img src="https://www.simuladordeinvestimentos.com/images/clear.png" alt="deleteBtn"/></div>
          </div>
        </div>
      </div>
    )
  }
}
export default AddMagazine;
