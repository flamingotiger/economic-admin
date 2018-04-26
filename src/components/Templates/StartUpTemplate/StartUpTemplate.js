import React,{Component} from 'react';
import styles from './StartUpTemplate.scss';
import classNames from 'classnames/bind';
import update from 'immutability-helper';
import { putApi, postApi } from '../../../api';
import axios from 'axios';

const cx = classNames.bind(styles);

class StartUpTemplate extends Component{
  constructor(props){
    super(props);
    this.state={
      fontsize:12,
      fontweight:"normal",
      lineheight:12,
      loading:false,
      file:[],
      imagePreviewUrl:this.props.startup? [this.props.startup.img, this.props.startup.img1, this.props.startup.img2] : [],
      addEnglish:true,
      startup:[],
      chapter:[],
      chapterfilter:[this.props.startup? {id:1} : 1],
      selectChapter:0,
      f_title1:'aa', f_text1:'', e_title1:'', e_text1:'',
      f_title2:'', f_text2:'', e_title2:'', e_text2:'',
      f_title3:'', f_text3:'', e_title3:'', e_text3:'',
      f_title4:'', f_text4:'', e_title4:'', e_text4:'',
      f_title5:'', f_text5:'', e_title5:'', e_text5:'',
      f_title6:'', f_text6:'', e_title6:'', e_text6:'',
      f_title7:'', f_text7:'', e_title7:'', e_text7:'',
      f_title8:'', f_text8:'', e_title8:'', e_text8:'',
      f_title9:'', f_text9:'', e_title9:'', e_text9:'',
      f_title10:'', f_text10:'', e_title10:'', e_text10:'',
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
  chapterSelect = (e) => {
    if(this.props.startup){
      const chapterFilter = this.state.chapter.filter(chapterId => chapterId.id <= e.target.value)
      this.setState({chapterfilter:chapterFilter, selectChapter: e.target.value})
    }else{
      const value = Number(e.target.value);
      var chapterNumber = new Array(value)
      for(let i = 1; i <= value; i++){
       chapterNumber[i - 1] = {id:i};
      }
      this.setState({chapterfilter:update(this.state.chapterfilter,{$set: chapterNumber}) })
    }
  }
  componentDidMount(){
    if(this.props.startup){
      this.setState({chapter:this.props.startup.chapter, startup:this.props.startup, loading:true})
    }else{
      this.setState({loading:true})
    }
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let idx = e.target.getAttribute('data-type')
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
  handleSubmit(e){
    e.preventDefault();
    const {f_title1, f_text1, e_title1, e_text1,
    f_title2, f_text2, e_title2, e_text2,
    f_title3, f_text3, e_title3, e_text3,
    f_title4, f_text4, e_title4, e_text4,
    f_title5, f_text5, e_title5, e_text5,
    f_title6, f_text6, e_title6, e_text6,
    f_title7, f_text7, e_title7, e_text7,
    f_title8, f_text8, e_title8, e_text8,
    f_title9, f_text9, e_title9, e_text9,
    f_title10, f_text10, e_title10, e_text10, imagePreviewUrl} = this.state
    const data = {
      "img": imagePreviewUrl[0],
      "img1": imagePreviewUrl[1],
      "img2": imagePreviewUrl[2],
      "f_title1": f_title1, "f_text1": f_text1, "e_title1": e_title1, "e_text1": e_text1,
      "f_title2": f_title2, "f_text2": f_text2, "e_title2": e_title2, "e_text2": e_text2,
      "f_title3": f_title3, "f_text3": f_text3, "e_title3": e_title3, "e_text3": e_text3,
      "f_title4": f_title4, "f_text4": f_text4, "e_title4": e_title4, "e_text4": e_text4,
      "f_title5": f_title5, "f_text5": f_text5, "e_title5": e_title5, "e_text5": e_text5,
      "f_title6": f_title6, "f_text6": f_text6, "e_title6": e_title6, "e_text6": e_text6,
      "f_title7": f_title7, "f_text7": f_text7, "e_title7": e_title7, "e_text7": e_text7,
      "f_title8": f_title8, "f_text8": f_text8, "e_title8": e_title8, "e_text8": e_text8,
      "f_title9": f_title9, "f_text9": f_text9, "e_title9": e_title9, "e_text9": e_text9,
      "f_title10": f_title10, "f_text10": f_text10, "e_title10": e_title10, "e_text10": e_text10
    }
    const { idx } = this.props;
    if(!this.props.startup){//데이터가 입력이 되어있었는지 확인 없으면 post
      //데이터 추가 URL + 파라미터
      axios.post("http://localhost:3001/add=startup", data).then(res => console.log(res))
    }else if(this.props.startup){
      const formData = new FormData();
      formData.append('imgs', this.state.files);
      //데이터 업데이트 수정 URL + 파라미터
      const params = this.props.idx;
      axios.put(`http://localhost:3001/add=startup/${params}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => console.log(res))
      .then(res => console.log(res))
    }
  }
  //AddEnglish
  addEnglish = () => { this.setState({ addEnglish: !this.state.addEnglish})}
  startupChange = (e) => {
      this.setState({ [e.target.name]: e.target.value});
    }
  render(){
    const textFontSize = {
      fontSize: this.state.fontsize,
      fontWeight: this.state.fontweight,
      lineHeight: this.state.lineheight + 'px'
    }
    const {loading} = this.state
    if(!loading){
      return null
    }
    const chapterItem = (value , i, lang) => {
        return (
      <div className={cx('chapterWrapper')} key={i}>
        <span className={cx('chapterTitle')}>
          CHAPTER{i + 1}
        </span>
        <div className={cx('inputText')}>
          <input
            type="text"
            placeholder="TITLE"
            name={lang? `f_title${value.id}` : `e_title${value.id}`}
            value={lang? this.state['f_title' + value.id] : this.state['e_title' + value.id]}
            onChange={(e) => this.startupChange(e)}
            />
        </div>
        <div className={cx('textArea')}>
          <textarea
            placeholder="TEXT"
            style={textFontSize}
            name={lang? `f_text${value.id}` : `e_text${value.id}`}
            value={lang? this.state['f_text' + value.id] : this.state['e_text' + value.id]}
            onChange={(e) => this.startupChange(e)}
            >
          </textarea>
          <div className={cx('textUtil')}>
            <div className={cx('utilImg')}><input type="file"/><span>IMAGE</span></div>
            <div onClick={this.fontSizeUp}>A+</div>
            <div onClick={this.fontSizeDown}>A-</div>
            <div className={cx('utilBold')} onClick={this.fontBold}>BOLD</div>
          </div>
        </div>
      </div>
      )
    }
    const chapterForm = (lang) => {
      const { chapterfilter, selectChapter }= this.state;
      const { startup }= this.props;
      if(!startup){
        return chapterfilter.map( ( value , i) => chapterItem(value , i, lang) )
      }
      //idx를 가지고 있으면서 선택이 0일때
      else if(Boolean(startup) && selectChapter === 0){
        return this.state.startup.chapter.map( ( value , i) => chapterItem(value , i, lang) )
        //idx를 가지고 있으면서 선택이 1일 이상일대
      }else if(Boolean(startup) && selectChapter >= 1){
        return chapterfilter.map( ( value , i) => chapterItem(value , i, lang) )
      }
    }
    return (
      <div className={cx('template')}>
        <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className={cx('title')}>{(this.props.addvalue).toUpperCase()}</div>
        <div className={cx('upLoadWrapper')}>
          <div className={cx('fileUpLoads')}>
            <div className={cx('fileUpLoad')}>
              <input
                type="file"
                name="img1"
                onChange={(e) => this.handleImageChange(e)}
                accept="image/*"
                data-type="0"
              />
              {this.imagePreviewUrl(0)}
              </div>
            <div className={cx('fileUpLoad')}>
              <input
                type="file"
                name="img2"
                onChange={(e) => this.handleImageChange(e)}
                accept="image/*"
                data-type="1"
              />
              {this.imagePreviewUrl(1)}
              </div>
            <div className={cx('fileUpLoad')}>
              <input
                type="file"
                name="img3"
                onChange={(e) => this.handleImageChange(e)}
                accept="image/*"
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
              <select className={cx('chapter')} onChange={(e) => this.chapterSelect(e)}>
                  <option value="1">N.CHAPTERS</option>
                  <option value="1">CHAPTER1</option>
                  <option value="2">CHAPTER2</option>
                  <option value="3">CHAPTER3</option>
                  <option value="4">CHAPTER4</option>
                  <option value="5">CHAPTER5</option>
                  <option value="6">CHAPTER6</option>
                  <option value="7">CHAPTER7</option>
                  <option value="8">CHAPTER8</option>
                  <option value="9">CHAPTER9</option>
                  <option value="10">CHAPTER10</option>
              </select>
          </div>
        </div>
        {this.state.addEnglish ?
          chapterForm(true)
          : chapterForm(false)
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
export default StartUpTemplate;
