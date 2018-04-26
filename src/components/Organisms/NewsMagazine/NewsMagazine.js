import React,{Component} from 'react';
import styles from './NewsMagazine.scss';
import classNames from 'classnames/bind';
import { Search, AdminList, PublishBtn } from '../../Atoms';
import { getApi } from '../../../api';

const cx = classNames.bind(styles);

class NewsMagazine extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      news:[],
      idx:0
    }
    this.closeBtnMenu = this.closeBtnMenu.bind(this);
  }
  closeBtnMenu(){ this.setState({ openMenu:false })}
  handleChange = (e) => {this.setState({keyword: e.target.value})}
  renderAdminList = () => {
    const news = this.state.news.map((content,i) => {
      return <AdminList
        key={i}
        idx={content.idx}
        img={content.img}
        cate={content.cate}
        publish={content.publish}
        date={content.date}
        subTitle={content.subTitle}
        reporter={content.reporter}
        openmenu={this.openBtnMenu}
        menu={content.menu}
        magazine={this.props.magazine}
        getIdx={this.props.getIdx}
        selectItem={this.props.selectItem}
        />
    })
    return news
  }
  componentDidMount(){
    getApi().then(res => this.setState({news: res.data.news}))
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target)
    //데이터 put
  }
  render(){
    //검색
    const mapToComponents = (news) => {
      if(this.state.keyword === ''){
        //검색하지 않았을때 전부보이기
        this.renderAdminList()
      }
       news = news.filter((contact) => {
         return contact.subTitle.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return news.map((content,i) => {
            return <AdminList
              key={i}
              idx={content.idx}
              img={content.img}
              cate={content.cate}
              publish={content.publish}
              date={content.date}
              ftitle={content.f_title}
              reporter={content.reporter}
              openmenu={this.openBtnMenu}
              menu={content.menu}
              magazine={this.props.magazine}
              getIdx={this.props.getIdx}
              selectItem={this.props.selectItem}
              />
        });
    };
    //newsIdx 리덕스 입력번지수 와 idx 가져오기
    //magazinevalue 데이터 입력 번지
    const { news } = this.state;
    return (
      <div className={cx('newsAdminPage')}>
        <div className={cx('newsWrapper')}>
          <div className={cx('util')}>
            <div className={cx('select')}>
              <select>
                  <option value="201712">2017-12</option>
                  <option value="201712">2017-12</option>
                  <option value="201712">2017-12</option>
                  <option value="201712">2017-12</option>
              </select>
            </div>
            <div className={cx('search')}>
              <Search handleChange={(e) => this.handleChange(e)}/>
            </div>
          </div>
          <div className={cx('listScroll')}>
            {mapToComponents(news)}
          </div>
        </div>
        <div className={cx('publish')}>
          <div className={cx('publishBtn')} onClick={this.props.handleClose}>
            <PublishBtn />
          </div>
        </div>
      </div>
    )
  }
}
export default NewsMagazine;
