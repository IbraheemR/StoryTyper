<script>
  import StorySelect from "./StorySelect.svelte";

  export let stories;
  export let controller;

  controller.onNotReady(() => {
    flash = true;
    setTimeout(() => {
      flash = false;
    }, 500);
  });

  let flash;

  let show = false;

  // HACK: adding function to controller to allow acess from every component
  controller.showSelectScreen = () => {
    show = true;
  };
</script>

<svelte:window
  on:keydown={e => {
    if (show && e.key == 'Escape') {
      show = false;
    }
  }} />

<div
  class="control-button element button center"
  class:selected={flash}
  on:click={() => {
    show = true;
  }}>
  {#if controller.ready}
    <div class="small">{controller.story.name}</div>
    {controller.partName}
  {:else}Select Story...{/if}
</div>

<StorySelect
  {stories}
  {controller}
  {show}
  on:click={() => {
    show = false;
  }} />
