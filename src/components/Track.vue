<template>
  <div class="card" v-if="track.album">
    <div class="card-image">
      <figure class="image is-1by1">
        <img :src="track.album.images[0].url" alt="Album">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="track.album.images[0].url" alt="Album">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-6">
            <strong>{{ track.name | cut-description }}</strong>
          </p>
          <p class="subtitle is-6">{{ track.artist }}</p>
        </div>
      </div>
      <div class="content media-info">
          <small class="media_ms">{{ track.duration_ms | ms-to-mm }}</small>
          <nav class="level media_info">
            <div class="level-left">
              <button class="level-item button is-primary">
                <span class="icon is-small" @click="selectTrack">▶</span>
              </button>
              <button class="level-item button is-warning">
                <span class="icon is-small" @click="goToTrack(track.id)">🌏</span>
              </button>
            </div>
          </nav>
        </div>
    </div>
  </div>
</template>

<script>
import trackMixin from '@/mixins/track'
export default {
  mixins: [trackMixin],
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToTrack (id) {
      if (!this.track.preview_url) { return }
      this.$router.push({ name: 'track', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
  .media-info {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
  }
  .media-info .media_info {
    justify-content: flex-end;
  }
  p.title {
    max-height: 48px;
    overflow: hidden;
  }
</style>
