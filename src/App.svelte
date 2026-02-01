<script lang="ts">
  import { onMount } from "svelte";
  import Controller from "./mainWindow/controller.js";
  import { fetchLevel } from "./mainWindow/controller.js";

  let controller: any;
  let started = false;
  let status = "Idle";
  let wmSupported = false;
  let wmPermission: PermissionState | "unknown" = "unknown";
  let screensLabel = "";

  async function refreshWindowManagementPermission() {
    wmSupported = "getScreenDetails" in window;

    try {
      const p = await navigator.permissions.query({
        name: "window-management" as any,
      });
      wmPermission = p.state;

      if (p.state === "granted" && wmSupported) {
        try {
          const details = await (window as any).getScreenDetails();
          screensLabel = `Multiscreen (${details?.screens?.length ?? 0} detected)`;
        } catch {
          screensLabel = "Multiscreen (details unavailable)";
        }
      } else if (p.state === "prompt") {
        screensLabel = "Multiscreen (click to prompt)";
      } else if (p.state === "denied") {
        screensLabel = "Multiscreen (permission denied)";
      } else {
        screensLabel = wmSupported
          ? "Multiscreen (unknown)"
          : "Multiscreen (not supported)";
      }

      p.addEventListener("change", () => {
        refreshWindowManagementPermission();
      });
    } catch {
      wmPermission = "unknown";
      screensLabel = wmSupported
        ? "Multiscreen (permission API unavailable)"
        : "Multiscreen (not supported)";
    }
  }

  async function start() {
    if (started) return;

    status = "Initializing…";
    controller = new Controller();
    await controller.Initialize();

    status = "Starting…";
    await controller.Start();

    started = true;
    status = "Running";
  }

  let cachedLevelData;

  onMount(async () => {
    cachedLevelData = await fetchLevel();
    console.debug("FETCHED LEVEL", cachedLevelData);
    // preload sound here?
  });

  window.addEventListener("message", (e) => {
    console.debug("[EVENT]: ", e)
    if (e.data?.type === 'popupFocused') {
    controller.setFocusedPopup(e.source);
    console.debug("FOCUSED pu: ", e.source)
  }

  if (e.data?.type === 'popupBlurred') {
    controller.clearFocusedPopup(e.source);
  }
    if (e.data?.type === "requestCombine") {
      console.debug("REQUESTCOMBINE--")
      controller.syncPopups()
      controller.switchPopupToCombineByOverlap();
      //controller.movePopups()
    }

    if(e.data?.type === "requestRadio") {
      console.debug("REQUESTRADIO--")
      //controller.switchPopupToCombineByOverlap();
      //controller.movePopups()
      controller.openRadioPopup();
    }
  });

   window.addEventListener('keydown', (event) => {
      //console.log(event.key)
    });
    
    window.addEventListener('keyup', (event) => {
      //console.log(event.key)
    });

  /*  function startFromUserGesture() {
    if (started) return;

    started = true;
    status = 'Opening windows…';

    controller = new Controller(cachedLevelData);

    controller.openWindowsSync();

    continueStartAsync();
  }


    async function continueStartAsync() {
    status = 'Initializing…';
    await controller.Initialize();
    await controller.afterWindowsOpened(); // optional
    status = 'Running';
  } */

  // Optional: trigger the permission prompt explicitly (only works in supported Chromium)
  async function promptMultiscreen() {
    if (!wmSupported) return;
    try {
      await (window as any).getScreenDetails();
    } catch {
      // user may deny; that's fine
    } finally {
      await refreshWindowManagementPermission();
    }
  }

  onMount(async () => {
    await refreshWindowManagementPermission();
  });
</script>

<main class="wrap">
  <h1>Sweet Heist</h1>
  <h2>rHACKoon Central</h2>

  <p>Play as stealthy Pedro and his hacker buddy Pascal as you solve your way through Grandma Jill's house to steal her prized cotton candy.</p>
  <p>A 2-player stealth puzzle made during the Global Gam Jam 2026. The two players work in separate locations and need to communicate verbally to help each other find out the code to grandma Jill's safe.</p>


  <section class="card">
      <h2><bold>Requirements</bold></h2>

      <div class="row">
      <strong>Chrome Browser:</strong>
      <span>Latest version required.</span>
    </div>

    <div class="row">
      <strong>Popups permission:</strong>
      <span>Allow in settings (Check left to the URL > Site Settings > Popups & Redirects or popup alert upon start). There should be more than one popup upon start.</span>
    </div>

    <h2><bold>Information</bold></h2>

    <div class="row">
      <strong>Status:</strong>
      <span>{status}</span>
    </div>

    <div class="row">
      <strong>Window Management:</strong>
      <span>
        {#if wmSupported}
          supported
        {:else}
          not supported
        {/if}
      </span>
    </div>

    <div class="row">
      <strong>Permission:</strong>
      <span>{wmPermission}</span>
    </div>

    <div class="row">
      <strong>Multiscreen:</strong>
      <span>{screensLabel}</span>
    </div>

    

    {#if wmSupported && wmPermission === "prompt"}
      <button class="secondary" on:click={promptMultiscreen}>
        Prompt multiscreen permission
      </button>
    {/if}

    <button on:click={start} disabled={started}>
      {#if started}Running…{:else}Start Hacking{/if}
    </button>

    <!-- <button on:click={startFromUserGesture} disabled={started}>
      FromGesture
    </button> -->

    <!-- <button
      on:click={() => {
        window.open("about:blank", "_blank", "popup,width=300,height=200");
      }}
    >
      Test popup
    </button> -->

    <p class="hint">
      Bugs are expected.
    </p>
  </section>
</main>

<style>
  .wrap {
    max-width: 720px;
    margin: 32px auto;
    padding: 0 16px;
  }
  .card {
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    padding: 16px;
    text-align: left;
  }
  .row {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 2em;
    padding: 6px 0;
  }
  button {
    margin-top: 12px;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background: #F2B83A;
    color: black;
    cursor: pointer;
    font-size: 2em;
  }
  button:disabled {
    opacity: 0.6;
    cursor: default;
  }
  .secondary {
    background: rgba(0, 0, 0, 0.04);
  }
  .hint {
    margin-top: 10px;
    opacity: 0.75;
    font-size: 0.95em;
    line-height: 1.3;
  }
</style>
