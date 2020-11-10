import Net from "@/plugins/http/http";
import * as qiniu from "qiniu-js"
// 营销获客页

const QiniuData = {
  uptokenURL: '/upload/getUploadToken',
  domain: "https://static.imzhiliao.com/"
}

export default class uploadFileSev {
  // 上传文件
  static uploadFile(file, process) {
    return new Promise((resolve, reject) => {
      Net.get(QiniuData.uptokenURL)
        .then(res => {
          let token = res.data;
          let key = null;
          let putExtra = {
            fname: file.name,
            params: {},
            mimeType: [file.type]
          }
          let config = {
            shouldUseQiniuFileName: false,
            region: null
          }
          qiniu.upload(file, key, token, putExtra, config)
            .subscribe({
              next(res) {
                process(res)
              },
              error(err) {
                reject(err)
              },
              complete(res) {
                resolve(res.key)
              }
            })
        })
    })
  }
}