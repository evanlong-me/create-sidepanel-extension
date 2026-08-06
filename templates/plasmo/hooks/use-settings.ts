import { useStorage } from '@plasmohq/storage/hook'

type Theme = 'system' | 'light' | 'dark'

interface AppearanceSettings {
  theme: Theme
}

interface SystemSettings {
  notifications: boolean
  syncInterval: number
}

interface UISettings {
  activeTab: string
}

const defaultAppearance: AppearanceSettings = {
  theme: 'system'
}

const defaultSystem: SystemSettings = {
  notifications: true,
  syncInterval: 15
}

const defaultUI: UISettings = {
  activeTab: 'home'
}

export function useSettings() {
  const [appearance, setAppearance, appearanceStore] =
    useStorage<AppearanceSettings>('appearanceSettings', defaultAppearance)
  const [system, setSystem, systemStore] = useStorage<SystemSettings>(
    'systemSettings',
    defaultSystem
  )
  const [ui, setUI, uiStore] = useStorage<UISettings>('uiSettings', defaultUI)

  const loading =
    appearanceStore.isLoading || systemStore.isLoading || uiStore.isLoading

  // Update appearance settings
  const updateAppearance = (updates: Partial<AppearanceSettings>) => {
    setAppearance({ ...appearance, ...updates })
  }

  // Update system settings
  const updateSystem = (updates: Partial<SystemSettings>) => {
    setSystem({ ...system, ...updates })
  }

  // Update UI settings
  const updateUI = (updates: Partial<UISettings>) => {
    setUI({ ...ui, ...updates })
  }

  // Reset all settings (values fall back to the defaults above)
  const resetSettings = () => {
    appearanceStore.remove()
    systemStore.remove()
    uiStore.remove()
  }

  return {
    appearance,
    system,
    ui,
    loading,
    updateAppearance,
    updateSystem,
    updateUI,
    resetSettings
  }
}
