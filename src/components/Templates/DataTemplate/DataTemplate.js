import React,{Component} from 'react';
import styles from './DataTemplate.scss';
import classNames from 'classnames/bind';
import update from 'immutability-helper';
import { putApi, postApi } from '../../../api';
import axios from 'axios';

const cx = classNames.bind(styles);

class DataTemplate extends Component{
  constructor(props){
    super(props);
    this.state={
      fontsize:12,
      fontweight:"normal",
      lineheight:12,
      addEnglish:true,
      f_title:'',
      f_text:'',
      e_title:'',
      e_text:'',
      file:'',
      imagePreviewUrl:""
    }
    this.fontSizeUp= this.fontSizeUp.bind(this);
    this.fontSizeDown= this.fontSizeDown.bind(this);
    this.fontBold= this.fontBold.bind(this);
  }
  fontSizeUp(){
    if(this.state.fontsize < 30){
      this.setState((prevState) => ({fontsize: prevState.fontsize + 2, lineheight: prevState.lineheight + 2}));
    }
  }
  fontSizeDown(){
    if(this.state.fontsize > 10){
      this.setState((prevState) => ({fontsize: prevState.fontsize - 2, lineheight: prevState.lineheight - 2}));
    }
  }
  fontBold(){
    if(this.state.fontweight === "normal"){
      this.setState({ fontweight:"bold" })
    }else{
      this.setState({ fontweight:"normal" })
    }
  }
  //AddEnglish
  addEnglish = () => { this.setState({ addEnglish: !this.state.addEnglish})}
  //Getapi
  componentDidMount(){
    if(this.props.data){
      this.getData();
    }else{
      this.setState({loading:true})
    }
  }
  dataChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
  }
  getData = () => {
    const data = this.props.data;
    this.setState({
      imagePreviewUrl:data.banner,
      f_title:data.f_title,
      f_text:data.f_text,
      e_title:data.e_title,
      e_text:data.e_text,
      loading:true
    })
  }
  handleSubmit(e){
    e.preventDefault();
    const { imagePreviewUrl } = this.state;
    const data = {
      "banner": imagePreviewUrl,
    }
    if(!this.props.data){//데이터가 입력이 되어있었는지 확인 없으면 post
      //데이터 추가 URL + 파라미터
      postApi(data)
      .then(res => console.log(res))
    }else if(this.props.data){
      //데이터 업데이트 수정 URL + 파라미터
      const params = this.props.idx;
      putApi( params , data )
      .then(res => console.log(res))
    }else{
      console.log('api서버 연동해주세요')
    }
  }
  handleUpload = (e) => {
    //let file = e.target.files[0];
    let formdata = new FormData();
    formdata.append("data", "file")
    axios.post('https://localhost:3001/data',formdata,{header:{"Content-type":"multipart/form-data"}}).then(res => console.log(res))
  }
  handleImageChange(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    //let idx = e.target.getAttribute('data-type');
    reader.onloadend = () => {
      const { file, imagePreviewUrl } = this.state;
      let files = update(file, {$set: [file]});
      let imgUrl = update(imagePreviewUrl, {$set: [reader.result]});
      this.setState({ file: files, imagePreviewUrl: imgUrl });
    }
    reader.readAsDataURL(file)
  }
  render(){
    const {loading} = this.state
    if(!loading){
      return null
    }
    const textFontSize = {
      fontSize: this.state.fontsize,
      fontWeight: this.state.fontweight,
      lineHeight: this.state.lineheight + 'px'
    }
    const defaultBackgroundImg = {
      backgroundImage:"url(/assets/icon-excel.svg)",
      backgroundSize:"119px 78px"
    }
    const backgroundImg = {
      backgroundImage:`url(${this.state.imagePreviewUrl})`,
      backgroundSize:"100% 100%"
    }
    const templateForm = (lang) => (
        <div className={cx('templateWrapper')}>
          <div className={cx('inputText')}>
            <input
              type="text"
              placeholder="TITLE"
              onChange={(e) => this.dataChange(e)}
              value={lang? f_title : e_title}
              name={lang? "f_title" : "e_title"}
              />
          </div>
          <div className={cx('textArea')}>
            <textarea
              placeholder="TEXT"
              style={textFontSize}
              onChange={(e) => this.dataChange(e)}
              value={lang? f_text : e_text}
              name={lang? "f_text" : "e_text"}
            ></textarea>
              <div className={cx('textUtil')}>
                <div className={cx('utilImg')}>
                  <input type="file"/><span>IMAGE</span>
                </div>
                <div onClick={this.fontSizeUp}>A+</div>
                <div onClick={this.fontSizeDown}>A-</div>
                <div className={cx('utilBold')} onClick={this.fontBold}>BOLD</div>
              </div>
          </div>
        </div>
      )
    const { f_title, f_text, e_title, e_text } = this.state;
    return (
      <div className={cx('template')}>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <div className={cx('title')}>{(this.props.addvalue).toUpperCase()}</div>
          <div className={cx('upLoadWrapper')} >
            <div className={cx('fileUpLoads')}>
              <div className={cx('fileUpLoad')}
                style={this.state.imagePreviewUrl === "" ? defaultBackgroundImg : backgroundImg}
              >
                <input
                  type="file"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={(e) => this.handleUpload(e)}
                />
                <span>ADD EXCEL</span>
              </div>
            </div>
            <div className={cx('utilSelect')}>
              <div className={cx('addEnglish')} onClick={this.addEnglish}>
                <div className={cx('englishBtn')}></div><span>{this.state.addEnglish ? "ADD ENGLISH" : "FRENCH"}</span>
              </div>
              <div className={cx('addImg')}>
                <input
                type="file"
                accept="image/*"
                onChange={(e) => this.handleImageChange(e)}
                />
                ADD IMAGE
              </div>
            </div>
          </div>
          {this.state.addEnglish ?
            templateForm(true)
            : templateForm(false)
          }
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

export default DataTemplate;
