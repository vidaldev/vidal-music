<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <div>
          <div class="box_image">
            <slot name="image"></slot>
          </div>
          <div class="box_text">
            <slot name="body">Algo anduvo mal</slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .box_image {
    width: 275px;
    text-align: center;
    margin: 0 auto;
  }
  .box_text {
    color:white;
    font-size: 18px;
    text-align: center;
    margin: 15px 0;
  }
</style>
