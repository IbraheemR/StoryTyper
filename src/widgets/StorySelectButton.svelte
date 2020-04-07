<script>
  import { onMount } from "svelte";

  import StorySelect from "./StorySelect.svelte";

  export let stories;
  export let controller;

  controller.subscribeNotReady(() => {
    flash = true;
    setTimeout(() => {
      flash = false;
    }, 500);
  });

  let flash;

  let open;
</script>

<style>
  .select-screen-center {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: #222;
  }

  .select-screen-center:not(.open) {
    display: none;
  }
</style>

<svelte:window
  on:keydown={e => {
    if (open && e.key == 'Escape') {
      open = false;
    }
  }} />

<div
  class="control-button element button center"
  class:selected={flash}
  on:click={() => {
    open = true;
  }}>
  {#if controller.ready}
    <div class="small">{controller.story.name}</div>
    {controller.partName}
  {:else}Select Story...{/if}
</div>

<div
  class="select-screen-center"
  class:open
  on:click={() => {
    open = false;
  }}>
  <StorySelect {stories} {controller} />
</div>
