import { Check, Palette } from 'lucide-react'
import type { Theme } from '../store/useApp'

type ThemeOption = {
  id: Theme
  name: string
  mood: string
  paper: string
  ink: string
  accent: string
  highlight: string
}

const themeOptions: ThemeOption[] = [
  {
    id: 'bugatti-light',
    name: 'Bugatti light',
    mood: 'Editorial daylight',
    paper: '#f4f4f2',
    ink: '#111111',
    accent: '#111111',
    highlight: '#c3d9f3',
  },
  {
    id: 'bugatti-dark',
    name: 'Bugatti dark',
    mood: 'Quietly expensive',
    paper: '#000000',
    ink: '#ffffff',
    accent: '#ffffff',
    highlight: '#c3d9f3',
  },
  {
    id: 'bmw-m-light',
    name: 'BMW M light',
    mood: 'Track-day daylight',
    paper: '#f4f5f7',
    ink: '#111111',
    accent: '#1c69d4',
    highlight: '#0066b1',
  },
  {
    id: 'bmw-m-dark',
    name: 'BMW M dark',
    mood: 'Carbon & speed',
    paper: '#000000',
    ink: '#ffffff',
    accent: '#1c69d4',
    highlight: '#e22718',
  },
  {
    id: 'cal-light',
    name: 'Cal light',
    mood: 'Friendly scheduling',
    paper: '#ffffff',
    ink: '#111111',
    accent: '#111111',
    highlight: '#3b82f6',
  },
  {
    id: 'cal-dark',
    name: 'Cal dark',
    mood: 'Focused workspace',
    paper: '#101010',
    ink: '#f5f5f5',
    accent: '#ffffff',
    highlight: '#60a5fa',
  },
  {
    id: 'dell-1996-light',
    name: 'Dell 1996 light',
    mood: 'Catalog-era web',
    paper: '#ffffff',
    ink: '#000000',
    accent: '#e91d2a',
    highlight: '#fcc20f',
  },
  {
    id: 'dell-1996-dark',
    name: 'Dell 1996 dark',
    mood: 'Retro night shift',
    paper: '#151515',
    ink: '#ffffff',
    accent: '#e91d2a',
    highlight: '#fcc20f',
  },
  {
    id: 'cloverpriced-original',
    name: 'Cloverpriced original',
    mood: 'The classic green',
    paper: '#ffffff',
    ink: '#000000',
    accent: '#084e46',
    highlight: '#91ef5b',
  },
  {
    id: 'solarized-light',
    name: 'Solarized light',
    mood: 'Warm & focused',
    paper: '#fdf6e3',
    ink: '#073642',
    accent: '#268bd2',
    highlight: '#b58900',
  },
  {
    id: 'solarized-dark',
    name: 'Solarized dark',
    mood: 'Low contrast calm',
    paper: '#002b36',
    ink: '#839496',
    accent: '#2aa198',
    highlight: '#b58900',
  },
  {
    id: 'catppuccin-latte',
    name: 'Catppuccin light',
    mood: 'Soft & playful',
    paper: '#eff1f5',
    ink: '#4c4f69',
    accent: '#1e66f5',
    highlight: '#40a02b',
  },
  {
    id: 'catppuccin-mocha',
    name: 'Catppuccin dark',
    mood: 'Dreamy midnight',
    paper: '#1e1e2e',
    ink: '#cdd6f4',
    accent: '#89b4fa',
    highlight: '#a6e3a1',
  },
  {
    id: 'gruvbox-light',
    name: 'Gruvbox light',
    mood: 'Retro & sunny',
    paper: '#fbf1c7',
    ink: '#3c3836',
    accent: '#458588',
    highlight: '#98971a',
  },
  {
    id: 'gruvbox-dark',
    name: 'Gruvbox dark',
    mood: 'Cozy terminal',
    paper: '#282828',
    ink: '#ebdbb2',
    accent: '#83a598',
    highlight: '#b8bb26',
  },
  {
    id: 'nord-light',
    name: 'Nord light',
    mood: 'Arctic morning',
    paper: '#eceff4',
    ink: '#2e3440',
    accent: '#5e81ac',
    highlight: '#a3be8c',
  },
  {
    id: 'nord-dark',
    name: 'Nord dark',
    mood: 'Polar night',
    paper: '#2e3440',
    ink: '#eceff4',
    accent: '#88c0d0',
    highlight: '#a3be8c',
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo night',
    mood: 'Neon after dark',
    paper: '#1a1b26',
    ink: '#c0caf5',
    accent: '#7aa2f7',
    highlight: '#9ece6a',
  },
  {
    id: 'one-dark',
    name: 'One Dark',
    mood: 'Editor classic',
    paper: '#282c34',
    ink: '#abb2bf',
    accent: '#61afef',
    highlight: '#98c379',
  },
  {
    id: 'dracula',
    name: 'Dracula',
    mood: 'Vampire velvet',
    paper: '#282a36',
    ink: '#f8f8f2',
    accent: '#bd93f9',
    highlight: '#50fa7b',
  },
  {
    id: 'rose-pine',
    name: 'Rosé Pine',
    mood: 'Moonlit softness',
    paper: '#191724',
    ink: '#e0def4',
    accent: '#c4a7e7',
    highlight: '#9ccfd8',
  },
  {
    id: 'rose-pine-dawn',
    name: 'Rosé Pine dawn',
    mood: 'Gentle sunrise',
    paper: '#faf4ed',
    ink: '#575279',
    accent: '#907aa9',
    highlight: '#56949f',
  },
  {
    id: 'ayu-light',
    name: 'Ayu light',
    mood: 'Clear daylight',
    paper: '#fcfcfc',
    ink: '#5c6166',
    accent: '#399ee6',
    highlight: '#86b300',
  },
  {
    id: 'ayu-dark',
    name: 'Ayu dark',
    mood: 'Deep ocean ink',
    paper: '#0b0e14',
    ink: '#bfbdb6',
    accent: '#59c2ff',
    highlight: '#aad94c',
  },
  {
    id: 'monokai',
    name: 'Monokai',
    mood: 'Electric studio',
    paper: '#272822',
    ink: '#f8f8f2',
    accent: '#66d9ef',
    highlight: '#a6e22e',
  },
  {
    id: 'high-contrast',
    name: 'High contrast',
    mood: 'Maximum clarity',
    paper: '#ffffff',
    ink: '#111111',
    accent: '#005fcc',
    highlight: '#008000',
  },
  {
    id: 'oceanic',
    name: 'Oceanic',
    mood: 'Deep water blue',
    paper: '#1b2b34',
    ink: '#d8dee9',
    accent: '#6699cc',
    highlight: '#99c794',
  },
  {
    id: 'forest-night',
    name: 'Forest night',
    mood: 'Moss & moonlight',
    paper: '#14261f',
    ink: '#d8f3dc',
    accent: '#52b788',
    highlight: '#95d5b2',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    mood: 'Electric midnight',
    paper: '#0f1020',
    ink: '#f7f7ff',
    accent: '#ff2a6d',
    highlight: '#05d9e8',
  },
]

