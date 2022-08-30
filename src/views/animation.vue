<template>
  <div class="wrap">
    <div class="shade">
      <canvas class="canvas" id="pag" style="width: 800px"></canvas>
    </div>
  </div>
</template>

<script>
import Stats from "stats.js";
export default {
  created() {
    this.init();
  },
  mounted() {
    var stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);

    function animate() {
      stats.begin();

      // monitored code goes here

      stats.end();

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  },
  methods: {
    async init() {
      // const PAG = await window.libpag.PAGInit();
      // const FFAVC = await window.ffavc.FFAVCInit();
      // const ffavcDecoderFactory = new FFAVC.FFAVCDecoderFactory();
      // PAG.registerSoftwareDecoderFactory(ffavcDecoderFactory);
      // const url = 'login_bmp.pag';
      // fetch(url)
      // 	.then((response) => response.blob())
      // 	.then(async (blob) => {
      // 		const file = new window.File([blob], url.replace(/(.*\/)*([^.]+)/i, '$2'));
      // 		console.log(file);
      // 		const pagFile = await PAG.PAGFile.load(file);
      // 		console.log(pagFile)
      // 		document.getElementById('pag').width = pagFile.width();
      // 		document.getElementById('pag').height = pagFile.height();
      // 		const pagView = await PAG.PAGView.init(pagFile, '#pag');
      // 		pagView.setRepeatCount(0);
      // 		await pagView.play();
      // 	});
      const pagUrl = "login.pag";
      // Initialize pag webassembly module.
      const PAG = await window.libpag.PAGInit();
      // Initialize ffavc webassembly module.
      if(navigator.userAgent.indexOf('Firefox') > -1) {
        const FFAVC = await window.ffavc.FFAVCInit();
        const ffavcDecoderFactory = new FFAVC.FFAVCDecoderFactory();
        PAG.registerSoftwareDecoderFactory(ffavcDecoderFactory);
      }
      // Fetch pag file.
      const buffer = await fetch(pagUrl).then((response) =>
        response.arrayBuffer()
      );
      // Load the PAGFile from file.
      const pagFile = await PAG.PAGFile.load(buffer);
      // Set the width from the PAGFile.
      const canvas = document.getElementById("pag");
      canvas.width = pagFile.width();
      canvas.height = pagFile.height();
      // Create PAGView.
      const pagView = await PAG.PAGView.init(pagFile, canvas);
      // Set PAGView play infinity.
      pagView.setRepeatCount(0);
      await pagView.play();
    },
  },
};
</script>

<style lang="less">
.wrap {
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.right {
  width: 500px;
  height: 500px;
  border: 2px solid red;
}
</style>
