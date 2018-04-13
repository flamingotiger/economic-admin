import React,{Component} from 'react';
import styles from './NewsTemplate.scss';
import classNames from 'classnames/bind';
import update from 'immutability-helper';
//import Calendar from 'react-calendar/dist/entry.nostyle';
import Calendar from 'react-calendar';
import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
// import 'react-datepicker/dist/react-datepicker.css';

const cx = classNames.bind(styles);

class NewsTemplate extends Component{
  constructor(props){
    super(props);
    this.state={
      file:[],
      imagePreviewUrl:[],
      title:'',
      text:'',
      source:'',
      calendar:false,
      calendarDate:'DATE',
      getApi:[],
      files:[]
      //startDate:moment()
    }
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //UploadData
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let idx = e.target.getAttribute('data-type')
    reader.onloadend = () => {
      if(this.state.file.length >= 3){
        let files = update(this.state.file, { [idx]: {$set: file} });
        let imgUrl = update(this.state.imagePreviewUrl,{ [idx]: {$set: reader.result} });
        this.setState({ file: files, imagePreviewUrl: imgUrl });
      }else{
        let files = update(this.state.file, {$push: [file]});
        let imgUrl = update(this.state.imagePreviewUrl, {$push: [reader.result]});
        this.setState({ file: files, imagePreviewUrl: imgUrl });
      }
    }
    reader.readAsDataURL(file)
  }
  imagePreviewUrl = (idx) => {
    let {imagePreviewUrl} = this.state;
    if (imagePreviewUrl) return <img src={imagePreviewUrl[idx]} alt=""/>
  }
  newsTitle = (e) => this.setState({title:e.target.value})
  newsText = (e) => this.setState({text:e.target.value})
  newsSource = (e) => this.setState({source:e.target.value})
  //Calendar
  toggleCalendar(){this.setState({calendar:!this.state.calendar})}
  onClickDay = (value) => this.setState({calendarDate: String(value), calendar:!this.state.calendar})
  handleChange(date) {this.setState({ startDate: date });
  }
  //api
  componentDidMount(){
      //처음 실행시 데이터 URL + 파라미터
      if(false){
      //파라미터 받은것이 있는지
      axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then( response => this.setState({ getApi:response.data }) )
      .catch( error => { console.log(error) } );
      }
  }
  handleSubmit(e){
    e.preventDefault();
    const { file, imagePreviewUrl, title, text, source, calendarDate} = this.state;
    //데이터가 입력이 되어있는지
    if(false){
      //데이터 추가 URL + 파라미터
      axios.post('https://jsonplaceholder.typicode.com/posts', {
        imagePreviewUrl:imagePreviewUrl,
        file:file,
        title:title,
        text:text,
        source:source,
        calendarDate:calendarDate
      })
      .then(res => console.log(res))
      .catch( error => { console.log(error) } );
    }else if(false){
      //데이터 업데이트 수정 URL + 파라미터
      axios.put('/url입력', {
        imagePreviewUrl:imagePreviewUrl,
        file:file,
        title:title,
        text:text,
        source:source,
        calendarDate:calendarDate
      })
      .then(res => res)
      .catch( error => { console.log(error) } );
    }else{
      console.log('api서버 연동해주세요')
    }
  }
  render(){
    //api 데이터들 console.log(this.state.getApi)
    return (
      <div className={cx('template')}>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <div className={cx('title')}>{(this.props.addvalue).toUpperCase()}</div>
          <div className={cx('upLoadWrapper')}>
            <div className={cx('fileUpLoads')}>
              <div className={cx('fileUpLoad')}><input type="file" name="img1" onChange={(e)=>this.handleImageChange(e)} accept='image/*' data-type="0"/>{this.imagePreviewUrl(0)}</div>
              <div className={cx('fileUpLoad')}><input type="file" name="img2" onChange={(e)=>this.handleImageChange(e)} accept='image/*' data-type="1"/>{this.imagePreviewUrl(1)}</div>
              <div className={cx('fileUpLoad')}><input type="file" name="img3" onChange={(e)=>this.handleImageChange(e)} accept='image/*' data-type="2"/>{this.imagePreviewUrl(2)}</div>
            </div>
            <div className={cx('utilSelect')}>
              <button className={cx('addEnglish')}><div className={cx('englishBtn')}></div><span>ADD ENGLISH</span></button>
                <select className={cx('selectList')} defaultValue="SELECT">
                    <option value="">SELECT</option>
                    <option value="1">SUBTITLE1</option>
                    <option value="2">SUBTITLE2</option>
                </select>
                {/* 일단 보류
                <DatePicker
                  dateFormat="YYYY-MM-DD"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
                  minDate={moment()}
                  maxDate={moment().add(30, "days")}
                />*/}
              <div className={cx('addDate')}><button onClick={this.toggleCalendar}>{this.state.calendarDate}</button></div>
              <Calendar
                className={this.state.calendar ? cx('calendar', 'on') : cx('calendar')}
                onClickDay={this.onClickDay}
                />
            </div>
          </div>
          <div className={cx('templateWrapper')}>
            <div className={cx('inputText')}><input type="text" onChange={(e) => this.newsTitle(e)} placeholder="TITLE" value={this.state.title}/></div>
            <div className={cx('textArea')}>
              <textarea onChange={(e) => this.newsText(e)} placeholder="TEXT" value={this.state.text}></textarea>
            </div>
            <div className={cx('sourceInput')}><input type="text" onChange={(e) => this.newsSource(e)} placeholder="SOURCE" value={this.state.source}/></div>
          </div>
          <div className={cx('publish')}>
            <div className={cx('text')}>MODIFIÉ  3j</div>
            <button type="submit">PUBLISH</button>
            <div className={cx('deleteBtn')}><img src="https://www.simuladordeinvestimentos.com/images/clear.png" alt="deleteBtn"/></div>
          </div>
        </form>
      </div>
    )
  }
}

export default NewsTemplate;
