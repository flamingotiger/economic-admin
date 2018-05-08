import React, { Component } from 'react';
import styles from './NewsTemplate.scss';
import classNames from 'classnames/bind';
import update from 'immutability-helper';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { NewsApi, ImageApi, SectorApi } from '../../../api';
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
      file:[],
      imagePreviewUrl:[],
      calendarDate:"DATE",
      addEnglish:true,
      startDate:moment(),
      value:"",

      sectorName:"",
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

  //이미지 변경시 고유번호 저장
  handleImageChange = (e) => {
    e.preventDefault();
    this.getCount(e);
  }
  //이미지 변경시 파일 저장
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

  newsChange = (e) => { this.setState({ [e.target.name]: e.target.value }); }

  //Datepicker
  onClickDay = (value) => this.setState({calendarDate: String(value)});

  handleChange = (date) => this.setState({ startDate: date});

  handleChangeRaw(value) {
    if(value === "tomorrow") {
      const tomorrow = moment().add(1, "day")
      this.handleChange(tomorrow)
    }
  }

  sectorGetId = () => {
    if(!this.state.news){
      const name = { "name":this.state.sectorName }
      SectorApi.addSector(name).then(res => this.setState({ sector:res.data.sector._id }))
    }else{
      const name = { "name":this.state.sectorName }
      SectorApi.updateSector(this.state.sector, name).then(res => this.setState({sector:res.data.sector._id }))
    }
  }

  imageGetId = () => {
    const formData = new FormData();
    formData.append("image" , this.state.file[0])
    this.state.file.map((files, i) => {
      formData.append("image" , files)
      ImageApi.addImage(formData).then(res => {
            if(this.state.images.length >= 3){
              let image = update(this.state.images, { [i]: { $set: res.data.image._id} });
              return this.setState({ images: image })
            }else{
              let image = update(this.state.images, { $push: [res.data.image._id] });
              return this.setState({ images: image })
            }
          })
      })
  }

  deleteImage = () => {
    this.state.images.map(image => ImageApi.deleteImage(image).then(res => console.log(res)))
  }

  //글 작성 혹은 수정
  handleSubmit = async (e) => {
    e.preventDefault();
    const { sector, title, content, images, sources, date } = this.state;
    //이미지
    const data = {
      "sector":sector,
      "title":title,
      "content":content,
      "images":images,
      "sources":sources,
      "date":date
    }
    if(!this.state.news){
      await this.sectorGetId();
      //뉴스 작성API
      await this.imageGetId();
      await NewsApi.addNews(data).then(res => console.log(res))
      await console.log('news:',this.state)
    }else{
      await this.sectorGetId();
      //뉴스 수정API
      await this.deleteImage();
      await this.imageGetId();
      const params = this.props.idx;
      await NewsApi.updateNews( params , data ).then(res => console.log(res))
    }
    //페이지 이동시키자
    this.props.pushPage()
  }

  lang = () => {
    if(!Cookies.get('lang')){
      Cookies.set('lang','fr')
    }
  }

  addEnglish = () => {
    if(Cookies.get('lang') === 'fr'){
      Cookies.set('lang','en')
      NewsApi.getNews(this.props.idx).then(res => this.setState({ news: res.data.news}))
    }else{
      Cookies.set('lang','fr')
      NewsApi.getNews(this.props.idx).then(res => this.setState({ news: res.data.news}))
    }
    this.setState({ addEnglish: !this.state.addEnglish})
  }

  async componentDidMount(){
    await this.lang()
    await NewsApi.getNews(this.props.idx).then(res => this.setState({ news: res.data.news}))
    //최종 퍼블리싱 날짜
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
      await SectorApi.getSector(this.state.sector).then(res => this.setState({sectorName: res.data.sector.name}))
    }else{
      await this.setState({ loading:true })
    }

    //이미지 불러오기
    this.state.images.map( (imageIdx) =>
      ImageApi.viewThumbnailImage(imageIdx, 256).then(res => {
          const prevImg = update(this.state.imagePreviewUrl,{ $push:[res.config.url] })
          this.setState({ imagePreviewUrl: prevImg})
      })
    )
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

  imagePreviewUrl = (idx) => {
    const { imagePreviewUrl } = this.state;
    if (imagePreviewUrl) return <img src={ imagePreviewUrl[idx] } alt=""/>
  }

  handleSector = (e) => { this.setState({ sectorName:e.target.value}) }

  render(){

    const {loading} = this.state
    if(!loading){
      return null
    }
    const templateForm = () => (
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
    const { title, content, sources, publishDate } = this.state;
    return (
      <div className={cx('template')}>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <div className={cx('title')}>{(this.props.addvalue).toUpperCase()}</div>
          <div className={cx('upLoadWrapper')}>
            <div className={cx('fileUpLoads')}>
              <div className={cx('fileUpLoad')}>
                <input
                  type="file"
                  onChange={ (e) => this.handleImageChange(e) }
                  accept='image/*'
                  data-type="0"
                  name="files"
                  />
                  {this.imagePreviewUrl(0)}
              </div>
              <div className={cx('fileUpLoad')}>
                <input
                  type="file"
                  onChange={ (e) => this.handleImageChange(e) }
                  accept='image/*'
                  data-type="1"
                  name="files"
                  />
                {this.imagePreviewUrl(1)}
              </div>
              <div className={cx('fileUpLoad')}>
                <input
                  type="file"
                  onChange={ (e) => this.handleImageChange(e) }
                  accept='image/*'
                  data-type="2"
                  name="files"
                  />
                {this.imagePreviewUrl(2)}
              </div>
            </div>
            <div className={cx('utilSelect')}>
              <div className={cx('addEnglish')} onClick={this.addEnglish}>
                <div className={cx('englishBtn')}></div><span>{this.state.addEnglish ? "ADD ENGLISH" : "FRENCH"}</span>
              </div>
                <select className={cx('selectList')} onChange={(e) => this.handleSector(e)}>
                    <option value="">CATEGORY</option>
                    <option value="Economy">ECONOMY</option>
                    <option value="Society">SOCIETY</option>
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
