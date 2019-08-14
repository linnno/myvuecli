
/*
 * @Author: lcx 
 * @Date: 2019-08-14 13:58:12 
 * @Last Modified by: lcx
 * @Last Modified time: 2019-08-14 14:38:38
 */
import Mock from 'mockjs'
import { param2Obj } from '../src/utils'
import demo from './demo.js'
const mocks = [
  ...demo
]

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
