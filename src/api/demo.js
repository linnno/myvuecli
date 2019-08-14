import myaxios from './../utils/request.js';
export function demo(){
  return myaxios({
    url:'/demo',
    type:'get'
  })
}