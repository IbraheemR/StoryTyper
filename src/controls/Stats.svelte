<script>
  export let controller;

  let accuracy = 1;

  controller.subscribeChar(controller => {
    accuracy = controller.accuracy;
  });
</script>

<div class="element">ACC:{(accuracy * 100).toFixed(1)}</div>