type ThemePickerProps = {
  value: Theme
  onChange: (theme: Theme) => void
}

export function ThemePicker({ value, onChange }: ThemePickerProps) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Palette aria-hidden="true" className="text-forest" size={18} />
        <p className="text-[15px] font-semibold">Choose your atmosphere</p>
      </div>
      <p className="mt-1 text-[13px] text-mute">
        Six carefully tuned palettes for every kind of shop.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        {themeOptions.map((option) => {
          const selected = option.id === value

          return (
            <button
              aria-pressed={selected}
              className="theme-choice min-h-[104px] rounded-2xl border p-3 text-left"
              key={option.id}
              onClick={() => onChange(option.id)}
              style={{
                backgroundColor: option.paper,
                borderColor: selected ? option.accent : `${option.ink}33`,
                color: option.ink,
              }}
              type="button"
            >
              <span className="relative z-[1] flex items-start justify-between gap-2">
                <span className="flex gap-1.5 pt-0.5">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: option.accent }}
                  />
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: option.highlight }}
                  />
                </span>
                {selected && <Check aria-hidden="true" size={16} />}
              </span>
              <span className="relative z-[1] mt-5 block text-[13px] font-bold leading-4">
                {option.name}
              </span>
              <span
                className="relative z-[1] mt-1 block text-[11px]"
                style={{ opacity: 0.7 }}
              >
                {option.mood}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
