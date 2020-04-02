<script>
  export let controller;

  let textInput;

  function keydown(e) {
    if (e.key == "Enter" && controller.story) {
      controller.submit(textInput);
      textInput = "";
    }
  }

  $: controller.updateTypedText(textInput);

  let currentLine = "";
  let nextLine = "";

  controller.subscribeLine(() => {
    currentLine = controller.currentLine;
    nextLine = controller.nextLine;
  });
</script>

<style>
  .main {
    padding: 1rem;
    font-size: 1.3em;
  }

  .current {
  }

  input {
    width: 100%;

    background-color: transparent;
    border: none;
    border-bottom: 2px solid white;

    margin: 1rem 0;

    font-size: inherit;
    color: var(--text-color);
  }

  .next {
    color: #777777;
  }
</style>

<svelte:window on:keydown={keydown} />
<div class="element main">
  <div class="current">{currentLine}</div>

  <input type="text" bind:value={textInput} />

  <div class="next">{nextLine}</div>
</div>
