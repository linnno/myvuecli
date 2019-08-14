// mock语法请参考https://github.com/nuysoft/Mock/wiki/Syntax-Specification
// import Mock from 'mockjs';
export default [
  {
    url:'/demo',
    type:'get',
    response:config =>{
      const { memos } = config.query; 
      return {
        code:0,
        data:1
      }
    }
  }
]