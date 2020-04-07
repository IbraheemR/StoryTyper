<script>
  export let stories;
  export let controller;

  let selectedStory = 0;

  stories[0].load().then(() => {
    console.log("done");
    stories = stories;
  });
</script>

<style>
  .select-screen {
    margin: 1rem;

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

    text-align: center;

    border-width: 3px;
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
  .part .length {
    float: right;
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
          stories[selectedStory].load().then(() => {
            stories = stories;
          });
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
    {#if stories[selectedStory].ready}
      {#each stories[selectedStory].parts as part, pi}
        <div
          class="part element button"
          style="order={stories[selectedStory].parts.length};"
          on:click={() => {
            controller.setStory(stories[selectedStory], pi);
          }}>
          <span class="number">{pi + 1}</span>
          <span class="name">{part.name}</span>
          <span class="length">{part.content.length} Lines</span>
        </div>
      {/each}
    {/if}
  </div>

</div>
