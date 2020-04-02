<script>
  import Controls from "./Controls.svelte";
  import TypingInterface from "./TypingInterface.svelte";

  import Controller from "./controller/Controller";
  import stories from "./controller/stories";

  let controller = new Controller();
</script>

<style>
  main {
    width: 100%;
    max-width: 1000px;
    margin: 1rem;
    padding: 0;

    background-color: var(--border-color) !important;
  }
</style>

<main class="element">
  <TypingInterface {controller} />

  <Controls {stories} {controller} />
</main>
