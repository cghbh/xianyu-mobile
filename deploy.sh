#! /bin/bash

# 安装依赖
npm install
# 打包
npm run build
# 删除xianyu-mobile-pages目录下public目录中的文件
rm -rf /web/xianyu-mobile-pages/public/
# 将打包好的文件拷贝过去
mv /tmp/xianyu-mobile/dist/* /web/xianyu-mobile-pages/public
# 删除clone的代码
rm -rf /tmp/xianyu-mobile