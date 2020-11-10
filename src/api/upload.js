const baseURL = '';
import Net from "@/plugins/http/http";

export default class ucSev {
    /** 
     * 保存图片
     */
    static saveImage(data) {
        return Net.post(baseURL + "/upload/saveImage", data);
    }

    // 获取所有图片
    static getAllImages() {
        return Net.get(baseURL + "/upload/getAllImages");
    }

    // 删除某一图片
    static deleteImage(params) {
        return Net.get(baseURL + "/upload/deleteImage", params);
    }
}
