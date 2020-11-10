
<template>
  <div>
    <!--这个地方的大小是可以自己控制的-->
    <textarea
      :id="id"
      :name="id"
      style="width:100%;height:500px;"
    ></textarea>

    <!-- 图片批量上传 -->
    <multiimages
      :show="canshow"
      @insertimg="insertimg"
    ></multiimages>
  </div>
</template>
<script>
import config from '../../public/kindeditor/config';

import multiimages from './multiimage';
// import url from '../api/url';
const url = {}
export default {
  props: {
    content: {
      default: ''
    },
    nolink: {
      default: ''
    },
    id: {
      default: 'editor_id'
    }
  },
  data() {
    return {
      canshow: 0,
      editor: ''
    };
  },

  components: {
    multiimages
  },

  methods: {
    initEditor() {
      if (new newEditor().K) {
        // config.imgCallback = this.imgCallback;
        config.afterChange = this.afterChange;
        // config.multiimage = this.multiimage;
        // config.items = this.filtersItem(
        //   config.items,
        //   'multiimage',
        //   'add',
        //   config.items.indexOf('image')
        // );

        if (this.nolink) {
          config.items = config.items.filter(function(item) {
            return item != 'link' && item != 'unlink';
          });
        } else {
          if (!config.items.includes('link')) {
            config.items.push('link');
          }
          if (!config.items.includes('unlink')) {
            config.items.push('unlink');
          }
        }

        this.editor = new newEditor().K.create(`#${this.id}`, config);
        this.editor.html(this.content);
      } else {
        setTimeout(() => {
          this.initEditor();
        }, 2000);
      }
    },
    filtersItem(arr, str, type, index) {
      let result = arr;
      if (type == 'add') {
        if (!result.includes(str)) {
          if (index) {
            result.splice(index + 1, 0, str);
          } else {
            result.push(str);
          }
        }

        return result;
      }

      if (type == 'edd') {
        result.forEach((item, index) => {
          if (item == str) {
            result.splice(index, 1);
          }
        });
        return result;
      }
    },

    insertimg(arr) {
      arr.map(item => {
        this.insetimage(item);
      });
    },

    insetimage(url, title, width, height, border, align) {
      this.editor.exec('insertimage', url, title, width, height, border, align);
    },

    multiimage() {
      this.canshow = +new Date();
    },
    imgCallback(file, fn) {
      let fileType = file.type;
      if (fileType != 'image/png' && fileType != 'image/jpeg') {
        this._alert({
          type: 'warning',
          msg: '只能上传png、jpg格式的图片'
        });
        this.editor.hideDialog();
        return;
      }
      let formData = new FormData();
      // upFile就是后台接收的key
      formData.append('file', file, file.name);
      this.$http.post(url.uploadImg, formData).then(data => {
        this.editor.hideDialog();
        let url = data.data.fileUrl;
        fn(url);
      });
    },
    afterChange() {
      if (this.editor) {
        if (this.id == 'editor_id') {
          this.$emit('callback', this.editor.html());
        } else {
          if (this.id == 'editor_id1') {
            console.log('editor_id1--->', this.editor.html());
            this.$emit('callback1', this.editor.html());
          } else {
            console.log('editor_id2--->', this.editor.html());
            this.$emit('callback2', this.editor.html());
          }
        }
      }
    }
  },
  mounted() {
    this.initEditor();
  }
};
</script>
