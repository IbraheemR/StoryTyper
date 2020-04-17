<script>
  import TypingInterface from "./widgets/TypingInterface.svelte";
  import Stats from "./widgets/Stats.svelte";
  import Buttons from "./widgets/Buttons.svelte";
  import StorySelectButton from "./widgets/StorySelectButton.svelte";
  import TopTip from "./widgets/TopTip.svelte";
  import Overview from "./widgets/Overview.svelte";

  import Controller from "./controller/Controller";
  import stories from "./controller/stories";

  let controller = new Controller();

  // trigger svelte updates
  controller.onLineTyped(() => {
    controller = controller;
  });
  controller.onCharTyped(() => {
    controller = controller;
  });
</script>

<style>
  main {
    width: 100%;
    max-width: 1000px;
    margin: 1rem;

    display: grid;

    grid-template-columns: 1fr auto 1fr;
    grid-template-areas:
      "type type type"
      "stats buttons story"
      "stats tip tip";
  }

  main > * {
    height: 100%;
    display: flex;
    align-items: stretch;
  }

  main > * > :global(*) {
    flex-grow: 1;
  }

  .type {
    grid-area: type;
  }

  .stats {
    grid-area: stats;
  }

  .buttons {
    grid-area: buttons;
  }

  .story {
    grid-area: story;
  }

  .tip {
    grid-area: tip;
  }
</style>

<main class="element-container">
  <div class="type">
    <TypingInterface {controller} />
  </div>

  <div class="stats">
    <Stats {controller} />

  </div>

  <div class="buttons">
    <Buttons {controller} />

  </div>

  <div class="story">
    <StorySelectButton {stories} {controller} />
  </div>

  <div class="tip">
    <TopTip />
  </div>

</main>

<Overview {controller} />
