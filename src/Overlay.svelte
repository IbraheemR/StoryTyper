<script>
  export let show = true;
  export let click = () => {};
</script>

<style>
  .overlay {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: #2229;
  }

  .hide {
    display: none;
  }
</style>

<div class="overlay element-container" class:hide={!show} on:click>
  <slot />
</div>
