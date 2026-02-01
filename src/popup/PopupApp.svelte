<script lang="ts">
  import CombineApp from "./CombineApp.svelte";
  import PanelApp from "./PanelApp.svelte";
  import TimeApp from "./TimeApp.svelte";
  import { type PopupState } from "../types";
    import TerminalApp from "./TerminalApp.svelte";
    import GrannyRadioApp from "../grannyradio/GrannyRadioApp.svelte";
    import PicApp from "./PicApp.svelte";
    import AsciiApp from "./AsciiApp.svelte";

  let state = {
    app: "panel",
    mode: "single",
    role: "primary",
  };

  window.addEventListener("message", (e) => {
    if (e.data?.type === "setState") {
      state = { ...state, ...e.data.payload };
    }
  });
</script>

{#if state.app === "panel"}
  <PanelApp {state} />
{:else if state.app === "combine"}
  <CombineApp {state} />
{:else if state.app === "time"}
  <TimeApp {state} />
{:else if state.app === "terminal"}
  <TerminalApp {state} />
{:else if state.app === "radio"}
  <GrannyRadioApp {state} />
{:else if state.app === "pic"}
  <PicApp {state} />
  {:else if state.app === "ascii"}
  <AsciiApp {state} />
{:else}
  <div>Unknown app</div>
{/if}
