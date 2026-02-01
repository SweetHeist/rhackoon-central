import { WindowManager } from "./windowManager";
import { MultiScreenUtil } from "./multiScreen";
/* import type { PopupState } from "../types"; */

export async function fetchLevel() {
  const url = `./data/exampleLevel.json`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(response.statusText);
  const json = await response.json();
  return json;
}

function rectFromPopup(popup) {
  const w = popup.window

  return {
    x: w.GetX(),
    y: w.GetY(),
    width: w.GetWidth(),
    height: w.GetHeight()
  };
}

function rectsOverlap(a, b) {
  return !(
    a.x + a.width  <= b.x ||   // a is left of b
    a.x >= b.x + b.width  ||   // a is right of b
    a.y + a.height <= b.y ||   // a is above b
    a.y >= b.y + b.height      // a is below b
  );
}


function overlaps(popupA, popupB) {
  const rectA = rectFromPopup(popupA);
  const rectB = rectFromPopup(popupB);

  return rectsOverlap(rectA, rectB);
}


export default class Controller {
  #window_manager;
  #screen_details;
  #primary_game_screen;
  #game_windows;
  #game_context;
  #had_focus;
  #is_running;
  #focusedPopup = null;
  /* levelData; */

  constructor() {
    /* this.levelData = levelData; */
    this.#window_manager = new WindowManager();

  }
  async Initialize() {
    await this.#window_manager.Initialize();
    //await LoadLevels(progress_callback);
  }

  async Start() {
    if (this.#is_running)
      throw new Error('Already running');
    this.#is_running = true;
    //PlaySound('start');

    //this.#current_level_number = level_index;
    // Request multi-screen details for additional game functionality.
    // (e.g. knowing when the player exits the aggregate screen space)
    this.#screen_details = await MultiScreenUtil.GetScreenDetails();
    // Show game windows on another screen when available.
    this.#primary_game_screen =
      this.#screen_details?.screens.find(
        s => s != this.#screen_details.currentScreen) ||
      window.screen;
    //await this.LoadLevel(LEVEL_DATA_LIST[this.#current_level_number]);
    await this.openWindows()
  }

  /* StartFromUserGesture() {
    console.log('cachedLevelData:', this.levelData);
  if (this.#is_running) return;
  this.#is_running = true;

  this.openWindowsSync();
} */

  /* openWindowsSync() {
    this.#game_windows = [];
    console.debug(this.levelData)
  
    for (const w of this.levelData.windows) {
      const winPromise = this.#window_manager.AddWindow(
        w.width,
        w.height,
        w.x,
        w.y,
        w.allow_resize,
        w.fullscreen
      );
  
      winPromise.then(win => {
        if (win) this.#game_windows.push(win);
      });
    }
  } */



  //HERE
  async openWindows() {
    let level_data = await fetchLevel()

    this.#game_windows = new Array();
    let windowPromises = [];

    level_data.windows.forEach(async w => {
      // TODO: Post about --enable-features=FullscreenPopupWindows + M113+
      // TODO: Work around requestAnimationFrame not firing on space switch.
      const winPromise = this.#window_manager.AddWindow(
        w.width,
        w.height,
        w.x,
        w.y,
        w.allow_resize,
        w.fullscreen
      );

      winPromise.then(win => {
        if (!win) return;

        

        const popup = {
          id: crypto.randomUUID(),
          window: win,
          state: {
            app: w.ui?.app ?? 'panel',
            mode: w.ui?.mode ?? 'single',
            role: w.ui?.role ?? 'primary',
            terminalCommands: w.ui?.terminalCommands ?? null
          }
        };

        // event listeneeers
                win.GetDomWindow().addEventListener('keydown', (event) => {
                    console.log(window);
                    //window.ShowToast("TITLE","ANYY") // TODO: ?
                    
                });
                win.GetDomWindow().addEventListener('keyup', (event) => {
                    console.log(event);
                });

        this.#game_windows.push(popup);
        this.sendStateToPopup(popup);
      });
    });
  }

  syncPopups(){
    console.debug("SYNCING")
    for (const popup of this.#game_windows) {
      popup.window.Sync()
    }
  }

  movePopups(){
    for (const popup of this.#game_windows) {
      console.debug(popup.window)
      popup.window.GetDomWindow().moveTo(200, 10)
    }
  }

  setFocusedPopup(popup) {
    this.#focusedPopup = popup;
  }

  clearFocusedPopup() {
    this.#focusedPopup = null;
  }

  sendStateToPopup(popup) {
    popup.window.GetDomWindow().postMessage(
      {
        type: 'setState',
        payload: popup.state
      },
      '*'
    );
  }

  /* setPopupState(state: PopupState){
    const popup = this.#game_windows.find(p => p.id === state.id);
  } */

  switchPopupToCombineByInternalId(popupId) {
    const popup = this.#game_windows.find(p => p.id === popupId);
    if (!popup) return;

    popup.state = {
      ...popup.state,
      app: 'combine',
      mode: 'merged'
    };

    this.sendStateToPopup(popup);
  }

  switchPopupToCombineByOverlap(){
    console.debug(this.#game_windows)
    const has_focus = this.#game_windows.find(w => w.window.IsFocused());
    const overlapping = this.#game_windows.filter(p => p !== has_focus && overlaps(p, has_focus));

    console.debug({overlapping})

    for (const popup of overlapping) {
      popup.state.app = 'combine';
      this.sendStateToPopup(popup);
    }

  }

}