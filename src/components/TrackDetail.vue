<template>
  <div class="container" v-if="track && track.id">
    <div class="columns">
      <div class="column is-3 has-text-centered">
        <figure class="media-left">
          <p class="image">
            <img :src="track.album.images[0].url">
          </p>
          <p class="button-bar">
            <button class="level-item button is-primary">
              <span class="icon is-small" @click="selectTrack">▶</span>
            </button>
          </p>
        </figure>
      </div>
      <div class="column is-8">
        <div class="panel">
          <div class="panel-heading">
            <h1 class="title">{{ trackTitle }}</h1>
          </div>
          <div class="panel-block">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <ul>
                    <li>
                      <strong>Album:&nbsp;</strong>
                      <span>{{ track.album.name}}</span>
                    </li>
                    <li>
                      <strong>Artista:&nbsp;</strong>
                      <span>{{ track.artists[0].name}}</span>
                    </li>
                    <li>
                      <strong>Duracion:&nbsp;</strong>
                      <span>{{ track.duration_ms | ms-to-mm }}</span>
                    </li>
                    <li>
                      <strong>Numero de Track:&nbsp;</strong>
                      <span>{{ track.track_number }}</span>
                    </li>
                  </ul>
                </div>
                <nav class="level">
                  <div class="level-left">
                    <a class="level-item"></a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

import trackMixin from '@/mixins/track'
export default {
  mixins: [trackMixin],
  computed: {
    ...mapState(['track']),
    ...mapGetters(['trackTitle'])
  },
  created () {
    const id = this.$route.params.id
    if (!this.track || !this.track.id || this.track.id !== id) {
      this.getTrackById({ id })
        .then(() => {
          console.log('Track loaded...')
        })
    }
  },
  methods: {
    ...mapActions(['getTrackById'])
  }
}
</script>

<style lang="scss" scoped>
 .columns {
   margin: 20px;
 }
 .button-bar {
   margin-top: 20px;
 }
 .content ul {
   color:white;
 }
 .content ul li strong {
   color: #a3ff00;
 }
</style>
