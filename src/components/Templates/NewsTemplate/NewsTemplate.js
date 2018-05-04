import React, { Component } from 'react';
import styles from './NewsTemplate.scss';
import classNames from 'classnames/bind';
import update from 'immutability-helper';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { NewsApi, ImageApi } from '../../../api';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);

class DateBtn extends Component {

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
      //imagePreviewUrl:this.props.news? [this.props.news.img, this.props.news.img1, this.props.news.img2] : [],
      file:[],
      imagePreviewUrl:[],
      f_title:"",
      f_text:"",
      f_source:"",
      e_title:"",
      e_text:"",
      e_source:"",
      calendarDate:"DATE",
      addEnglish:true,
      startDate:moment(),
      value:"",

      news:[],
      publishDate:"",
      sector:"",
      title:"",
      content:"",
      images:[],
      sources:"",
      date:"",

    }
  }

  getCount = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    let idx = e.target.getAttribute('data-type')
    if(this.state.images.length >= 3){
      let files = update(this.state.file, { [idx]: {$set: file} });
      this.setState({ file: files })
    }else{
      let files = update(this.state.file, {$push: [file]});
      this.setState({ file: files })
    }
    reader.onloadend = () => {
      const { images, imagePreviewUrl } = this.state;
          if(images.length >= 3){
            let imgUrl = update(imagePreviewUrl,{ [idx]: {$set: reader.result} });
            this.setState({ imagePreviewUrl: imgUrl });
          }else{
            let imgUrl = update(imagePreviewUrl, {$push: [reader.result]});
            this.setState({ imagePreviewUrl: imgUrl });
          }
        }
    reader.readAsDataURL(file)
  }

  handleImageChange = async (e) => {
    e.preventDefault();
    let idx = e.target.getAttribute('data-type')
    await this.getCount(e);
    const formData = new FormData();
    await formData.append("image" , this.state.file[idx]);
    await ImageApi.addImage(formData).then(res => {
        if(this.state.images.length >= 3){
          let images = update(this.state.image, { [idx]: {$set: res.data.image._id} });
          this.setState({ image: images })
        }else{
          let images = update(this.state.file, {$push: [res.data.image._id]});
          this.setState({ image: images })
        }
    })
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

  onClickDay = (value) => this.setState({calendarDate: String(value)});

  handleChange = (date) => this.setState({ startDate: date});

  handleChangeRaw(value) {
    if(value === "tomorrow") {
      const tomorrow = moment().add(1, "day")
      this.handleChange(tomorrow)
    }
  }

  handleSubmit(e){
    e.preventDefault();
    const { sector, title, content, images, sources, date } = this.state;
    const data = {
      "sector":sector,
      "title":title,
      "content":content,
      "images":images,
      "sources":sources,
      "date":date
    }
    if(!this.state.news){
      NewsApi.addNews(data)
      .then(res => console.log(res))
    }else{
      const params = this.props.idx;
      NewsApi.updateNews( params , data )
      .then(res => console.log(res))
    }
    //페이지 이동시키자
  }

  lang = () => {
    if(!Cookies.get('lang')){
      Cookies.set('lang','fr')
    }
  }

  addEnglish = () => {
    if(Cookies.get('lang') === 'fr'){
      Cookies.set('lang','en')
    }else{
      Cookies.set('lang','fr')
    }
    this.setState({ addEnglish: !this.state.addEnglish})
  }

  async componentDidMount(){
    await this.lang()
    await NewsApi.getNews(this.props.idx).then(res => this.setState({ news: res.data.news}))
    if(this.state.news){
      let day = moment(this.state.news.date, "YYYY-MM-DD").fromNow();
      let publish = day.replace(" year", "년").replace(" months", "개월").replace(" day", "일").replace(" ago", "전");
      let number = publish.replace(/\d+(?= 일)/,"");
      if(number <= 7){
        this.setState({ publishDate: publish })
      }
    }
    if(this.state.news){
      this.getnewsData();
    }else{
      await this.setState({ loading:true })
    }
  }

  clearData = () => {
    this.setState({
      sector:"",
      title:"",
      content:"",
      images:[],
      sources:"",
      date:"",
    })
  }

  getnewsData = () => {
    const newsData = this.state.news;
    this.setState({
      sector:newsData.sector,
      title:newsData.title,
      content:newsData.content,
      images:newsData.images,
      sources:newsData.sources,
      date:newsData.date,
      loading:true
    })
  }

  render(){
    console.log(this.props.idx)
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
            value={ title }
            name="title"
            />
        </div>
        <div className={cx('textArea')}>
          <textarea
            onChange={(e) => this.newsChange(e)}
            placeholder="TEXT"
            value={ content }
            name="content"
          >
          </textarea>
        </div>
        <div className={cx('sourceInput')}>
          <input
            type="text"
            onChange={(e) => this.newsChange(e)}
            placeholder="SOURCE"
            value={ sources }
            name="sources"
            />
        </div>
      </div>
    )
    const { sector, title, content, images, sources, date, publishDate } = this.state;
    return (
      <div className={cx('template')}>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <div className={cx('title')}>{(this.props.addvalue).toUpperCase()}</div>
          <div className={cx('upLoadWrapper')}>
            <div className={cx('fileUpLoads')}>
              <div className={cx('fileUpLoad')}>
                <input
                  type="file"
                  onChange={(e)=>this.handleImageChange(e)}
                  accept='image/*'
                  data-type="0"
                  />
                  {this.imagePreviewUrl(0)}
              </div>
              <div className={cx('fileUpLoad')}>
                <input
                  type="file"
                  onChange={(e)=>this.handleImageChange(e)}
                  accept='image/*'
                  data-type="1"
                  />
                {this.imagePreviewUrl(1)}
              </div>
              <div className={cx('fileUpLoad')}>
                <input
                  type="file"
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
            { templateForm() }
          <div className={cx('publish')}>
            <div className={cx('text')}>{publishDate}</div>
            <button type="submit" >PUBLISH</button>
            <div className={cx('deleteBtn')} onClick={this.clearData}><img src="https://www.simuladordeinvestimentos.com/images/clear.png" alt="deleteBtn"/></div>
          </div>
        </form>
      </div>
    )
  }
}

export default NewsTemplate;
