<script>
  import PauseIcon from "carbon-icons-svelte/lib/PauseOutlineFilled32";

  import { onMount } from "svelte";

  import Stats from "./controls/Stats.svelte";
  import StorySelectButton from "./controls/StorySelectButton.svelte";

  export let stories;
  export let controller;

  let pauseplay;

  onMount(() => {
    pauseplay.onclick = () => {
      controller.paused = !controller.paused;
    };
  });
</script>

<style>
  .controls {
    width: 100%;

    display: grid;

    grid-template-columns: 1fr auto 1fr;
  }

  .controls > :global(*) {
    text-align: center;
  }

  .pauseplay {
    fill: white;
    cursor: pointer;

    transition: 200ms all ease;

    font-size: 0;

    position: relative;
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
    class="pauseplay element"
    bind:this={pauseplay}
    class:paused={controller.paused}>

    <PauseIcon />

  </div>
  <StorySelectButton {stories} {controller} />
</div>
