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
      imagePreviewUrl:this.props.discussion? [this.props.discussion.img, this.props.discussion.img1, this.props.discussion.img2] : [],
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
  const templateForm = (title1, text1, source1, title2, text2, source2) => (
    this.state.addEnglish ?
    (<div className={cx('templateWrapper')}>
    <div className={cx('inputText')}>
      <input
        type="text"
        placeholder="TITLE"
        onChange={(e) => this.discussionTitle(e)}
        value={title1}
        />
    </div>
    <div className={cx('textArea')}>
      <textarea
        placeholder="TEXT"
        style={textFontSize}
        onChange={(e) => this.discussionText(e)}
        value={text1}
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
        value={source1}
        />
    </div>
  </div>)
  :
  (<div className={cx('templateWrapper')}>
  <div className={cx('inputText')}>
    <input
      type="text"
      placeholder="TITLE"
      onChange={(e) => this.discussionTitle(e)}
      value={title2}
      />
  </div>
  <div className={cx('textArea')}>
    <textarea
      placeholder="TEXT"
      style={textFontSize}
      onChange={(e) => this.discussionText(e)}
      value={text2}
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
      value={source2}
      />
  </div>
</div>)
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
              name="img1"
              onChange={(e)=> this.handleImageChange(e)}
              accept="image/*"
              data-type="0"
              />
            {this.imagePreviewUrl(0)}
          </div>
          <div className={cx('fileUpLoad')}>
            <input
              type="file"
              name="img2"
              onChange={(e)=> this.handleImageChange(e)}
              accept="image/*"
              data-type="1"
              />
            {this.imagePreviewUrl(1)}
          </div>
          <div className={cx('fileUpLoad')}>
            <input
              type="file"
              name="img3"
              onChange={(e)=> this.handleImageChange(e)}
              accept="image/*"
              data-type="3"
              />
            {this.imagePreviewUrl(2)}
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
