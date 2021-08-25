windows 打包命令
 /Users/luotengzhan/.nvm/versions/node/v11.15.0/lib/node_modules/bin/electron-builder --win --x64
 
 mac 和 windows 路径不同
 
 
 
 1: 软件使用框架
 https://github.com/maximegris/angular-electron

 2：该软件npm 按照方法
 electron 下载失败解决：
 npm config set electron_mirror http://npm.taobao.org/mirrors/electron/
  npm config set electron_custom_dir 11.0.3
  npm install electron@11.0.3
  error:
  (node:93475) UnhandledPromiseRejectionWarning: HTTPError: Response code 404 (Not Found) for http://npm.taobao.org/mirrors/electron/11.0.3/chromedriver-v11.0.0-darwin-x64.zip

 3： npm install
 
 4: npm run start  本地启动, 热更新
