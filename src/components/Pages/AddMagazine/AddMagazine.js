import React,{ Component } from 'react';
import styles from './AddMagazine.scss';
import classNames from 'classnames/bind';
import { Navigate, AddListBtn } from '../../Atoms';
import { MagazinePopup } from '../../Organisms';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getApi } from '../../../api';
import { Line } from 'react-chartjs-2';

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
      startupItem0:undefined,
      startupItem1:undefined,
      startupItem2:undefined,
      dataItem:undefined,
      newsTitle:undefined,
      disTitle:undefined,
      startupTitle:undefined,
      dataTitle:undefined,
      chartData:{
        labels:[
          '1998','1999','2000','2001','2002','2003','2004','2005','2006','2007',
          '2008','2009','2010','2011','2012','2013','2014','2015','2016','2017',
        ],
        datasets:[
          {
            label:'(M$)',
            data:[
              20000000,
              21000000,
              22000000,
              23000000,
              24000000,
              25000000,
              26000000,
              28000000,
              32000000,
              33000000,
              34000000,
              30000000,
              32000000,
              31000000,
              33000000,
              34000000,
              35000000,
              36000000,
              37000000,
              38000000,
            ],
            backgroundColor:'rgba(255,255,255,0)',
            borderColor:'rgba(255,0,0,0.7)',
            lineTension:0,
            pointHoverBorderColor:'rgba(255,0,0,1)',
            pointHoverBackgroundColor:'rgba(255,0,0,1)',
            pointBackgroundColor:'rgba(255,0,0,0.7)',
          }
        ]
      }
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
    const { user } = this.props;
    if(!user.isLoggedIn) {
      return (
        <Redirect to="/admin"/>
      );
    }
    const options={
      legend:{
        display:false,
      },
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'SOURCE:OECD',
            },
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: '(M $)',
            },
          }
        ],
      }
    }
    const { popup, loading, data, newsItem0, newsItem1, disItem,
       startupItem0, startupItem1, startupItem2, dataItem
     } = this.state;
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
                      <p className={cx('text')}>{data.news[newsItem0].f_text}</p>
                    </div>
                    <div className={cx('newsRight')}>
                      <div className={cx('newsImg')}><img src={data.news[newsItem0].img} alt="columnImg"/></div>
                      <p className={cx('text')}>{data.news[newsItem0].f_text}</p>
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
              { startupItem0 >= 0 ?
                <div className={cx('post')}>
                  <div className={cx('img')}><img src={data.startup[startupItem0].img} alt="img"/></div>
                  <div className={cx('subTitle')}>{data.startup[startupItem0].ftitle}</div>
                  <div className={cx('text')}>{data.startup[startupItem0].text}</div>
                </div>
                :
                <dl>
                  <dt>STARTUP</dt>
                  <dd>SELECT POST</dd>
                </dl>
              }
            </div>
            <div className={cx('startupSelect','center')} onClick={(cate) => this.handlePopup("startup2")}>
              { startupItem1 >= 0 ?
              <div className={cx('post')}>
                <div className={cx('img')}><img src={data.startup[startupItem1].img} alt="img"/></div>
                <div className={cx('subTitle')}>{data.startup[startupItem1].ftitle}</div>
                <div className={cx('text')}>{data.startup[startupItem1].text}</div>
              </div>
              :
              <dl>
                <dt>STARTUP</dt>
                <dd>SELECT POST</dd>
              </dl>
              }
            </div>
            <div className={cx('startupSelect')} onClick={(cate) => this.handlePopup("startup3")}>
              { startupItem2 >= 0 ?
                <div className={cx('post')}>
                  <div className={cx('img')}><img src={data.startup[startupItem2].img} alt="img"/></div>
                  <div className={cx('subTitle')}>{data.startup[startupItem2].ftitle}</div>
                  <div className={cx('text')}>{data.startup[startupItem2].text}</div>
                </div>
                :
              <dl>
                <dt>STARTUP</dt>
                <dd>SELECT POST</dd>
              </dl>
              }
            </div>
          </div>
          <div className={cx('dataMagazine')}>
            <div className={cx('inputText')}>
              <input type="text" placeholder="Data-title" />
            </div>
              <div className={cx('dataSelect')} onClick={(cate) => this.handlePopup("data")}>
                { dataItem >= 0 ?
                  <div className={cx('dataWrapper')}>
                    <div className={cx('search')}>
                      <div className={cx('searchInput')}>
                        <input
                          name="keyword"
                          placeholder="search"
                          autoComplete="off"
                          disabled
                          />
                      </div>
                    </div>
                    <div className={cx('chartContainer')}>
                      <Line
                        data={this.state.chartData}
                        options={options}
                        />
                    </div>
                  </div>
                  :
                <dl>
                  <dt>DATA</dt>
                  <dd>SELECT POST</dd>
                </dl>
                }
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
const mapStateToProps = (state) => ({
  user: state.login
});
export default connect(mapStateToProps)(AddMagazine);
