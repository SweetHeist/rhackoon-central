<script>
  export let state;
</script>

<section class="combine">
  <h2>Combined View</h2>

  {#if state.role === 'primary'}
    <div class="primary">
      <p>You are the primary window.</p>
      <p>Show expanded controls here.</p>
    </div>
  {:else}
    <div class="secondary">
      <p>You are a secondary window.</p>
      <p>This view is intentionally minimal.</p>
    </div>
  {/if}
</section>

<style>
  .combine {
    padding: 1rem;
  }

  .primary {
    padding: 1rem;
  }

  .secondary {
    opacity: 0.5;
    font-size: 0.9em;
  }
</style>
