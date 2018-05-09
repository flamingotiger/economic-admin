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
  componentWillUpdate(nextProps){
    if(nextProps.value !== this.props.value){
      this.props.dateValue(nextProps.value);
    }
  }

  render () {
    return (
      <div
        className={cx('addDate')}
        onClick={this.props.onClick}
        >
        { this.props.value ? this.props.value : "DATE" }
      </div>
    )
  }
}

class NewsTemplate extends Component{
  constructor(props){
    super(props);
    this.state={
      loading:false,
      file:[null, null, null],
      imagePreviewUrl:[null, null, null],
      calendarDate:"DATE",
      addEnglish:true,
      startDate:moment(),

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

  handleImageChange = async (e) => {
    let file = e.target.files[0];
    let idx = e.target.getAttribute('data-type')
    e.preventDefault();
    //await ImageApi.deleteImage(this.state.images[idx]).then(res => console.log(res)).catch(err => console.log(err))
    await this.getCount(idx, file);
    await this.imageGetId(file);
  }

  //이미지 변경시 고유번호 저장
  imageGetId = (file) => {
    const formData = new FormData();
    let idx = this.state.file.findIndex((fileName) => fileName === file)
    formData.append("image" , this.state.file[idx])
    const { imagePreviewUrl, images } = this.state;
    ImageApi.addImage(formData).then(res => {
        if(images.length >=3 || imagePreviewUrl.length >= 3 || this.state.file.length >= 3 ){
          let image = update(this.state.images, { [idx]: { $set: res.data.image._id} });
          this.setState({ images: image })
        }else{
          let image = update(this.state.images, { $push:[res.data.image._id] } );
          this.setState({ images: image })
        }
    })
  }

  //이미지 변경시 파일 저장
  getCount = (idx, file) => {
    let reader = new FileReader();
    const { imagePreviewUrl, images } = this.state;
    if(images.length >= 3 || imagePreviewUrl.length >= 3 || this.state.file.length >= 3 ){
      let files = update(this.state.file, { [idx]: {$set: file} });
      this.setState({ file: files })
    }
    reader.onloadend = () => {
      if(images.length >= 3 || imagePreviewUrl.length >= 3 || this.state.file.length >= 3 ){
        let imgUrl = update(imagePreviewUrl, { [idx]: {$set: reader.result} });
        this.setState({ imagePreviewUrl: imgUrl });
      }
    }
    reader.readAsDataURL(file)
    let index = this.state.file.findIndex((fileName) => fileName === file)
  }

  newsChange = (e) => { this.setState({ [e.target.name]: e.target.value }); }

  //Datepicker
  onClickDay = (value) => this.setState({calendarDate: String(value)});

  handleChange = (date) => this.setState({ startDate: date});


  dateValue = (value) => { this.setState({ date: value }) }

  //글 작성 혹은 수정
  handleSubmit = async (e) => {
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
    if(this.state.news === undefined){
      //뉴스 작성API
      await NewsApi.addNews(data).then(res => console.log(res))

    }else{
      //뉴스 수정API
      const params = this.props.idx;
      await NewsApi.updateNews( params , data ).then(res => console.log(res))
    }
    //완료후 페이지 이동
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
    //데이터 및 쿠키 GET
    await this.lang()
    await NewsApi.getNews(this.props.idx).then(res => this.setState({ news: res.data.news}))
    if(this.state.news !== undefined){
      await this.getnewsData();
      await SectorApi.getSector(this.state.sector).then(res => this.setState({sectorName: res.data.sector.name}))
    }else{
      await this.setState({ loading:true })
    }
    //최종 PUBLISH 날짜
    if(this.state.news !== undefined){
      let day = moment(this.state.news.date, "YYYY-MM-DD").fromNow();
      let publish = day.replace(" year", "년").replace(" months", "개월").replace(" day", "일").replace(" ago", "전");
      let number = publish.replace(/\d+(?= 일)/,"");
      if(number <= 7){
        this.setState({ publishDate: publish })
      }
    }
    //이미지 불러오기
    this.state.images.map( (imageIdx, i) =>
      ImageApi.viewThumbnailImage(imageIdx, 256).then(res => {
          const prevImg = update(this.state.imagePreviewUrl, { [i]: { $set:res.config.url } })
          this.setState({ imagePreviewUrl: prevImg})
      })
    )
  }

  //news배열안에 있는 데이터 분류
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

  imagePreviewUrl = (idx) => {
    const { imagePreviewUrl } = this.state;
    if (imagePreviewUrl) return <img src={ imagePreviewUrl[idx] } alt=""/>
  }

  handleSector = async (e) => {
    await this.setState({ sectorName:e.target.value})

    if(this.state.news === undefined){
      const name = { "name": this.state.sectorName }
      await SectorApi.addSector(name).then(res => this.setState({ sector:res.data.sector._id }))
    }else{
      const name = { "name": this.state.sectorName }
      await SectorApi.updateSector(this.state.sector, name).then(res => this.setState({sector:res.data.sector._id }))
    }
  }

  componentDidUpdate(prevProps, prevState){
    //Add 페이지에서 AddListBtn 클릭시에
    //idx 여부에 다라 초기화
    //이것으로 post할지 put될지 결정
      if(prevProps.idx !== this.props.idx){
        this.setState({
          file:[],
          imagePreviewUrl:[],
          news:[],
          sector:"",
          title:"",
          content:"",
          images:[],
          sources:"",
          date:""
        })
      }
  }

  clearData = () => {
    this.setState({
      file:[],
      imagePreviewUrl:[],
      news:[],
      sector:"",
      title:"",
      content:"",
      images:[],
      sources:"",
      date:""
    })
  }

  render(){
    console.log(this.state)
    const { loading } = this.state
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
                  customInput={<DateBtn dateValue={(value) => this.dateValue(value)}/>}
                  dateFormat="YYYY-MM-DD"
                  selected={this.state.startDate}
                  onChange={this.handleChange}
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
