<template>
  <div>
    <pmNotification v-show="showNotification">
      <p slot="body">No se encontraron resultados</p>
    </pmNotification>
    <transition name="move">
      <pmLoader v-show="isLoading"></pmLoader>
    </transition>
    <section class="section" v-show="!isLoading">
      <nav class="nav">
        <div class="container">
          <input type="text" class="input is-large" placeholder="Buscar Canciones" v-model="searchQuery" @keyup.enter="search" @keyup.esc="clear">
          <a href="#" class="button is-info is-large" @click="search">Buscar</a>
          <a href="#" class="button is-danger is-large" @click="clear">&times;</a>
        </div>
      </nav>
      <div class="container">
        <p>{{ searchMessage }}</p>
      </div>
      <div class="container result">
        <div class="columns is-multiline">
          <div class="column is-one-quarter" v-for="t in tracks" :key="t.id">
              <pmTrack :class="{ 'is-active': t.id === selectedTrack }" :track="t" @select="setSelectedTrack" v-blur="t.preview_url"></pmTrack>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import trackService from '@/services/track'

import pmTrack from '@/components/Track.vue'

import pmNotification from '@/components/shared/Notification.vue'
import pmLoader from '@/components/shared/Loader.vue'
export default {
  name: 'app',
  components: { pmTrack, pmLoader, pmNotification },
  data () {
    return {
      searchQuery: '',
      tracks: [],

      isLoading: false,
      showNotification: false,

      selectedTrack: ''
    }
  },
  methods: {
    search () {
      if (!this.searchQuery) {
        return
      }

      this.isLoading = true

      trackService.search(this.searchQuery)
        .then(res => {
          this.showNotification = res.tracks.total === 0
          this.tracks = res.tracks.items
          this.isLoading = false
        })
    },
    setSelectedTrack (id) {
      this.selectedTrack = id
    },
    clear () {
      this.searchQuery = ''
    }
  },
  computed: {
    searchMessage () {
      return `Encontrados: ${this.tracks.length}`
    }
  },
  watch: {
    showNotification () {
      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss">
  .result{
    margin-top: 50px;
  }

  .is-active {
    border: 3px #23d160 solid
  }

</style>
