import type { Component } from "vue"

declare global {
  const defineLayout: (...components: Component[]) => void
}

export {}
