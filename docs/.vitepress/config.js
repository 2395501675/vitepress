import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
module.exports = {
  ignoreDeadLinks: true, 
  title: 'vitepress-test',
  description: '阮一峰的技术周刊',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [['meta', { name: 'theme-color', content: '#3c8772' }]],
  markdown: {
    headers: {
      level: [0, 0]
    }
  },
  themeConfig: {
    nav: [{
        text: 'Home',
        link: '/'
      },
      {
        text: 'External',
        link: 'https://google.com'
      },
    ],
    sidebar: {
      '/weekly/': getFiles(path.join(__dirname, '../weekly'))
    },
    socialLinks: [{
      icon: 'github',
      link: 'https://github.com/plantree/ruanyf-weekly'
    }, ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Plantree'
    },
    algolia: {
      appId: 'JMQN3OHTS2',
      apiKey: '9bb35b7fbb4b3ae36bb0f2ac9af77b5e',
      indexName: 'ruanyf-weekly'
    },
  }
}
const path1 = path.join(__dirname, '../weekly');
function getFiles(filePath,parentFile) {
  let config = []
  fs.readdirSync(filePath).forEach(file => {
    const path = `${filePath}/${file}`;
    const stat = fs.statSync(path);
    if (stat.isFile()) {
      config.push({
        text: file.split('.')[0],
        link: parentFile?`/weekly/${parentFile}/${file}`:`/weekly/${file}`
      });
    } else if (stat.isDirectory()) {
      config.push({
        text: file,
        collapsed: true,
        items: getFiles(path,parentFile?`${parentFile}/${file}`:file)
      })
    }
  });
  return config
}
let res = getFiles(path1)
console.log(11111,JSON.stringify(res))
// fs.readdir(path1,(err,files) =>{
//   console.log('files-----',files)
//   files.forEach(file => {
//     if (file.isDirectory()) {
//       console.log('dir',file)
//     } else {
//       console.log('file---',file)

//     }
//   })
// })
