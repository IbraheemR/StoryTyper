<script>
  export let controller;

  let wpm;

  // Setting seperate wpm var rather than dynamically updating to reduce figure flickering and make calmer

  $: wpm = controller.stats.calculateWPM(
    controller.typedText,
    controller.currentLine
  );

  setInterval(() => {
    wpm = controller.stats.calculateWPM(
      controller.typedText,
      controller.currentLine
    );
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
    {(controller.stats.calculateAccuracy(controller.typedText, controller.currentLine) * 100).toFixed(1)}%
  </div>

  <div class="element center">
    <div class="small">WPM</div>
    {wpm.toFixed(1)}
  </div>

  <div class="element center">
    <div class="small">Line</div>
    {controller.ready ? controller.typedLines.length + 1 : 0}/{controller.currentPart.content.length}
  </div>
</div>
