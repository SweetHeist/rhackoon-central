<script lang="ts">
  import { tick } from "svelte";

  export let state;

  let lines: string[] = [];
  let command = "";
  let outputEl: HTMLDivElement;

  // Little rascal. You should be hacking this...
  const routineState = {
  solution: {
    "00": "radio",
    "10": "bath_cabinet",
    "20": "door",
    "30": "kitchen",
    "40": "tv",
    "50": "fridge",
  },
  assigned: {},
  clue: "Assignment successful, the next clue should be on the fridge..."
};

  function parseAssignCommand(input) {
    // grandma jill --routine kitchen --time 20
    const parts = input.split(" ");

    const routineIndex = parts.indexOf("--routine");
    const timeIndex = parts.indexOf("--time");

    if (routineIndex === -1 || timeIndex === -1) return null;

    const routine = parts[routineIndex + 1];
    const time = parts[timeIndex + 1];

    if (!routine || !time) return null;

    return { routine, time };
  }

  function findCommand(input) {
    return state.terminalCommands.commands.find((cmd) => {
      if (Array.isArray(cmd.input)) {
        return cmd.input.includes(input);
      }
      return cmd.input === input;
    });
  }

  function toTerminalText(value) {
    return Array.isArray(value) ? value.join("\n") : String(value ?? "");
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
  if (e.key === "Enter") {
    e.preventDefault();

    addLine(`rHACKoon@Pascal> (${state.role}) ${command}`);

    // ---- DYNAMIC ROUTINE COMMANDS FIRST ----
    if (state.role === "routine") {

      // assignment
      if (command.includes("--routine") && command.includes("--time")) {
        const parsed = parseAssignCommand(command);

        if (!parsed) {
          addLine("invalid syntax. try --help");
        } else {
          const { routine, time } = parsed;

          if (!routineState.solution[time]) {
            addLine(`invalid time slot: ${time}`);
          } else if (routineState.solution[time] !== routine) {
            addLine(`incorrect assignment: ${routine} ≠ ${time}`);
          } else {
            routineState.assigned[time] = routine;
            addLine(toTerminalText([
              "Assigned:",
              `  ${routine} > ${time}`
            ]));
          }
        }

        command = "";
        return;
      }

      // clue
      if (command === "grandma jill --clue") {
        const solved = Object.keys(routineState.solution).every(
          time => routineState.assigned[time] === routineState.solution[time]
        );

        if (solved) {
          addLine(routineState.clue);
        } else {
          addLine(
            `routine incomplete. ${
              Object.keys(routineState.solution).length -
              Object.keys(routineState.assigned).length
            } missing.`
          );
        }

        command = "";
        return;
      }
    }

    // ---- STATIC COMMANDS (unchanged) ----
    const cmd = findCommand(command);

    if (!cmd) {
      addLine(state.terminalCommands.fallbackError);
    } else if (cmd.output) {
      addLine(toTerminalText(cmd.output));
      if(cmd.action == 'openRadio') {
        window.opener?.postMessage({ type: "requestRadio" }, "*");
      }
    }

    command = "";
  }
}

</script>

<div class="terminal">
  <div class="header">
    (c) 2026 Sweet Heist<br />
    rHACKoon Terminal [3a.b_c4_v1.0]<br /><br />
    Type --help to get more information
  </div>

  <div class="output" bind:this={outputEl}>
    {#each lines as line}
      <div class="line">{line}</div>
    {/each}
  </div>

  <div class="input-row">
    <span class="prompt">rHACKoon@Pascal&gt; <small>({state.role})</small></span
    >
    <input bind:value={command} on:keydown={handleKey} autofocus />
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
    color: #f2b83a;
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
    border-top: 1px solid rgba(221, 216, 205, 0.829);
  }

  .prompt {
    margin-right: 8px;
    color: #f2b83a;
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
