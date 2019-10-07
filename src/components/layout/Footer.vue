<template>
  <footer class="footer">
    <section class="section player_album">
      <pmPlayer></pmPlayer>
    </section>
    <div class="container">
      <div class="content has-text-centered">
        <p>
          Elaborado por <u>VidalDev</u>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import pmPlayer from '@/components/Player.vue'

export default {
  components: { pmPlayer }
}
</script>

<style lang="scss" scoped>
  footer.footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 168px;
    background: rgba(40,40,40,0);
    background: -moz-linear-gradient(top, rgba(40,40,40,0) 0%, rgba(40,40,40,0.37) 37%, rgba(0,0,0,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(40,40,40,0)), color-stop(37%, rgba(40,40,40,0.37)), color-stop(100%, rgba(0,0,0,1)));
    background: -webkit-linear-gradient(top, rgba(40,40,40,0) 0%, rgba(40,40,40,0.37) 37%, rgba(0,0,0,1) 100%);
    background: -o-linear-gradient(top, rgba(40,40,40,0) 0%, rgba(40,40,40,0.37) 37%, rgba(0,0,0,1) 100%);
    background: -ms-linear-gradient(top, rgba(40,40,40,0) 0%, rgba(40,40,40,0.37) 37%, rgba(0,0,0,1) 100%);
    background: linear-gradient(to bottom, rgba(40,40,40,0) 0%, rgba(40,40,40,0.37) 37%, rgba(0,0,0,1) 100%);
  }
  .player_album {
    width: 100%;
    background: rgba(64,59,191,0.8);
    background: -moz-linear-gradient(-45deg, rgba(64,59,191,0.8) 0%, rgba(163,60,168,0.8) 100%);
    background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(64,59,191,0.8)), color-stop(100%, rgba(163,60,168,0.8)));
    background: -webkit-linear-gradient(-45deg, rgba(64,59,191,0.8) 0%, rgba(163,60,168,0.8) 100%);
    background: -o-linear-gradient(-45deg, rgba(64,59,191,0.8) 0%, rgba(163,60,168,0.8) 100%);
    background: -ms-linear-gradient(-45deg, rgba(64,59,191,0.8) 0%, rgba(163,60,168,0.8) 100%);
    background: linear-gradient(135deg, rgba(64,59,191,0.8) 0%, rgba(163,60,168,0.8) 100%);
    position: fixed;
    bottom: 0;
    z-index: 2;
    padding: 0;
    left: 0;
  }
</style>
