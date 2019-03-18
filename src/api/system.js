import request from '../utils/request'

export function fetchSysuserList(data) {
    return request({
        url: '/system/sysuser/list',
        method: 'post',
        data
    })
}

export function fetchRoleList(data) {
    return request({
        url: '/system/role/list',
        method: 'post',
        data
    })
}

export function fetchHistoryList(data) {
    return request({
        url: '/system/history/list',
        method: 'post',
        data
    })
}

export function conditionRoleList() {
    return request({
        url: '/condition/role/list',
        method: 'post',
    })
}

export function fetchRolePower(data) {
    return request({
        url: '/system/role/powerList',
        method: 'post',
        data
    })
}

export function saveRole(data) {
    return request({
        url: '/system/role/save',
        method: 'post',
        data
    })
}

export function saveSysuser(data) {
    return request({
        url: '/system/sysuser/save',
        method: 'post',
        data
    })
}

export function statusRole(data) {
    return request({
        url: '/system/role/status',
        method: 'post',
        data
    })
}

export function statusSysuser(data) {
    return request({
        url: '/system/sysuser/status',
        method: 'post',
        data
    })
}
