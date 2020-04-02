<script>
  import { onMount } from "svelte";

  export let stories;
  export let controller;

  let selected;

  function select() {
    controller.setStory(...selected);
  }

  onMount(select);
</script>

<select bind:value={selected} on:change={select}>
  {#each stories as story, si}
    {#each story.parts as part, pi}
      <option value={[story, pi]}>{story.name} {part.name}</option>
    {/each}
  {/each}
</select>
