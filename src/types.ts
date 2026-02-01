export type Popup = {
  id: string
}

export type PopupState = {
  app: 'panel' | 'combine' | 'overview' | "time" | "terminal"
  mode: 'single' | 'combined'
  role?: 'primary' | 'secondary'
}
