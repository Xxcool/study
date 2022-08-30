<template>
  <div>
    <el-input v-model="inputVal" style="margin: 20px 0;" clearable></el-input>
    <el-button type="primary" @click="handleSpeak(inputVal)">文字转语音</el-button>
    <el-button type="warning" @click="handleStopSpeak">停止播放</el-button>
  </div>
</template>

<script>
const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();
export default {
  data() {
    return {
      inputVal: ''
    };
  },
  methods: {
    // 文字转语言播放
    handleSpeak(text){
      msg.text = text;     // 文字内容: 小朋友，你是否有很多问号
      msg.lang = "zh-CN";  // 使用的语言:中文
      msg.volume = 1;      // 声音音量：1  设置将在其中发言的音量。区间范围是0到1，默认是1
      msg.rate = 1;        // 语速：1  设置说话的速度。默认值是1，范围是0.1到10，表示语速的倍数，例如2表示正常语速的两倍
      msg.pitch = 1.5;       // 音高：2  设置说话的音调(音高)。范围从0（最小）到2（最大）。默认值为1
      synth.speak(msg);    // 播放
      //语音结束监听
      // msg.onend = () => {
      //   console.log('结束');
      //重新播放
      //   synth.speak(msg);
      // };
    },
    // 语音停止
    handleStopSpeak(e){
      msg.text = e;
      msg.lang = 'zh-CN';
      synth.cancel(msg);
    }
  },
};
</script>

