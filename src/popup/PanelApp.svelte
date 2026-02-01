<script>
  export let state;

  // purely local UI state
  let collapsed = false;

  function toggle() {
    collapsed = !collapsed;
  }
</script>

<div>
  <small class="window-title">Terminal 3a.b_c4 v1.0</small>
  <button
    on:click={() => {
      console.debug(window.opener)
      window.opener?.postMessage({ type: "requestCombine" }, "*");
    }}
  >
    Combine
  </button>
  <section class="panel">
    <header>
      <h2>Panel</h2>

      <button on:click={toggle}>
        {collapsed ? "▶" : "▼"}
      </button>
    </header>

    {#if !collapsed}
      <div class="content">
        <p>Mode: {state.mode}</p>
        <p>Role: {state.role}</p>

        {#if state.mode === "combined"}
          <p class="hint">This panel is part of a combination.</p>
        {/if}
      </div>
    {/if}
  </section>
</div>

<style>
  .panel {
    padding: 1rem;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hint {
    opacity: 0.6;
    font-size: 0.9em;
  }

  .window-title {
    color: black;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
