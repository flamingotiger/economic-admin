import React,{ Component } from 'react';
import styles from './NewsTemplate.scss';
import classNames from 'classnames/bind';
import update from 'immutability-helper';
//react-datepicker
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { putApi, postApi } from '../../../api';

const cx = classNames.bind(styles);

class DateBtn extends React.Component {
  //Date button style (react-datepicker)
  render () {
    return (
      <div
        className={cx('addDate')}
        onClick={this.props.onClick}>
        {this.props.value ? this.props.value : "DATE"}
      </div>
    )
  }
}
class NewsTemplate extends Component{
  constructor(props){
    super(props);
    this.state={
      loading:false,
      file:[],
      imagePreviewUrl:this.props.news? [this.props.news.img, this.props.news.img1, this.props.news.img2] : [],
      f_title:'',
      f_text:'',
      f_source:'',
      e_title:'',
      e_text:'',
      e_source:'',
      calendarDate:'DATE',
      addEnglish:true,
      startDate:moment(),
      value:''
    }
  }
  //AddEnglish
  addEnglish = () => { this.setState({ addEnglish: !this.state.addEnglish})}
  //UploadData
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let idx = e.target.getAttribute('data-type')
    /*
    const formData = new FormData();
    formData.append('image', file);
    axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
      header:{"Content-type": "multipart / form-data",
      },
      //업로드 진행
      onUploadProgress: progressEvent => {
        console.log(progressEvent.loaded / progressEvent.total)
      }
    }).then(res => res)
    */
    reader.onloadend = () => {
      const { file, imagePreviewUrl } = this.state;
      if(imagePreviewUrl.length >= 3){
        let files = update(file, { [idx]: {$set: file} });
        let imgUrl = update(imagePreviewUrl,{ [idx]: {$set: reader.result} });
        this.setState({ file: files, imagePreviewUrl: imgUrl });
      }else{
        let files = update(file, {$push: [file]});
        let imgUrl = update(imagePreviewUrl, {$push: [reader.result]});
        this.setState({ file: files, imagePreviewUrl: imgUrl });
      }
    }
    reader.readAsDataURL(file)
  }
  imagePreviewUrl = (idx) => {
    let {imagePreviewUrl} = this.state;
    if (imagePreviewUrl) return <img src={imagePreviewUrl[idx]} alt=""/>
  }
  newsChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  //Calendar
  onClickDay = (value) => this.setState({calendarDate: String(value)});
  handleChange = (date) => this.setState({ startDate: date});
  handleChangeRaw(value) {
    if(value === "tomorrow") {
      const tomorrow = moment().add(1, "day")
      this.handleChange(tomorrow)
    }
  }
  //Api 데이터입력
  handleSubmit(e){
    e.preventDefault();
    const { f_title, f_text, f_source,
       e_title, e_text, e_source, calendarDate, imagePreviewUrl } = this.state;
    const data = {
      "img": imagePreviewUrl[0],
      "img1": imagePreviewUrl[1],
      "img2": imagePreviewUrl[2],
      "f_title" :  f_title,
      "f_text" :  f_text,
      "f_source" :  f_source,
      "e_title" :  e_title,
      "e_text" :  e_text,
      "e_source" :  e_source,
      "calendarDate" :  calendarDate
    }
    if(!this.props.news){//데이터가 입력이 되어있었는지 확인 없으면 post
      //데이터 추가 URL + 파라미터
      postApi(data)
      .then(res => console.log(res))
    }else if(this.props.news){
      //데이터 업데이트 수정 URL + 파라미터
      const params = this.props.idx;
      putApi( params , data )
      .then(res => console.log(res))
    }else{
      console.log('api서버 연동해주세요')
    }
  }
  //Getapi
  componentDidMount(){
    if(this.props.news){
      this.getnews();
    }else{
      this.setState({loading:true})
    }
  }
  getnews = () => {
    const getNews = this.props.news;
    this.setState({
      img1:getNews.img1,
      img2:getNews.img2,
      img3:getNews.img3,
      f_title:getNews.f_title,
      f_text:getNews.f_text,
      f_source:getNews.f_source,
      e_title:getNews.e_title,
      e_text:getNews.e_text,
      e_source:getNews.e_source,
      calendarDate:getNews.calendarDate,
      loading:true
    })
  }
  render(){
    const {loading} = this.state
    if(!loading){
      return null
    }
    const templateForm = (lang) => (
      <div className={cx('templateWrapper')}>
        <div className={cx('inputText')}>
          <input
            type="text"
            onChange={(e) => this.newsChange(e)}
            placeholder="TITLE"
            value={lang? f_title : e_title}
            name={lang? "f_title" : "e_title"}
            />
        </div>
        <div className={cx('textArea')}>
          <textarea
            onChange={(e) => this.newsChange(e)}
            placeholder="TEXT"
            value={lang? f_text : e_text}
            name={lang? "f_text" : "e_text"}
          >
          </textarea>
        </div>
        <div className={cx('sourceInput')}>
          <input
            type="text"
            onChange={(e) => this.newsChange(e)}
            placeholder="SOURCE"
            value={lang? f_source : e_source}
            name={lang? "f_source" : "e_source"}
            />
        </div>
      </div>
    )
    const {f_title, f_text, f_source, e_title, e_text, e_source} = this.state;
    console.log(this.state)
    return (
      <div className={cx('template')}>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <div className={cx('title')}>{(this.props.addvalue).toUpperCase()}</div>
          <div className={cx('upLoadWrapper')}>
            <div className={cx('fileUpLoads')}>
              <div className={cx('fileUpLoad')}>
                <input
                  type="file"
                  name="img1"
                  onChange={(e)=>this.handleImageChange(e)}
                  accept='image/*'
                  data-type="0"
                  />
                  {this.imagePreviewUrl(0)}
              </div>
              <div className={cx('fileUpLoad')}>
                <input
                  type="file"
                  name="img2"
                  onChange={(e)=>this.handleImageChange(e)}
                  accept='image/*'
                  data-type="1"
                  />
                {this.imagePreviewUrl(1)}
              </div>
              <div className={cx('fileUpLoad')}>
                <input
                  type="file"
                  name="img3"
                  onChange={(e)=>this.handleImageChange(e)}
                  accept='image/*'
                  data-type="2"
                  />
                {this.imagePreviewUrl(2)}
              </div>
            </div>
            <div className={cx('utilSelect')}>
              <div className={cx('addEnglish')} onClick={this.addEnglish}>
                <div className={cx('englishBtn')}></div><span>{this.state.addEnglish ? "ADD ENGLISH" : "FRENCH"}</span>
              </div>
                <select className={cx('selectList')} defaultValue="SELECT">
                    <option value="">CATEGORY</option>
                    <option value="1">ECONOMIC</option>
                    <option value="2">CATE</option>
                </select>
                <DatePicker
                  customInput={<DateBtn />}
                  dateFormat="YYYY-MM-DD"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  onChangeRaw={(e) => this.handleChangeRaw(e.target.value)}
                  minDate={moment()}
                  maxDate={moment().add(30, "days")}
                />
            </div>
          </div>
          {this.state.addEnglish ?
            templateForm(true)
           : templateForm(false)
          }
          <div className={cx('publish')}>
            <div className={cx('text')}>MODIFIÉ  3j</div>
            <button type="submit" >PUBLISH</button>
            <div className={cx('deleteBtn')}><img src="https://www.simuladordeinvestimentos.com/images/clear.png" alt="deleteBtn"/></div>
          </div>
        </form>
      </div>
    )
  }
}

export default NewsTemplate;
