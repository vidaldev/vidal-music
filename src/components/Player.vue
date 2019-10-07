<template>
  <div class="content" v-if="track.album">
    <p class="is-128x128 info-image">
      <img :src="track.album.images[0].url" alt="Album">
    </p>
    <p class="info-track">
      <strong>{{ track.name }}</strong>
      <small>[{{ track.duration_ms | ms-to-mm }}]</small>
    </p>
    <p class='buttons_audio'>
      <button v-on:click="play(track.preview_url)" type="button" v-show="bt_played" class="btn_play_button">
        <img src="../assets/btn_player.png" alt="Play">
      </button>
      <button v-on:click="pause()" type="button" v-show="bt_paused" class="btn_pause_button">
        <img src="../assets/btn_pause.png" alt="Pause">
      </button>
      <br>
      <span>{{ currentTime }} / </span><span style="color:#a1fb01">{{ durationTime }}</span>
      <audio :src="track.preview_url" autoplay @click="animationplay(track.preview_url)" id="audios" ref="audioElm" @onchange="play(track.preview_url)" @timeupdate="onTimeUpdate"></audio>
    </p>
    <div class='bar_view'>
      <canvas id="canvas_bar"></canvas>
      <div id="background_barview"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      showBarView: false,
      bt_paused: false,
      bt_played: true,
      currentTime: `0:0`,
      durationTime: `0:30`
    }
  },
  computed: {
    ...mapState(['track'])
  },
  methods: {
    onTimeUpdate () {
      const secondsact = this.$refs.audioElm.duration
      const hact = Math.floor(secondsact / 3600)
      const mact = Math.floor((secondsact % 3600) / 60)
      const sact = Math.floor(secondsact % 60)

      const fact = [hact, mact > 9 ? mact : hact ? '0' + mact : mact || '0', sact > 9 ? sact : '0' + sact]
        .filter(a => a)
        .join(':')

      if ( fact !== NaN ) {
        this.durationTime = fact
      }
      

      const seconds = this.$refs.audioElm.currentTime
      const hcurrent = Math.floor(seconds / 3600)
      const mcurrent = Math.floor((seconds % 3600) / 60)
      const scurrent = Math.floor(seconds % 60)

      const fcurrent = [hcurrent, mcurrent > 9 ? mcurrent : hcurrent ? '0' + mcurrent : mcurrent || '0', scurrent > 9 ? scurrent : '0' + scurrent]
        .filter(a => a)
        .join(':')

      this.currentTime = fcurrent

      if (secondsact === seconds) {
        this.bt_paused = false
        this.bt_played = true
      }
    },
    animationplay (track) {
      const canvas = document.getElementById('canvas_bar')
      const audio = document.getElementById('audios')
      audio.crossOrigin = 'anonymous'

      const urlmusic = track
      audio.src = urlmusic
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      const ctx = canvas.getContext('2d')
      const context = new AudioContext()
      const src = context.createMediaElementSource(audio)
      const analyser = context.createAnalyser()
      src.connect(analyser)
      analyser.connect(context.destination)
      analyser.fftSize = 16384
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)
      const WIDTH = canvas.width
      const HEIGHT = canvas.height
      // console.log('WIDTH: ', WIDTH, 'HEIGHT: ', HEIGHT)
      const barWidth = (WIDTH / bufferLength) * 85
      // console.log('BARWIDTH: ', barWidth)
      // console.log('TOTAL WIDTH: ', (117 * 10) + (118 * barWidth))
      let barHeight
      let x = 0
      const renderFrame = () => {
        requestAnimationFrame(renderFrame)
        x = 0
        analyser.getByteFrequencyData(dataArray)
        ctx.fillStyle = 'rgba(0,0,0,0.2)'
        ctx.fillRect(0, 0, WIDTH, HEIGHT)
        let r, g, b
        const bars = 100
        for (let i = 0; i < bars; i++) {
          barHeight = (dataArray[i] / 3)
          if (dataArray[i] > 210) {
            r = 194
            g = 0
            b = 250
          } else if (dataArray[i] > 200) {
            r = 135
            g = 0
            b = 173
          } else if (dataArray[i] > 190) {
            r = 161
            g = 251
            b = 1
          } else if (dataArray[i] > 180) {
            r = 171
            g = 255
            b = 25
          } else if (dataArray[i] > 150) {
            r = 110
            g = 173
            b = 0
          } else if (dataArray[i] > 100) {
            r = 97
            g = 116
            b = 65
          } else {
            r = 103
            g = 104
            b = 100
          }

          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.fillRect(x, (HEIGHT - barHeight), barWidth, barHeight)
          x += barWidth + 2
        }
      }
      renderFrame()
      this.showBarView = true
    },
    play (track) {
      if (this.showBarView === false) {
        this.animationplay(track)
      }
      this.$refs.audioElm.play()
      this.bt_played = false
      this.bt_paused = true
    },
    pause () {
      this.$refs.audioElm.pause()
      this.bt_paused = false
      this.bt_played = true
    }
  }
}
</script>

<style lang="scss" scoped>
  img{
    width: 124px;
    border-radius: 50%;
  }
  .content {
    display: grid;
    grid-template-columns: 126px 220px 133px auto;
    align-items: center;
    grid-gap:10px;
  }
  .content p {
    padding: 0;
    margin-bottom: 0;
  }
  audio {
    outline: none;
  }
  .info-track,
  .info-track strong {
    color: white
  }
  .info-track small{
    color: #a3ff00
  }
  .info-image {
    margin: 0 5px ;
  }
  .info-image img {
    margin-top: 4px;
  }
  .buttons_audio {
    text-align: center;
  }
  .buttons_audio span {
    color:white
  }
  .buttons_audio button {
    background-color: transparent;
    border: 0;
    outline: 0;
  }
  .buttons_audio button img {
    width: 50%;
    cursor: pointer;
  }
  .bar_view {
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 90px;
    position: relative;
  }
  #canvas_bar {
    width: 100%;
    height:90px;
  }
  #background_barview {
    width: 100%;
    height: 90px;
    position: absolute;
    top: 0;
    z-index: 2;
    opacity: 0.3;
  }
  @keyframes bg {
    0%{ background-position: 0 0; }
    100%{ background-position: 8px 8px; }
  }
  #audio2 {
    position: absolute;
    top:0;
    z-index: 6;
  }
</style>
