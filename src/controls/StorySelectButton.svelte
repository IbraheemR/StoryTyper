<script>
  import { onMount } from "svelte";

  import StorySelect from "./StorySelect.svelte";

  export let stories;
  export let controller;

  let storyName = "Select Story...";

  controller.subscribeLine(() => {
    storyName = controller.storyPartString();
  });

  let open;
</script>

<style>
  .control-button {
    line-height: 32px;
  }

  .select-screen-center {
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: #111a;
  }

  .select-screen-center:not(.open) {
    display: none;
  }
</style>

<div
  class="control-button element button"
  on:click={() => {
    open = true;
  }}>
  {controller.storyPartString() || 'Select Story...'}
</div>

<div
  class="select-screen-center"
  class:open
  on:click={() => {
    open = false;
  }}>
  <StorySelect {stories} {controller} />
</div>
