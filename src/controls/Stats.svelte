<script>
  export let controller;
</script>

<div class="element">
  ACC:{(controller.accuracy * 100).toFixed(1)}
  <br />
  {controller.typedLines.length}/{controller.currentPart.content.length}
</div>
