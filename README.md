 1： 项目拉取
 git clone git@github.com:succulen-plants/electron-angular-amap.git
 
 软件参考框架
 https://github.com/maximegris/angular-electron

 2： npm install
 2.1 electron 下载失败解决：
 npm config set electron_mirror http://npm.taobao.org/mirrors/electron/
  npm config set electron_custom_dir 11.0.3
  npm install electron@11.0.3
  
  2.2 可忽略
  error:
  (node:93475) UnhandledPromiseRejectionWarning: HTTPError: Response code 404 (Not Found) for http://npm.taobao.org/mirrors/electron/11.0.3/chromedriver-v11.0.0-darwin-x64.zip


 
 3: npm run start  本地启动, 热更新


 4：打包
  windows 打包命令
 /Users/luotengzhan/.nvm/versions/node/v11.15.0/lib/node_modules/bin/electron-builder --win --x64
 
 mac 和 windows 路径不同
 
