import { request } from "./request";

// 一个接口多处调用，当需要修改某个接口时，可以统一修改
export function getHomeMultidata () {
  return request({
    url: '/home/multidata',
  })
}

export function getHomeGoods (type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
