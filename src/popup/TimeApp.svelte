<script>
  export let state;
</script>

<section class="time">
  <h2>Time</h2>

  {#if state.role === 'primary'}
    <div class="primary">
      <h1><time>12:00</time></h1>
    </div>
  {:else}
    <div class="secondary">
      <p>You are a secondary window.</p>
      <p>This view is intentionally minimal.</p>
    </div>
  {/if}
</section>

<style>
  .time {
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  .primary {
    padding: 1rem;
  }

  .secondary {
    opacity: 0.5;
    font-size: 0.9em;
  }
</style>
