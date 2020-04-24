// import "@babel/polyfill";
import './index.css';
import './index.less';
import './assets/iconfont.css';

console.log('hello owlrd');

import('./main')
  .then(res => {
    console.log(res)
    res.say();
  })
  .catch(error => {
    console.log(error);
  })

  // 在入口文件注册 serviceWorker
  // 处理 兼容性问题

  if ('serviceworker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-work.js')
        .then(() => {
          console.log('success');
        })
        .catch(() => {
          console.log('error');
        })
    })
  }
