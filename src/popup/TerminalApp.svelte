<script lang="ts">
  import { tick } from 'svelte';

  export let state;

  let lines: string[] = [];
  let command = '';
  let outputEl: HTMLDivElement;

  function toTerminalText(value) {
  return Array.isArray(value)
    ? value.join('\n')
    : String(value ?? '');
}

  async function addLine(text: string) {
    lines = [...lines, text];
    await tick();

    const nearBottom =
      outputEl.scrollHeight - outputEl.scrollTop - outputEl.clientHeight < 50;

    if (nearBottom) {
      outputEl.scrollTop = outputEl.scrollHeight;
    }
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();

      addLine(`rHACKoon@Pascal> (${state.role}) ${command}`);

      // output
      /* console.debug("output: ", state.terminalCommands.input === command) */

      let isCommandCorrect = state.terminalCommands.input === command;
      
     /*  addLine(`${isCommandCorrect ? state.terminalCommands.output : state.terminalCommands.error}`);
 */

       const output = isCommandCorrect
      ? toTerminalText(state.terminalCommands.output)
      : state.terminalCommands.error;

    addLine(output);
      command = '';
    }
  }
</script>


<div class="terminal">
  <div class="header">
    (c) 2026 Sweet Heist<br/>
    rHACKoon Terminal [3a.b_c4_v1.0]<br/><br/>
    Type --help to get more information
  </div>

  <div class="output" bind:this={outputEl}>
    {#each lines as line}
      <div class="line">{line}</div>
    {/each}
  </div>

  <div class="input-row">
    <span class="prompt">rHACKoon@Pascal&gt; <small>({state.role})</small></span>
    <input
      bind:value={command}
      on:keydown={handleKey}
      autofocus
    />
  </div>
</div>

<style>
    .body {
        border: none;
    }
  .terminal {
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  color: #F2B83A;
}

.header {
  padding: 8px 12px;
  font-size: 12px;
  opacity: 0.6;
  text-align: left;
}

.output {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  white-space: pre-wrap;
  word-break: break-word;
  color: white;
  text-align: left;
  font-size: 14px;
}

.line {
  margin-bottom: 4px;
}

.input-row {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-top: 1px solid rgba(221, 216, 205, 0.829)}

.prompt {
  margin-right: 8px;
  color: #F2B83A;
}

input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  font-family: inherit;
}

</style>

