<template>
  <div>
    <div>
      <div class="box" v-html="textVal" contenteditable id="box"></div>
    </div>
    <button @click="pasteHtmlAtCaret('手机号')">插入元素</button>
    <!-- <button @click="submit">submit</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      textVal: "",
    };
  },
  methods: {
    //div插入内容
    pasteHtmlAtCaret(html) {
      let sel, range;
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          // Range.createContextualFragment() would be useful here but is
          // only relatively recently standardized and is not supported in
          // some browsers (IE9, for one)
          let el = document.createElement("div");
          el.innerHTML = `<span contenteditable="false" style="color: red">【${html}】</span>`; //html;
          let frag = document.createDocumentFragment(),
            node,
            lastNode;
            console.log(node, el)
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);

          // Preserve the selection
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
        console.log("2");
      }
    },
    submit() {
      console.log(this.textVal);
    },
  },
};
</script>

<style scoped lang="less">
.box {
  border: 1px solid red;
  margin-bottom: 10px;
  height: 100px;
  border-radius: 8px;
  padding: 10px;
}
</style>
