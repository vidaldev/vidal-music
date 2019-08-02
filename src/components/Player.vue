<template>
  <div class="content" v-if="track.album">
    <p class="is-128x128">
      <img :src="track.album.images[0].url" alt="Album">
    </p>
    <p>
      <strong>{{ track.name }}</strong>
      <small>[{{ track.duration_ms | ms-to-mm }}]</small>
    </p>
    <p>
      <audio :src="track.preview_url" controls></audio>
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['track'])
  }
}
</script>

<style lang="scss" scoped>
  img{
    width: 124px;
    border-radius: 50%;
  }
  canvas {
    background: #002D3C;
    float:left;
    width: 100%;
    height: 50px;
  }
</style>
