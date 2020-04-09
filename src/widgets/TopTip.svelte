<script>
  import { onMount } from "svelte";

  let tipNum = 0;

  const tips = [
    // "Hit pause at anytime to get a save code.", // TODO
    "The WPM counter pauses until you start typing the new line.",
    // "Have a story you want to submit? Get in touch below.",
    // "You can paste in a custom story in story selection.",
    "Use the command ':jump n' to jump to a line."
  ];

  function newTip() {
    if (tips.length > 1) {
      // No other tip to get if only one available
      let old = tipNum;

      tipNum = Math.floor(Math.random() * tips.length);

      if (tipNum == old) tipNum++; // Not going to bother with infinite checking to get new random.
    }
  }

  // onMount(() => {
  //   newTip();
  //   setInterval(newTip, 10 * 1000);
  // });
</script>

<div class="element centre small">Tips: {tips[tipNum]}</div>
