<script>
  export let controller;
</script>

<style>
  .stats {
    display: flex;
    flex-direction: row;
    height: 100%;
  }

  .stats > :last-child {
    flex-grow: 1;
  }

  .stats * {
    flex-direction: column;
  }

  .title {
    font-size: 0.8em;
  }
</style>

<div class="stats">
  <div class="element center">

    <div class="title">ACC</div>
    {(controller.accuracy * 100).toFixed(1)}
  </div>

  <div class="element center">
    <div class="title">SPD</div>
    {(controller.accuracy * 100).toFixed(1)}
  </div>

  <div class="element center">
    {controller.typedLines.length}/{controller.currentPart.content.length}
  </div>
</div>
