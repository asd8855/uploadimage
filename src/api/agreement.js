const baseURL = '';
import Net from "@/plugins/http/http";

export default class ucSev {
  /** 
   * 保存图片
   */
  static save(data) {
    return Net.post(baseURL + "/agreement/save", data);
  }

  static getList() {
    return Net.get(baseURL + "/agreement/getList");
  }

  static getDetail(id) {
    return Net.get(baseURL + `/agreement/getDetail/${id}`);
  }

}
