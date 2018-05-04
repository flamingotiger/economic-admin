import React,{Component} from 'react';
import styles from './ProfileList.scss';
import classNames from 'classnames/bind';
import { OpenPanelEdit, Cancel } from '../../Atoms';
import { ImageApi, UserApi } from '../../../api';

const cx = classNames.bind(styles);

class ProfileList extends Component{
  constructor(props){
    super(props);
    const { id, lastName, firstName, magazineManager, newsManager, startUpManager,
       discussionManager, dataManager } = this.props;
    this.state={
      openPanel:false,
      openCancel:false,
      prevImg:undefined,
      lastName:lastName,
      firstName:firstName,
      id:id,
      magazineManager:magazineManager,
      newsManager:newsManager,
      startUpManager:startUpManager,
      discussionManager:discussionManager,
      dataManager:dataManager,
      openPanelEdit:false,
    }

  }

  handleEdit = () => { this.setState({openPanel:!this.state.openPanel}) }

  componentDidMount(){
    this.props.getId(this.props.id);
    ImageApi.viewThumbnailImage(this.props.image, 256).then(res => this.setState({prevImg: res.config.url}))
  }

  handleCancel = (close) => {
    if(close){
      this.setState({openCancel:true})
    }else{
      this.setState({openCancel:false})
    }
  }

 handleAllChk = async () => {
    await this.setState({magazineManager : !this.state.magazineManager});
    if(this.state.magazineManager){
      await this.setState({
        newsManager: true,
        startUpManager: true,
        discussionManager: true,
        dataManager: true
      });
    }
    await this.apiManager()
}

handleChk =  async (e) => {
  await this.setState({ [e.target.name]: e.target.checked })
  await this.handleUnchk();
  await this.apiManager()
}

handleUnchk = () => {
  const { newsManager, startUpManager, discussionManager, dataManager } = this.state;
  if ( !(newsManager + startUpManager + discussionManager + dataManager  === 4) ){
    this.setState({ magazineManager: false})
  }
}

apiManager = () => {
  const { magazineManager, newsManager, startUpManager, discussionManager, dataManager, id} = this.state;
  const data = {
    "magazineManager":magazineManager,
    "newsManager": newsManager,
    "startUpManager": startUpManager,
    "discussionManager": discussionManager,
    "dataManager": dataManager
  }
   UserApi.updateUser(id, data).then(res => console.log(res))
}

//클릭시 바로 변경
changeText = (state) => {
  this.setState({
    email:state.email,
    password:state.password,
    lastName:state.lastName,
    firstName:state.firstName,
    memo:state.memo
  })
}

  render(){
    const { changeText } = this;
    const { id, image, email, password, memo } = this.props;
    const { lastName, firstName, openPanel, openCancel, magazineManager, newsManager, startUpManager, discussionManager, dataManager, prevImg} = this.state;
    return (
      <div className={cx('listWrapper')}>
      <div className={cx('profileList')}>
        <div className={cx('closeBtn')} onClick={() => this.handleCancel(true)}>
          <img src="/assets/btn-cancle.svg" alt="xBtn"/>
        </div>
        <Cancel
          id={id}
          openCancel={openCancel}
          handleCancel={this.handleCancel}
        />
        <div className={cx('profileEditWrapper')}>
          <div className={cx('profileUser')}>{firstName}</div>
          <div className={cx('profileEdit')} onClick={this.handleEdit}>EDIT PROFILE</div>
        </div>
        <form className={cx('profileForm')}>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`magazine${id}`}>
              <input
                type="checkbox"
                name="magazineManager"
                id={`magazine${id}`}
                checked={magazineManager}
                onChange={this.handleAllChk}
              />
              <span></span>MAGAZINE</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`news${id}`}>
              <input
                type="checkbox"
                name="newsManager"
                id={`news${id}`}
                checked={newsManager}
                onChange={(e) => this.handleChk(e)}
              />
            <span></span>NEWS</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`startup${id}`}>
              <input
                type="checkbox"
                name="startUpManager"
                id={`startup${id}`}
                checked={startUpManager}
                onChange={(e) => this.handleChk(e)}
              />
            <span></span>START_UP</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`discussion${id}`}>
              <input
                type="checkbox"
                name="discussionManager"
                id={`discussion${id}`}
                checked={discussionManager}
                onChange={(e) => this.handleChk(e)}
              />
            <span></span>DISCUSSION</label>
          </div>
          <div className={cx('profileCheckBox')}>
            <label htmlFor={`data${id}`}>
              <input
                type="checkbox"
                name="dataManager"
                id={`data${id}`}
                checked={dataManager}
                onChange={(e) => this.handleChk(e)}
              />
            <span></span>DATA</label>
          </div>
        </form>
      </div>
      <OpenPanelEdit
        id={id}
        image={image}
        prevImg={prevImg}
        lastName={lastName}
        firstName={firstName}
        email={email}
        password={password}
        memo={memo}
        changeText={changeText}
        openPanel={openPanel}
        handleEdit={this.handleEdit}
        />
      </div>
    );
  }
}
export default ProfileList;
