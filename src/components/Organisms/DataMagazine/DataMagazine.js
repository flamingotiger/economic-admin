import React,{Component} from 'react';
import styles from './DataMagazine.scss';
import classNames from 'classnames/bind';
import { Search, AdminList, DataList, PublishBtn } from '../../Atoms';
import { getApi } from '../../../api';

const cx = classNames.bind(styles);

class DataMagazine extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      data:[]
    }
    this.closeBtnMenu = this.closeBtnMenu.bind(this);
  }
  closeBtnMenu(){ this.setState({ openMenu:false })}
  handleChange = (e) => {this.setState({keyword: e.target.value})}
  renderAdminList = () => {
    const data = this.state.data.map((content,i) => {
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
        />
    })
    return data
  }
  componentDidMount(){
    getApi().then(res => this.setState({data: res.data.data}))
  }
  render(){
    //검색
    const mapToComponents = (data) => {
      if(this.state.keyword === ''){
        //검색하지 않았을때 전부보이기
        this.renderAdminList()
      }
       data = data.filter((contact) => {
         return contact.f_title.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return data.map((content,i) => {
            return <DataList
              key={i}
              idx={content.idx}
              img={content.img}
              publish={content.publish}
              title={content.f_title}
              openmenu={this.openBtnMenu}
              menu={content.menu}
              magazine={this.props.magazine}
              />
        });
    };
    const { data } = this.state;
    return (
      <div className={cx('dataAdminPage')}>
          <div className={cx('dataWrapper')}>
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
              {mapToComponents(data)}
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
export default DataMagazine;
