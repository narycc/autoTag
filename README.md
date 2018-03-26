# autoTag
我写的第一个npm 包

成品：https://www.npmjs.com/package/autotag

源码：https://github.com/narycc/autoTag

背景：我们要求每次上线的tag 号形如： v0.0.1_201803201234 即版本号 + 时间戳， 我们现在要写一个自动生成这个tag号的工具，
很鸡肋的一个功能，但暂且用来练手我们就把它当成一个功能吧；

目标：
1，可以使用npm i 进行安装
2，可以在package.json 中进行配置，并使用命令行执行

预备工作：
1，github 的账号
2，npmjs.com 的账号

步骤：
1，npm init 初始化这个项目，我给我的项目取名：autoTag

所以有类似这种目录结构
autoTag
---bin
  --- cmd.js
---index.js
---package.json
---README.md

是不是很简单

2，编写index.js
主要就是将需要使用的方法暴露出去，exports.generateTags = function(){//.....}

3，将代码放到github 上进行存管，为什么要这一步，因为这样别人安装的时候才能访问到你的源码，看看你这东西到底是个啥

4，npm 发布包的时候，目录下面必须要有package.json，那么现在我们来看看package.json 是个啥样
{
  "name": "autotag",
  "version": "1.0.5",
  "description": "This is a node script to generate a new tag for launch ",
  "main": "index.js",
  "repository": {
    "type": "git",
    "url": "https://github.com/narycc/autoTag.git"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "autotag": "./bin/cmd.js"
  },
  "keywords": [
    "git",
    "tag"
  ],
  "author": "naryCC",
  "license": "ISC"
}

这里要强调一下，如果发布之后，又改了点小东西，需要更新npm 包的时候，一定要更新version, 要不然会报错；
bin 的配置解释一下： 如果没有这个配置，我们npm i autotag 之后，其实只能通过 require('autotag') ，然后调用它的 generateTags 生成tag号；
那如果我想让autotag 变成一个可以执行的命令，那么就可以配置bin 了，让它变成一个可以执行的命令；

bin/cmd.js 的内容其实超级简单：
#!/usr/bin/env node

let auto = require('autotag');

auto.generateTags();

5，sudo npm link 这一步是建立一个软链接，将当前目录的环境变成全局的

6，npm publish 这一步会要求你输入你的npm 账号，密码和邮箱信息

7，OK 发布成了，你现在可以到www.npmjs.com 上去看看是不是已经发布成功了

8，现在可以试试在你其他项目中npm i autotag ； 然后使用autotag 命令试试了， 挺好玩的，你也可以试试；

备注： 我在publish 的时候一直失败，卡了很久，后来才知道原来是因为我之前为了提高安装npm 的速度把npm 的registry 设置为了淘宝的镜像，
你可以输入：npm config edit 看看你的镜像是不是https://registry.npmjs.org/， 如果不是，要先将其设置回来；





