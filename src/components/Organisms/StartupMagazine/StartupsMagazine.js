import React,{Component} from 'react';
import styles from './StartupsMagazine.scss';
import classNames from 'classnames/bind';
import { Search, StartupList, PublishBtn } from '../../Atoms';
import { getApi } from '../../../api';

const cx = classNames.bind(styles);

class StartupsMagazine extends Component{
  constructor(props){
    super(props);
    this.state={
      keyword:'',
      openMenu:false,
      startup:[],
    }
    this.closeBtnMenu = this.closeBtnMenu.bind(this);
  }
  closeBtnMenu(){ this.setState({ openMenu:false }) }
  handleChange = (e) => {this.setState({keyword: e.target.value})}
  renderStartupList = () => {
    const startup = this.state.startup.map((content,i) => {
      return <StartupList
        key={i}
        idx={content.idx}
        img={content.img}
        cate={content.cate}
        publish={content.publish}
        date={content.date}
        ftitle={content.ftitle}
        reporter={content.reporter}
        openmenu={this.openBtnMenu}
        menu={content.menu}
        magazine={this.props.magazine}
        />
    })
    return startup
  }
  componentDidMount(){
    getApi().then(res => this.setState({startup: res.data.startup}))
  }
  render(){
    const mapToComponents = (startup) => {
      //검색하지 않았을때 전부보이기
      if(this.state.keyword === ''){
        this.renderStartupList()
      }
       startup = startup.filter((contact) => {
         return contact.ftitle.toLowerCase().indexOf(this.state.keyword) > -1
       });
       return startup.map((content,i) => {
            return <StartupList
              key={i}
              idx={content.idx}
              img={content.img}
              cate={content.cate}
              publish={content.publish}
              date={content.date}
              ftitle={content.ftitle}
              reporter={content.reporter}
              openmenu={this.openBtnMenu}
              menu={content.menu}
              magazine={this.props.magazine}
              />
        });
    };
    const { startup } = this.state;
    return (
      <div className={cx('startupAdminPage')}>
          <div className={cx('startupWrapper')}>
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
              {mapToComponents(startup)}
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
export default StartupsMagazine;
