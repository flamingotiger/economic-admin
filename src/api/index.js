import axios from 'axios';

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
const GET = (url, token, id) => {
  if(id){
    return axios.get(endpoint + url + id, {
      headers:{ Cookie:'token=' + token },
      withCredentials: true
    })
  }else{
    return axios.get(endpoint + url, {
      headers:{ Cookie:'token=' + token },
      withCredentials: true
    })
  }
}
const POST = (url, token, body) => {
  return axios.post(endpoint + url, body, {
    headers:{ Cookie:'token=' + token },
    withCredentials: true
  })
}
const DELETE = (url, token, id) => {
  if(id){
    return axios.delete(endpoint + url + id, {
      headers:{ Cookie:'token=' + token },
      withCredentials: true
    })
  }else{
    return axios.delete(endpoint + url, {
      headers:{ Cookie:'token=' + token },
      withCredentials: true
    })
  }
}
const PUT = (url, id, token, body) => {
  if(id){
    return axios.put(endpoint + url + id, body, {
      headers:{ Cookie:'token=' + token },
      withCredentials: true
    })
  }else{
    return axios.put(endpoint + url, body, {
      headers:{ Cookie:'token=' + token },
      withCredentials: true
    })
  }
}
const AuthApi = {
  createAuth: (body) => axios.post(endpoint + '/api/auth/', body, {withCredentials: true}),
  destroyAuth: (token) => DELETE('/api/auth/', token),
};
const ChapterApi = {
  addChapter: (token, body) => POST('/api/chapter/', token, body),
  deleteChapter: (token, id) => DELETE('/api/chapter/', token, id),
  getChapter: (token, id) => GET('/api/chapter/', token, id),
  listChapters: (token) => GET('/api/chapter/', token),
  updateChapter: (token, id, body) => PUT('/api/chapter/', token, id, body)
}
const DataApi = {
  addData: (token, body) => POST('/api/data/', token, body),
  deleteData: (token, id) => DELETE('/api/data/', token, id),
  getData: (token, id) => GET('/api/data/', token, id),
  listData: (token) => GET('/api/data/', token),
  updateData: (token, id, body) => PUT('/api/data/', token, id, body)
}
const DiscussionApi = {
  addDiscussion: (token, body) => POST('/api/discussion/', token, body),
  deleteDiscussion: (token, id) => DELETE('/api/discussion/', token, id),
  getDiscussion: (token, id) => GET('/api/discussion/', token, id),
  listDiscussion: (token) => GET('/api/discussion/', token),
  updateDiscussion: (token, id, body) => PUT('/api/discussion/', token, id , body)
}
const FileApi = {
  addFile: (token, body) => POST('/api/file/', token, body),
  deleteFile: (token, id) => DELETE('/api/file/', token, id),
  getFile: (token, id) => GET('/api/file/', token, id),
}
const ImageApi = {
  addImage: (token, body) => POST('/api/image/', token, body),
  deleteImage: (token, id) => DELETE('/api/image/', token, id),
  viewOriginalImage: (token, id) => axios.get(endpoint + '/api/image/'+ id + '/original', {
    headers:{ Cookie:'token=' + token },
    withCredentials: true }),
  viewThumbnailImage: (token, id, size) => axios.get(endpoint + '/api/image/'+ id + '/thumbnail/' + size, {
    headers:{ Cookie:'token=' + token },
    withCredentials: true })
}
const MagazineApi = {
  addMagazine : (token, body) => POST('/api/magazine/', token, body),
  deleteMagazine : (token, id) => DELETE('/api/magazine/', token, id),
  getMagazine : (token, id) => GET('/api/magazine/', token, id),
  listMagazines : (token) => GET('/api/magazine/', token),
  updateMagazine : (token, id, body) => PUT('/api/magazine/', token, id, body)
}

const NewsApi = {
  addNews : (token, body) => POST('/api/news/', token, body),
  deleteNews : (token, id) => DELETE('/api/news/', token, id),
  getNews : (token, id) => GET('/api/news/', token, id),
  listNews : (token) => GET('/api/news/', token),
  updateNews : (token, id, body) => PUT('/api/news/', token, id, body)
}
const SectorApi = {
  addSector : (token, body) => POST('/api/sector/', token, body),
  deleteSector : (token, id) => DELETE('/api/sector/', token, id),
  getSector : (token, id) => GET('/api/sector/', token, id),
  listSector : (token) => GET('/api/sector/', token),
  updateSector : (token, id, body) => PUT('/api/sector/', token, id, body)
}
const StartupApi = {
  addStartup : (token, body) => POST('/api/startup/', token, body),
  deleteStartup : (token, id) => DELETE('/api/startup/', token, id),
  getStartup : (token, id) => GET('/api/startup/', token, id),
  listStartup : (token) => GET('/api/startup/', token),
  updateStartup : (token, id, body) => PUT('/api/startup/', token, id, body)
}
const UserApi = {
  addUser : (token, body) => POST('/api/user/', token, body),
  deleteUser : (token, id) => DELETE('/api/user/', token, id),
  getUser: (token, id) => GET('/api/user/', token, id),
  listUser : (token) => GET('/api/user/', token),
  updateUser : (token, id, body) => PUT('/api/user/', token, id, body)
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
