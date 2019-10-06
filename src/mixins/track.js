const trackMixin = {
  methods: {
    selectTrack () {
      if (!this.track.preview_url) {
        return
      }

      // $('.info-track strong').text()
      this.$store.commit('setTrack', this.track)
    }
  }
}

export default trackMixin
