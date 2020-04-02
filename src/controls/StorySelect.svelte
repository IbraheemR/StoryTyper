<script>
  export let stories;
  export let controller;

  let selectedStory = 0;
</script>

<style>
  .select-screen {
    margin: 1rem;
    padding: 0;

    width: 100%;
    max-width: 1100px;

    height: 100%;
    max-height: 500px;

    background-color: var(--border-color);

    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto 1fr;
    gap: 1rem;

    grid-template-areas: "stories info" "stories parts";
  }

  .stories {
    grid-area: stories;
  }

  .info {
    grid-area: info;
  }

  .info .name {
    font-size: 1.5em;
  }

  .parts {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
  }

  .part {
    width: 95%;
  }

  .part .number {
    float: left;
  }
</style>

<div class="select-screen element-container">

  <div class="stories">
    {#each stories as story, si}
      <div
        class="story element button"
        class:selected={selectedStory == si}
        on:click|stopPropagation={() => {
          selectedStory = si;
        }}>
        {story.name}
      </div>
    {/each}
  </div>

  <div class="info">
    <div class="name">{stories[selectedStory].name}</div>
    {#if stories[selectedStory].author}
      <div class="author">by {stories[selectedStory].author}</div>
    {/if}

  </div>

  <div class="parts">
    {#each stories[selectedStory].parts as part, pi}
      <div
        class="part element button"
        style="order={stories[selectedStory].parts.length};"
        on:click={() => {
          controller.setStory(stories[selectedStory], pi);
        }}>
        <span class="number">{pi + 1}</span>
        <span class="name">{part.name}</span>
      </div>
    {/each}
  </div>

</div>
