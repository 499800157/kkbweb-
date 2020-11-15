## 查看npm跟路径
npm root -g

### 看当前的node_modules的路径
npm root 

## node环境变量设置
计算机右键属性找到环境变量 编辑path中，将node的上级路径添加上，分号隔开

## require引用文件时
node_modules里的模块不使用./等，直接写模块名称
查找第三方模块（node_modules）的模块一直向上查找,直到根路径（如果当前目录下有node_modules目录就近查找）


## npm 

npm install xxx
简写 npm i xxx
安装

安装指定的版本
npm i xxx@3.4.1

npm uninstall xxx
卸载

npm install xxx --save
npm install xxx -S
安装到生产环境

npm install xxx --save-dev
npm install xxx -D
安装到开发环境

npm install xxx -g 
安装到全局（许多项目都用到的），会安装到跟路径下



