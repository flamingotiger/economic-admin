import React,{Component} from 'react';
import styles from './DiscussionTemplate.scss';
import classNames from 'classnames/bind';
import { putApi, postApi } from '../../../api';
import update from 'immutability-helper';

const cx = classNames.bind(styles);

class DiscussionTemplate extends Component{
  constructor(props){
    super(props);
    this.state={
      fontsize:12,
      fontweight:"normal",
      lineheight:12,
      addEnglish:true,
      f_title1:'',
      f_text1:'',
      f_source1:'',
      e_title1:'',
      e_text1:'',
      e_source1:'',
      select:true,
      file1:undefined,
      file2:undefined,
      imagePreviewUrl1:this.props.discussion? this.props.discussion.img : undefined,
      imagePreviewUrl2:this.props.discussion? this.props.discussion.img1 : undefined
    }
    this.fontSizeUp= this.fontSizeUp.bind(this);
    this.fontSizeDown= this.fontSizeDown.bind(this);
    this.fontBold= this.fontBold.bind(this);
  }
  fontSizeUp(){
    if(this.state.fontsize < 24){
      this.setState((prevState) => ({fontsize: prevState.fontsize + 6, lineheight: prevState.lineheight + 6}));
    }
  }
  fontSizeDown(){
    if(this.state.fontsize > 12){
      this.setState((prevState) => ({fontsize: prevState.fontsize - 6, lineheight: prevState.lineheight - 6}));
    }
  }
  fontBold(){
    if(this.state.fontweight === "normal"){
      this.setState({ fontweight:"bold" })
    }else{
      this.setState({ fontweight:"normal" })
    }
  }
  discussionTitle = (e) => {
    if(this.state.select){
      if(this.state.addEnglish){
        this.setState({f_title1:e.target.value})
      }else{
        this.setState({e_title1:e.target.value})
      }
    }else{
      if(this.state.addEnglish){
        this.setState({f_title2:e.target.value})
      }else{
        this.setState({e_title2:e.target.value})
      }
    }
  }
  discussionText = (e) => {
    if(this.state.select){
      if(this.state.addEnglish){
        this.setState({f_text1:e.target.value})
      }else{
        this.setState({e_text1:e.target.value})
      }
    }else{
      if(this.state.addEnglish){
        this.setState({f_text2:e.target.value})
      }else{
        this.setState({e_text2:e.target.value})
      }
    }
  }
  discussionSource = (e) => {
    if(this.state.select){
      if(this.state.addEnglish){
        this.setState({f_source1:e.target.value})
      }else{
        this.setState({e_source1:e.target.value})
      }
    }else{
      if(this.state.addEnglish){
        this.setState({f_source2:e.target.value})
      }else{
        this.setState({e_source2:e.target.value})
      }
    }
  }
  selectBox = (e) => {
    if(e.target.value === "CONTRE"){
      this.setState({select : true})
    }else{
      this.setState({select : false})
    }
  }
  //AddEnglish
  addEnglish = () => { this.setState({ addEnglish: !this.state.addEnglish})}
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let idx = e.target.getAttribute('data-type')

    reader.onloadend = () => {
      const { file1, file2, imagePreviewUrl1, imagePreviewUrl2 } = this.state;
      if(this.state.select){
        let files = update(file1, {$set: file});
        let imgUrl = update(imagePreviewUrl1, {$set: reader.result});
        this.setState({ file1: files, imagePreviewUrl1: imgUrl });
      }else{
        let files = update(file2, {$set: file});
        let imgUrl = update(imagePreviewUrl2, {$set: reader.result});
        this.setState({ file2: files, imagePreviewUrl2: imgUrl });
      }

    }
    reader.readAsDataURL(file)
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
    const { f_title1, f_text1, f_source1, e_title1, e_text1, e_source1,
      f_title2, f_text2, f_source2, e_title2, e_text2, e_source2 } = this.state;
    const data = {
      "f_title1": f_title1,
      "f_text1": f_text1,
      "f_source1": f_source1,
      "e_title1": e_title1,
      "e_text1": e_text1,
      "e_source1": e_source1,
      "f_title2": f_title2,
      "f_text2": f_text2,
      "f_source2": f_source2,
      "e_title2": e_title2,
      "e_text2": e_text2,
      "e_source2": e_source2
    }
    if(!this.props.discussion){//데이터가 입력이 되어있었는지 확인 없으면 post
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
//Getapi
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
    f_title1:getDiscussion.f_title1,
    f_text1:getDiscussion.f_text1,
    f_source1:getDiscussion.f_source1,
    e_title1:getDiscussion.e_title1,
    e_text1:getDiscussion.e_text1,
    e_source1:getDiscussion.e_source1,
    f_title2:getDiscussion.f_title2,
    f_text2:getDiscussion.f_text2,
    f_source2:getDiscussion.f_source2,
    e_title2:getDiscussion.e_title2,
    e_text2:getDiscussion.e_text2,
    e_source2:getDiscussion.e_source2,
    calendarDate:getDiscussion.calendarDate,
    loading:true
  })
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
    const templateForm = (f_title, f_text, f_source, e_title, e_text, e_source) => (
      <div className={cx('templateWrapper')}>
        <div className={cx('inputText')}>
          <input
            type="text"
            placeholder="TITLE"
            onChange={(e) => this.discussionTitle(e)}
            value={this.state.addEnglish ? f_title : e_title}
            />
        </div>
        <div className={cx('textArea')}>
          <textarea
            placeholder="TEXT"
            style={textFontSize}
            onChange={(e) => this.discussionText(e)}
            value={this.state.addEnglish ? f_text : e_text}
            >
          </textarea>
          <div className={cx('textUtil')}>
            <div className={cx('utilImg')}>
              <input type="file"/><span>IMAGE</span>
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
            value={this.state.addEnglish ? f_source : e_source}
            />
        </div>
    </div>
  )
  //lastName 1 => contre / 2 => pour
  const {f_title1, f_text1, f_source1, e_title1, e_text1, e_source1,
    f_title2, f_text2, f_source2, e_title2, e_text2, e_source2
  } = this.state
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
          {this.state.select ?
            templateForm(f_title1, f_text1, f_source1, e_title1, e_text1, e_source1)
            : templateForm(f_title2, f_text2, f_source2, e_title2, e_text2, e_source2)
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

export default DiscussionTemplate;
