<script>
  import { writable } from "svelte/store";

  export let controller = {};

  let textInput;

  function keydown(e) {
    if (e.key == "Enter" && controller.story) {
      controller.submit(textInput);
      textInput = "";
    }

    if (!controller.ready) {
      controller.triggerNotReadyEvent();
    }
  }

  function typed() {
    if (!controller.ready) {
      textInput = "";
    } else {
      controller.updateTypedText(textInput);
    }
  }

  function getErrorIndices(storyText, userText) {
    let indices = [];
    for (let [i, char] of userText.split("").entries()) {
      if (char != storyText[i]) {
        indices.push(i);
      }
    }
    return indices;
  }

  let pp;
  $: window.pp = pp;
</script>

<style>
  .main {
    padding: 1rem;
    font-size: 1.3em;
  }

  .current .error {
    position: relative;
  }

  .current .error::before {
    display: inline-block;
    position: absolute;
    bottom: -0.2rem;
    left: 0;

    content: "";
    width: 100%;
    height: 0.2rem;
    background-color: #ff4444;
  }

  input {
    width: 100%;
    background-color: transparent;

    padding: 0;

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
  <div class="current">
    <!-- Add extra spaces to end of current _line to show error if typed too many chars -->

    {#each controller.currentLine.padEnd((textInput || '').length, '\xa0') as char, i}
      {#if getErrorIndices(controller.currentLine, textInput || '').includes(i)}
        <span class="error">{char}</span>
      {:else}{char}{/if}
    {/each}
  </div>

  <input type="text" bind:value={textInput} on:input={typed} />

  <div class="next">{controller.nextLine}</div>
</div>
