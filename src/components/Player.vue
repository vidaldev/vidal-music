<template>
  <div class="content" v-if="track.album">
    <p class="is-128x128 info-image">
      <img :src="track.album.images[0].url" alt="Album">
    </p>
    <p class="info-track">
      <strong>{{ track.name }}</strong>
      <small>[{{ track.duration_ms | ms-to-mm }}]</small>
    </p>
    <p>
      <button v-on:click="play(track.preview_url)" type="button">P</button>
      <button v-on:click="pause()" type="button">Pa</button>
      <button v-on:click="playing()" type="button">Play</button>
      <audio :src="track.preview_url" autoplay controls @click="animationplay(track.preview_url)" id="audios" ref="audioElm" @onchange="play(track.preview_url)"></audio>
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
      paused: null
    }
  },
  computed: {
    ...mapState(['track'])
  },
  methods: {
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
            // pink
            r = 250
            g = 0
            b = 255
          } else if (dataArray[i] > 200) {
            // yellow
            r = 250
            g = 255
            b = 0
          } else if (dataArray[i] > 190) {
            // yellow/green
            r = 204
            g = 255
            b = 0
          } else if (dataArray[i] > 180) {
            // blue/green
            r = 0
            g = 219
            b = 131
          } else {
            // light blue
            r = 0
            g = 199
            b = 255
          }

          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.fillRect(x, (HEIGHT - barHeight), barWidth, barHeight)
          x += barWidth
        }
      }
      renderFrame()
      this.showBarView = true
    },
    play (track) {
      console.log(track)
      if (this.showBarView === false) {
        this.animationplay(track)
        console.log('barra activada')
      }
      this.$refs.audioElm.play()
    },
    pause () {
      this.$refs.audioElm.pause()
    },
    playing () {
      this.$refs.audioElm.play()
    }
  },
  ready: {
    playing () {
      this.$refs.audioElm.play()
      console.log('aqui')
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
    grid-template-columns: 126px 220px 300px auto;
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
