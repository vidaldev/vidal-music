<template>
  <div>
    <section class="section searchbar">
      <nav class="nav">
        <div class="container field is-grouped">
          <input type="text" class="input is-large" placeholder="Buscar Canciones" v-model="searchQuery" @keyup.enter="search" @keyup.esc="clear">
          <a href="#" class="button is-info is-large" @click="search">Buscar</a>
          <a href="#" class="button is-danger is-large" @click="clear">&times;</a>
        </div>
      </nav>
      <div class="container message_count">
        <p>{{ searchMessage }}</p>
      </div>
    </section>
    <transition name="move">
      <pmLoader v-show="isLoading"></pmLoader>
    </transition>
    <pmNotification v-show="showNotification">
      <img src="./../assets/no_audio_green.png" slot="image">
      <p slot="body">No se encontraron resultados</p>
    </pmNotification>
    <section class="section player_album" v-if="showList">
      <pmPlayer></pmPlayer>
    </section>
    <section class="section list_albumes" v-if="showList">
      <div class="container result">
        <div class="columns is-multiline">
          <div class="column is-one-fifth" v-for="t in tracks" :key="t.id">
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
      showList: false,

      selectedTrack: ''
    }
  },
  methods: {
    search () {
      if (!this.searchQuery) {
        return
      }

      if (this.showNotification) {
        setTimeout(() => {
          this.showNotification = false
        }, 1)
      }

      this.isLoading = true
      this.showList = false
      trackService.search(this.searchQuery)
        .then(res => {
          this.showNotification = res.tracks.total === 0
          this.tracks = res.tracks.items
          this.isLoading = false
          this.showList = true
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
    showList () {
      if (this.showNotification || this.isLoading) {
        this.showList = false
      }
    },
    showNotification () {
      if (this.showNotification) {
        this.showList = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .result{
    margin-top: 50px;
  }

  .is-active {
    border: 3px #23d160 solid
  }
  .button.is-info {
    background-color:#98ca3f;
  }
  .button.is-danger {
    background-color: #b71132;
  }
  nav .container input,
  nav .container input:active,
  nav .container a:focus:not(:active),
  nav .container a:not(:active) {
    outline:none;
    border-color: transparent;
    box-shadow: 0 !important;
  }
  nav .container input,
  nav .container a{
    border-radius: 0;
  }
  .message_count {
    color:white;
    font-style: italic;
    font-size: 14px;
    margin-top:5px;
  }
  .list_albumes {
    padding: 0 1.5rem 3rem;
  }
</style>
