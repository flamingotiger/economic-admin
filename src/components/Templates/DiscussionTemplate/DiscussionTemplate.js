import React,{Component} from 'react';
import styles from './DiscussionTemplate.scss';
import classNames from 'classnames/bind';
import { putApi, postApi } from '../../../api';
import update from 'immutability-helper';
import Cookies from 'js-cookie';
import { DiscussionApi } from '../../../api';

const cx = classNames.bind(styles);

class DiscussionTemplate extends Component{
  constructor(props){
    super(props);
    this.state={
      fontsize:12,
      fontweight:"normal",
      lineheight:12,
      addEnglish:true,
      select:true,

      file1:undefined,
      file2:undefined,
      imagePreviewUrl1:this.props.discussion? this.props.discussion.img : undefined,
      imagePreviewUrl2:this.props.discussion? this.props.discussion.img1 : undefined,
      image:[],
      title1:"",
      content1:"",
      source1:"",
      title2:"",
      content2:"",
      source2:"",

      textImg:[],
      textImgPrev:[],
    }

  }

  fontSizeUp = () => {
    if(this.state.fontsize < 24){
      this.setState((prevState) => ({fontsize: prevState.fontsize + 6, lineheight: prevState.lineheight + 6}));
    }
  }

  fontSizeDown = () => {
    if(this.state.fontsize > 12){
      this.setState((prevState) => ({fontsize: prevState.fontsize - 6, lineheight: prevState.lineheight - 6}));
    }
  }

  fontBold = () => {
    if(this.state.fontweight === "normal"){
      this.setState({ fontweight:"bold" })
    }else{
      this.setState({ fontweight:"normal" })
    }
  }

  discussionTitle = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  discussionSource = (e) => {
    if(this.state.select){
        this.setState({ source1:e.target.value })
    }else{
        this.setState({ source2:e.target.value })
    }
  }

  selectBox = (e) => {
    if(e.target.value === "CONTRE"){
      this.setState({ select : true })
    }else{
      this.setState({ select : false })
    }
  }

  addEnglish = () => {
    if(Cookies.get('lang') === 'fr'){
      Cookies.set('lang','en')
      DiscussionApi.getDiscussion(this.props.idx).then(res => this.setState({ news: res.data.news}))
    }else{
      Cookies.set('lang','fr')
      DiscussionApi.getDiscussion(this.props.idx).then(res => this.setState({ news: res.data.news}))
    }
    this.setState({ addEnglish: !this.state.addEnglish})
  }

  //이미지
  handleImageChange(e) {
    e.preventDefault();
  }

  imagePreviewUrl = () => {
    let {imagePreviewUrl1, imagePreviewUrl2, select} = this.state;
    if (select) {
      return <img src={imagePreviewUrl1} alt=""/>
    }
    else{
      return <img src={imagePreviewUrl2} alt=""/>
    }
  }

  //Api 데이터입력
  handleSubmit(e){
    e.preventDefault();
    const { title1, content1, source1, title2, content2, source2 } = this.state;
    const data = {
      "title1": title1,
      "content1": content1,
      "source1": source1,
      "title2": title2,
      "content2": content2,
      "source2": source2
    }
    if(!this.props.discussion){
        //데이터가 입력이 되어있었는지 확인 없으면 post
        //데이터 추가 URL + 파라미터
      postApi(data)
      .then(res => console.log(res))
    }else if(this.props.discussion){
      //데이터 업데이트 수정 URL + 파라미터
      const params = this.props.idx;
      putApi( params , data )
      .then(res => console.log(res))
    }else{
      console.log('api서버 연동해주세요')
    }
  }

  componentDidMount(){
    if(this.props.discussion){
      this.getdiscussion();
    }else{
      this.setState({loading:true})
    }
  }

  getdiscussion = () => {
    const getDiscussion = this.props.discussion;
    this.setState({
      title1:getDiscussion.f_title1,
      content1:getDiscussion.f_text1,
      source1:getDiscussion.f_source1,
      title2:getDiscussion.f_title2,
      content2:getDiscussion.f_text2,
      source2:getDiscussion.f_source2,
      calendarDate:getDiscussion.calendarDate,
      loading:true
    })
  }

  handleChange = (e) => {
    this.setState({ textarea: e.target.innerText })
  }

  imgupload = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({ textImg: this.state.textImg.concat(file) })
    reader.onloadend = () => {
       this.setState({ textImgPrev: this.state.textImgPrev.concat(reader.result) });
    }
    reader.readAsDataURL(file)
  }

  render(){
    const {loading, fontsize, fontweight, lineheight, select,
    title1, title2, content1, content2, source1, source2 } = this.state
    if(!loading){
      return null
    }
    const textFontSize = {
      fontSize: fontsize,
      fontWeight: fontweight,
      lineHeight: lineheight + 'px'
    }
    const img =  this.state.textImgPrev.map((content, i) =>
          <img key={i} src={this.state.textImgPrev ? content : ""} alt=""/>
        )
    const templateForm = (
      <div className={cx('templateWrapper')}>

        <div className={cx('inputText')}>
          <input
            type="text"
            placeholder="TITLE"
            onChange={(e) => this.discussionTitle(e)}
            value={select? title1 : title2 }
            name={select ? "title1": "title2"}
            />
        </div>
        <div className={cx('textArea')}>
          <div
            className={cx('text')}
            contentEditable='true'
            suppressContentEditableWarning={true}
            onInput={(e) => this.handleChange(e)}
            style={ textFontSize }
          >
            {select? content1 : content2}
            {this.state.textImgPrev ? img : null}
          </div>
          <div className={cx('textUtil')}>
            <div className={cx('utilImg')}>
              <input type="file" accept='image/*' onChange={(e) => this.imgupload(e)}/><span>IMAGE</span>
            </div>
            <div onClick={this.fontSizeUp}>A+</div>
            <div onClick={this.fontSizeDown}>A-</div>
            <div className={cx('utilBold')} onClick={this.fontBold}>BOLD</div>
          </div>
        </div>
        <div className={cx('sourceInput')}>
          <input
            type="text"
            placeholder="SOURCE"
            onChange={(e) => this.discussionSource(e)}
            value={source1}
            />
        </div>
      </div>
    )
  return (
    <div className={cx('template')}>
      <form onSubmit={(e)=>this.handleSubmit(e)}>
        <div className={cx('title')}>{(this.props.addvalue).toUpperCase()}</div>
        <div className={cx('upLoadWrapper')}>
          <div className={cx('fileUpLoads')}>
            <div className={cx('fileUpLoad')}>
              <input
                type="file"
                name="img"
                onChange={(e)=> this.handleImageChange(e)}
                accept="image/*"
                />
              {this.imagePreviewUrl()}
            </div>
          </div>
          <div className={cx('utilSelect')}>
            <div className={cx('addEnglish')} onClick={this.addEnglish}>
              <div className={cx('englishBtn')}></div><span>{this.state.addEnglish ? "ADD ENGLISH" : "FRENCH"}</span>
            </div>
              <select className={cx('selectList')}
                onChange={this.selectBox}
                >
                <option value="CONTRE">CONTRE</option>
                <option value="POUR">POUR</option>
              </select>
            </div>
          </div>
           { templateForm }
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

export default DiscussionTemplate;
