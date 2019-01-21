import axios from '@/libs/axios';

export const menu_add = (data) => {
    return axios.request({
        url: '/menu/add',
        data,
        method: 'post'
    })
};
export const menu_edit = (data) => {
    return axios.request({
        url: '/menu/edit',
        data,
        method: 'post'
    })
};
export const menu_detail = (id) => {
    return axios.request({
        url: '/menu/'+id,
        method: 'get'
    })
};
