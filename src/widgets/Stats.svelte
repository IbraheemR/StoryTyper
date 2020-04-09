<script>
  export let controller;

  let wpm;

  $: wpm = controller.stats.calculateWPM(controller.typedText);

  setInterval(() => {
    wpm = controller.stats.calculateWPM(controller.typedText);
  }, 500);
</script>

<style>
  .stats {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .stats > * {
    flex-grow: 1;
  }
</style>

<div class="stats">
  <div class="element center">

    <div class="small">ACC</div>
    {(controller.stats.calculateAccuracy(controller.typedText, controller.currentLine) * 100).toFixed(1)}
  </div>

  <div class="element center">
    <div class="small">WPM</div>
    {wpm.toFixed(1)}
  </div>

  <div class="element center">
    {controller.typedLines.length}/{controller.currentPart.content.length}
  </div>
</div>
