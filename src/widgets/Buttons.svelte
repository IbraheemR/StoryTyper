<script>
  import PauseIcon from "carbon-icons-svelte/lib/PauseOutlineFilled32";
  import Maximize32 from "carbon-icons-svelte/lib/Maximize32";
  import Minimize32 from "carbon-icons-svelte/lib/Minimize32";

  export let controller;
  let fullScreen;
</script>

<style>
  .buttons {
    display: flex;
    flex-direction: row;
  }

  .pauseplay,
  .fullscreen {
    font-size: 0;
  }

  .pauseplay.paused {
    fill: var(--border-color);
    background-color: white;
    border-radius: var(--border-rounding);
  }

  .tip {
    grid-area: tip;
  }
</style>

<div class="buttons">

  <div
    class="pauseplay element button center"
    on:click={() => controller.pause(controller.paused)}
    class:paused={controller.paused}>

    <PauseIcon />

  </div>
  <div
    class="fullscreen element button center"
    on:click={() => {
      if (window.fullScreen) {
        document.exitFullscreen().then(() => {
          ({ fullScreen } = window);
        });
      } else {
        document
          .querySelector(':root')
          .requestFullscreen()
          .then(() => {
            ({ fullScreen } = window);
          });
      }
    }}
    class:paused={controller.paused}>

    {#if fullScreen}
      <Minimize32 />
    {:else}
      <Maximize32 />
    {/if}

  </div>

</div>
