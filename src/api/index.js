import request from '@/utils/request'

export function fetchUserData() {
    return request.get('http://101.34.215.29:9000/web/device')
}
