import React,{Component} from 'react';
import styles from './AddMagazine.scss';
import classNames from 'classnames/bind';
import { Navigate, AddListBtn } from '../../Atoms';

const cx = classNames.bind(styles);

class AddMagazine extends Component{
  render(){
    return (
      <div className={cx('addMagazineWrapper')}>
        <AddListBtn menu="magazine"/>
        <Navigate />
        <div className={cx('addMagazine')}>
          <div className={cx('title')}>MAGAZINE</div>
          <div className={cx('topMagazine')}>
            <div className={cx('fileUpLoad')}><input type="file"/></div>
            <div className={cx('rightWrapper')}>
              <div className={cx('rightText')}>
                <span>JOURNAL DE CE MOIS-CI</span>
                <div className={cx('inputText')}><input type="text" placeholder="DATE"/></div>
              </div>
            </div>
          </div>
          <div className={cx('newsMagazine','magazineWrapper')}>
            <h3>NEWS</h3>
            <button className={cx('selectBtn')}><span>SELECT POSTS</span></button>
            <ul className={cx('subTitle')}>
              <li className={cx('subTitleList')}>
                Après le Brexit, la désignation du 45e président américain marque une nouvelle poussée populiste.
              </li>
              <li className={cx('subTitleList')}>
                « Je serai le président de tous les Américains. Il est temps de se rassembler », déclare Donald Trump.
              </li>
            </ul>
            <div className={cx('inputText')}><input type="text" placeholder="TITLE"></input></div>
          </div>
          <div className={cx('disMagazine','magazineWrapper')}>
            <h3>DISCUSSION</h3>
            <button className={cx('selectBtn')}><span>VIEW SELECTED POSTS</span></button>
            <div className={cx('inputText')}><input type="text" placeholder="TITLE"></input></div>
          </div>
          <div className={cx('startupMagazine','magazineWrapper')}>
            <h3>POTENTIEL ENTERPRISES</h3>
            <div className={cx('fileUpLoads')}>
              <div className={cx('fileUpLoad')}><input type="file"/></div>
              <div className={cx('fileUpLoad')}><input type="file"/></div>
              <div className={cx('fileUpLoad')}><input type="file"/></div>
            </div>
          </div>
          <div className={cx('dataMagazine','magazineWrapper')}>
            <h3>DATA</h3>
            <button className={cx('selectBtn' ,'two')}><span>READY TO PUBLISH</span></button>
            <div className={cx('inputText')}><input type="text" placeholder="TITLE"></input></div>
          </div>
          <div className={cx('publish')}>
            <div className={cx('text')}>MODIFIÉ  3j</div>
            <button>PUBLISH</button>
            <div className={cx('deleteBtn')}><img src="https://www.simuladordeinvestimentos.com/images/clear.png" alt="deleteBtn"/></div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddMagazine;
