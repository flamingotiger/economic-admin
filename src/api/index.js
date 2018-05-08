import axios from 'axios';
//임시 테스트 데이터
const getApi = () => {
  return axios.get('https://honghakbum.github.io/economic-admin/data.json');
}
const postApi = ( id ) => {
  return axios.post(`https://jsonplaceholder.typicode.com/posts`, id);
}
const putApi = ( id, payload ) =>{
  return axios.put(`https://honghakbum.github.io/economic-admin/data.json/${id}`, payload);
}
const deleteApi = ( id ) =>{
  return axios.delete(`https://honghakbum.github.io/economic-admin/data.json/${id}`);
}

const endpoint = "http://35.189.137.54:8300"
const config = { withCredentials: true }
const GET = (url, mapped ) => {
  if(mapped === undefined)
    return axios.get(endpoint + url , config)
  else{
    return axios.get(endpoint + url + mapped, config)
  }
}
const POST = (url, body) => {
  return axios.post(endpoint + url, body, config)
}
const DELETE = (url, id) => {
  if(id){
    return axios.delete(endpoint + url + id, config)
  }else{
    return axios.delete(endpoint + url, config)
  }
}
const PUT = (url, id, body) => {
  if(id){
    return axios.put(endpoint + url + id, body, config)
  }else{
    return axios.put(endpoint + url, body, config)
  }
}
const AuthApi = {
  createAuth: (body) => POST('/api/auth/', body),
  destroyAuth: () => DELETE('/api/auth/'),
};
const ChapterApi = {
  addChapter: (body) => POST('/api/chapter/', body),
  deleteChapter: (id) => DELETE('/api/chapter/', id),
  getChapter: (id) => GET('/api/chapter/', id),
  listChapters: (params) => GET('/api/chapter/', params),
  updateChapter: (id, body) => PUT('/api/chapter/', id, body)
}
const DataApi = {
  addData: (body) => POST('/api/data/', body),
  deleteData: (id) => DELETE('/api/data/', id),
  getData: (id) => GET('/api/data/', id),
  listData: (params) => GET('/api/data/', params),
  updateData: (id, body) => PUT('/api/data/', id, body)
}
const DiscussionApi = {
  addDiscussion: (body) => POST('/api/discussion/', body),
  deleteDiscussion: (id) => DELETE('/api/discussion/', id),
  getDiscussion: (id) => GET('/api/discussion/', id),
  listDiscussion: (params) => GET('/api/discussion/', params),
  updateDiscussion: (id, body) => PUT('/api/discussion/',id , body)
}
const FileApi = {
  addFile:  (body) => POST('/api/file/', body),
  deleteFile: (id) => DELETE('/api/file/', id),
  getFile: (id) => GET('/api/file/', id),
}
const ImageApi = {
  addImage: (body) => axios.post(endpoint + '/api/image/', body, {
    headers: { 'Content-type': 'multipart/form-data'} , withCredentials: true
  }),
  deleteImage: (id) => DELETE('/api/image/', id),
  viewOriginalImage: (id) => axios.get(endpoint + '/api/image/'+ id + '/original',
    config),
  viewThumbnailImage: (id, size) => axios.get(endpoint + '/api/image/'+ id + '/thumbnail/' + size,
    config)
}
const MagazineApi = {
  addMagazine : (body) => POST('/api/magazine/', body),
  deleteMagazine : (id) => DELETE('/api/magazine/', id),
  getMagazine : (id) => GET('/api/magazine/', id),
  listMagazines : (params) => GET('/api/magazine/', params),
  updateMagazine : (id, body) => PUT('/api/magazine/', id, body)
}

const NewsApi = {
  addNews : (body) => POST('/api/news/', body),
  deleteNews : (id) => DELETE('/api/news/', id),
  getNews : (id) => GET('/api/news/', id),
  listNews : (params) => GET('/api/news/', params),
  updateNews : (id, body) => PUT('/api/news/', id, body)
}
const SectorApi = {
  addSector : (body) => POST('/api/sector/', body),
  deleteSector : (id) => DELETE('/api/sector/', id),
  getSector : (id) => GET('/api/sector/',id),
  listSector : (params) => GET('/api/sector/', params),
  updateSector : (id, body) => PUT('/api/sector/', id, body)
}
const StartupApi = {
  addStartup : (body) => POST('/api/startup/', body),
  deleteStartup : (id) => DELETE('/api/startup/', id),
  getStartup : (id) => GET('/api/startup/', id),
  listStartup : (params) => GET('/api/startup/', params),
  updateStartup : (id, body) => PUT('/api/startup/', id, body)
}
const UserApi = {
  addUser : (body) => POST('/api/user/', body),
  deleteUser : (id) => DELETE('/api/user/', id),
  getUser: (id) => GET('/api/user/', id),
  listUser : (params) => GET('/api/user/', params),
  updateUser : (id, body) => PUT('/api/user/', id, body),
}


export {
  putApi,
  getApi,
  postApi,
  deleteApi,

  AuthApi,
  ChapterApi,
  DataApi,
  DiscussionApi,
  FileApi,
  ImageApi,
  MagazineApi,
  NewsApi,
  SectorApi,
  StartupApi,
  UserApi,
}
