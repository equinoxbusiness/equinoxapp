import axios from 'axios';
import store from "./../redux/store";
import { loadDetails, loadCategory, loadProject, loadOrg, addProjectFormData, loadIcos } from '../redux/actions';

const getMe = (wallet_address: string): void  => {
    axios.get(`${process.env.REACT_APP_API_URL}/get_details/${wallet_address}`)
      .then((res: any)=>{
        localStorage.setItem("authenticated", '1');
        store.dispatch(loadDetails(res.data.response.member));
      })
      .catch(e=>{
        localStorage.removeItem("authenticated");
      });
}

const getCategory = (): void => {
    axios.get(`${process.env.REACT_APP_API_URL}/get_category`)
      .then((res: any)=>{
        store.dispatch(loadCategory(res.data.response));
      });
}

const getProjects = (id: string): void => {
  axios.get(`${process.env.REACT_APP_API_URL}/get_project/${id}`)
    .then((res: any)=>{
      store.dispatch(loadProject(res.data.response));
      store.dispatch(addProjectFormData(res.data.response));
    });
}

const getOrg = (id: string): void => {
  axios.get(`${process.env.REACT_APP_API_URL}/get_org/${id}`)
    .then((res: any)=>{
      store.dispatch(loadOrg(res.data.response));
      //getMe(res.data?.response?.org?.wallet_address);
    });
}

const getIcos = (): void => {
  axios.get(`${process.env.REACT_APP_API_URL}/get_all_ico`)
    .then((res: any)=>{
      store.dispatch(loadIcos(res.data.response));
    });
}

const getProposals = (): void => {
  axios.get(`${process.env.REACT_APP_API_URL}/get_proposal`)
    .then((res: any)=>{
      store.dispatch(loadIcos(res.data.response));
    });
}

export {
  getMe,
  getCategory,
  getProjects,
  getOrg,
  getIcos,
  getProposals
};
