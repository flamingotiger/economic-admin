import React,{Component} from 'react';
import styles from './DiscussionMagazine.scss';
import classNames from 'classnames/bind';
import { Search, DiscussionList, PublishBtn } from '../../Atoms';
import { getApi } from '../../../api';

const cx = classNames.bind(styles);

class DiscussionMagazine extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      discussion:[]
    }
    this.closeBtnMenu = this.closeBtnMenu.bind(this);
  }
  closeBtnMenu(){ this.setState({ openMenu:false })}
  handleChange = (e) => {this.setState({keyword: e.target.value})}
  renderAdminList = () => {
    const discussion = this.state.discussion.map((content,i) => {
      return <DiscussionList
        key={i}
        idx={content.idx}
        img={content.img}
        cate={content.cate}
        year={content.year}
        month={content.month}
        title1={content.title1}
        publish1={content.publish1}
        reporter1={content.reporter1}
        title2={content.title2}
        publish2={content.publish2}
        reporter2={content.reporter2}
        openmenu={this.openBtnMenu}
        menu={content.menu}
        magazine={this.props.magazine}
        />
    })
    return discussion
  }
  componentDidMount(){
    getApi().then(res => this.setState({discussion: res.data.discussion}))
  }
  render(){
    console.log(this.props.magazine)
    const mapToComponents = (discussion) => {
      if(this.state.keyword === ''){
          this.renderAdminList()
      }
       discussion = discussion.filter((contact) => {
         return contact.title1.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return discussion.map((content,i) => {
            return <DiscussionList
              key={i}
              idx={content.idx}
              img={content.img}
              cate={content.cate}
              year={content.year}
              month={content.month}
              title1={content.title1}
              publish1={content.publish1}
              reporter1={content.reporter1}
              title2={content.title2}
              publish2={content.publish2}
              reporter2={content.reporter2}
              menu={content.menu}
              magazine={this.props.magazine}
              />
        });
    };
    const { discussion } = this.state;
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
              {mapToComponents(discussion)}
            </div>
          </div>
          <div className={cx('publish')}>
            <div className={cx('publishBtn')} onClick={this.handleClose}>
              <PublishBtn />
            </div>
          </div>
      </div>
    )
  }
}
export default DiscussionMagazine;
