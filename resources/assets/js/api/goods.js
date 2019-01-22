import axios from '@/libs/axios';

/**
 * 删除来源
 * @param id
 * @returns {*}
 */
export const sourceDelete = (id) => {
    return axios.request({
        url: '/source/'+id,
        method: 'delete'
    })
};
/**
 * 添加来源
 * @returns {*}
 */
export const sourceAdd = (data) => {
    return axios.request({
        url: '/source',
        data,
        method: 'post'
    })
};

/**
 * 根据Id获得名称
 * @returns {*}
 */
export const sourceIdGetName = (id) => {
    return axios.request({
        url: '/source/'+id,
        method: 'get'
    })
};

/**
 * 根据Id修改名称
 *
 * @param id
 * @param data
 * @returns {*}
 */
export const sourceIdUpdateName = (id, data) => {
    return axios.request({
        url: '/source/'+id,
        data,
        method: 'put'
    })
};

/**
 * 根据Id批量删除来源信息
 *
 * @param id
 * @param data
 * @returns {*}
 */
export const sourceBatchIdDelete = (data) => {
    return axios.request({
        url: '/source/batchIdDelete',
        data,
        method: 'post'
    })
};

