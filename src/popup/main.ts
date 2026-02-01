import { mount } from 'svelte'
import '../app.css'
import './popupapp.css'
import PopupApp from './PopupApp.svelte'

mount(PopupApp, {
  target: document.getElementById('popup-app')!
})
