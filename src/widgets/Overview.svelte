<script>
  import Overlay from "../Overlay.svelte";
  export let controller = {};

  let show = false;

  controller.onReset(() => {
    show = false;
  });

  controller.onFinish(() => {
    show = true;
  });

  controller.onNotReady(() => {
    flash = true;
    setTimeout(() => {
      flash = false;
    }, 500);
  });

  let flash;

  function newStory() {
    controller.showSelectScreen();
  }
  function nextStory() {
    controller.setStory(controller.story, controller.partNum + 1);
  }
</script>

<style>
  .overview {
    max-width: 700px;

    max-height: 400px;

    font-size: 1.2em;

    display: grid;
    grid-template-areas:
      "story story story lines"
      "time acc wpm note"
      "newstory newstory next next";
  }

  .story {
    grid-area: story;
  }
  .lines {
    grid-area: lines;

    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .time {
    grid-area: time;
  }
  .acc {
    grid-area: acc;
  }
  .wpm {
    grid-area: wpm;
  }
  .next {
    grid-area: next;
  }
  .newstory {
    grid-area: newstory;
  }
  .note {
    grid-area: note;
  }
</style>

<svelte:window on:keydown />
{#if show}
  <Overlay>
    <div class="overview element-container">
      <div class="story element center">
        <div class="small">{controller.story.name}</div>
        {controller.partName}
      </div>

      <div class="lines element center">
        <span class="small">Lines</span>
        <span class="small">Characters</span>

        <span>{controller.typedLines.length}</span>
        <span>{controller.stats.accuracyData.characters}</span>

      </div>

      <div class="time element center">
        <div class="small">Typing Time</div>
        {controller.stats.getTypingTimeString()}
      </div>

      <div class="acc element center">
        <div class="small">Accuracy</div>
        {(controller.stats.calculateAccuracy() * 100).toFixed(1)}%
      </div>

      <div class="wpm element center">
        <div class="small">WPM</div>
        {controller.stats.calculateWPM().toFixed(1)}
      </div>

      {#if controller.story.parts[controller.partNum + 1]}
        <div
          class="next element center button"
          class:selected={flash}
          on:click={nextStory}>
          <span class="small">Up Next:</span>
          {controller.story.parts[controller.partNum + 1].name}
        </div>
      {/if}

      <div
        class="newstory element center button"
        class:selected={flash}
        on:click={newStory}>
        New Story
      </div>

      <div class="note small element">
        note
        <!-- TODO -->
      </div>

    </div>
  </Overlay>
{/if}
