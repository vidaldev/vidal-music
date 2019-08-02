<template>
  <section class="hero is-success">
    <div class="hero-head">
      <header class="nav">
        <div class="container">
          <div class="nav-left">
            <div class="nav-item">
              <strong>PlatziMusic</strong>
            </div>
          </div>
          <div class="nav-right nav-menu">
            <router-link to='/' class="nav-item">Buscar</router-link>
            <router-link to='about' class="nav-item">Nosotros</router-link>
          </div>
        </div>
      </header>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Platzi Music</h1>
        <h2 class="subtitle">Canciones que estan Vue-nisimas</h2>
        <pmPlayer></pmPlayer>
      </div>
    </div>
  </section>
</template>

<script>
import pmPlayer from '@/components/Player.vue'
export default {
  components: { pmPlayer }
}
</script>
