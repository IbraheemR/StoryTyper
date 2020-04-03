<script>
  import PauseIcon from "carbon-icons-svelte/lib/PauseOutlineFilled32";
  import Maximize32 from "carbon-icons-svelte/lib/Maximize32";
  import Minimize32 from "carbon-icons-svelte/lib/Minimize32";

  import { onMount } from "svelte";

  import Stats from "./controls/Stats.svelte";
  import StorySelectButton from "./controls/StorySelectButton.svelte";

  export let stories;
  export let controller;

  let fullScreen = false;
</script>

<style>
  .controls {
    width: 100%;

    display: grid;

    grid-template-columns: 1fr auto auto 1fr;
  }

  .controls > :global(*) {
    text-align: center;
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
</style>

<div class="controls">
  <Stats {controller} />
  <div
    class="pauseplay element button"
    on:click={() => {
      controller.paused = !controller.paused;
    }}
    class:paused={controller.paused}>

    <PauseIcon />

  </div>
  <div
    class="fullscreen element button"
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
  <StorySelectButton {stories} {controller} />
</div>
