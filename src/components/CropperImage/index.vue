<template>
  <div class="cropper-wrapper">
    <div class="img-box">
      <img class="cropper-image" :id="imgId" alt="" />
    </div>
    <div class="right-con">
      <div v-if="preview" class="preview-box" :id="previewId"></div>
      <div class="button-box">
        <slot>
          <el-upload
            action="image/upload"
            :before-upload="beforeUpload"
            :showUploadList="false"
          >
            <el-button style="width: 150px" type="primary"
              >选择本机图片</el-button
            >
          </el-upload>
        </slot>
        <div v-show="insideSrc" class="operates">
          <el-button type="primary" icon="redo" title="旋转" @click="rotate" />
          <el-button type="primary" icon="minus" title="缩小" @click="shrink" />
          <el-button type="primary" icon="plus" title="放大" @click="magnify" />
          <el-button
            type="primary"
            icon="column-width"
            title="水平翻转"
            @click="scale('X')"
          />
          <el-button
            type="primary"
            icon="column-height"
            title="垂直翻转"
            @click="scale('Y')"
          />
          <el-button
            type="primary"
            icon="arrow-up"
            title="上移"
            @click="move(0, -moveStep)"
          />
          <el-button
            type="primary"
            icon="arrow-left"
            title="左移"
            @click="move(-moveStep, 0)"
          />
          <el-button
            type="primary"
            icon="arrow-down"
            title="下移"
            @click="move(0, moveStep)"
          />
          <el-button
            type="primary"
            icon="arrow-right"
            title="右移"
            @click="move(moveStep, 0)"
          />

          <el-button
            style="width: 150px; margin-top: 10px"
            type="primary"
            @click="crop"
            >{{ cropButtonText }}</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
// import './index.less'
import 'cropperjs/dist/cropper.min.css'
export default {
  name: 'Cropper',
  props: {
    src: {
      type: String,
      default: ''
    },
    preview: {
      type: Boolean,
      default: true // 是否显示预览 默认true
    },
    moveStep: {
      type: Number,
      default: 4 // 移动一次的大小，默认4
    },
    cropButtonText: {
      type: String,
      default: '裁剪' // 剪裁按钮的文本
    },
    ratio: {
      type: Number,
      default: 5 // 长宽比率，默认5
    }
  },
  data () {
    return {
      cropper: null,
      insideSrc: ''
    }
  },
  computed: {
    imgId () {
      return `cropper${this._uid}`
    },
    previewId () {
      return `cropper_preview${this._uid}`
    }
  },
  watch: {
    src (src) {
      this.replace(src)
    },
    insideSrc (src) {
      this.replace(src)
    }
  },
  methods: {
    beforeUpload (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        this.insideSrc = event.srcElement.result
      }
      return false
    },
    replace (src) {
      this.cropper.replace(src)
      this.insideSrc = src
    },
    rotate () {
      this.cropper.rotate(90)
    },
    shrink () {
      this.cropper.zoom(-0.1)
    },
    magnify () {
      this.cropper.zoom(0.1)
    },
    scale (d) {
      this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
    },
    move (...argu) {
      this.cropper.move(...argu)
    },
    crop () {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        this.$emit('on-crop', blob)
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      let dom = document.getElementById(this.imgId)
      this.cropper = new Cropper(dom, {
        preview: `#${this.previewId}`,
        checkCrossOrigin: true,
        aspectRatio: this.ratio
      })
    })
  }
}
</script>

<style lang="less" scoped>
.bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}
.cropper-wrapper {
  height: 340px;
  display: flex;
  justify-content: center;
  .img-box {
    height: 340px;
    width: 430px;
    border: 1px solid #ebebeb;
    display: inline-block;
    .bg;
    img {
      max-width: 100%;
      display: block;
    }
  }
  .right-con {
    display: inline-block;
    width: 170px;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 10px;
    .preview-box {
      height: 150px !important;
      width: 100% !important;
      overflow: hidden;
      border: 1px solid #ebebeb;
      .bg;
    }
    .button-box {
      padding: 10px 0 0;
      .operates {
        line-height: 0;
        .ant-btn {
          width: 50px;
          height: 32px;
        }
      }
    }
  }
}
</style>
