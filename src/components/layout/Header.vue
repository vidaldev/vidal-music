<template>
  <section class="hero">
    <div class="hero-head">
      <header class="navbar is-transparent">
        <div class="navbar-brand">
          <a href="#" class="navbar-item">
            <strong>PlatziMusic</strong>
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <router-link to='/vidal-music' class="navbar-item">Buscar</router-link>
              </p>
              <p class="control">
                <router-link to='/vidal-music/about' class="navbar-item">Nosotros</router-link>
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <figure><img src="@/assets/platzi.png" alt="" srcset=""></figure>
        <h1 class="title">Platzi Music</h1>
        <h2 class="subtitle">Canciones que estan <span>Vue</span>-nísimas</h2>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .navbar-item,
  .title,
  .subtitle {
    color: white;
    text-shadow: 1px 1px 2px #282828;
  }
  a.navbar-item:hover,
  a.navbar-item:focus,
  a.navbar-item:focus-within {
    color: #a3ff00;
    outline: none;
    background-color: transparent;
  }
  .subtitle {
    font-style: italic;
  }
  .subtitle span {
    text-decoration: underline
  }
  .hero {
    background-image: url('./../../assets/bg_header.png');
    background-size: cover;
    background-position: center;
  }
  .hero::before {
    content: "";
    display: block;
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 271px;
    top: 0;
    left: 0;
    background: #282566;
    background: -webkit-linear-gradient(bottom, #a33ca8, #282566);
    background: -o-linear-gradient(bottom, #a33ca8, #282566);
    background: -moz-linear-gradient(bottom, #a33ca8, #282566);
    background: linear-gradient(bottom, #a33ca8, #282566);
    opacity: 0.5;
  }
  .hero .hero-head{
    width: 90%;
    margin: 0 auto;
  }
  .hero .hero-body {
    padding: 0 0 2rem 0;
  }
  .hero .hero-body figure img{
    max-width: 112px;
    border-radius: 50%;
    padding: 0;
    -webkit-box-shadow: 2px 2px 3px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 2px 2px 3px 0px rgba(0,0,0,0.75);
    box-shadow: 2px 2px 3px 0px rgba(0,0,0,0.75);
  }
</style>
