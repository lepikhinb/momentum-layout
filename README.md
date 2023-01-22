# Momentum Layout

Momentum Layout provides a Vue 3 compiler macro to define [persistent layouts](https://inertiajs.com/pages#persistent-layouts:~:text=standard%20Vue%20component.-,Persistent,-layouts) for Inertia.js apps within `<script setup>`.

## Installation

Install the package.

```bash
npm i momentum-layout

# or

yarn add momentum-layout
```

Then, register the plugin by importing it and pushing it to the `plugins` array in
vite.config.ts

```vue
import { defineConfig } from "vite"
import inertiaLayout from "momentum-layout"

export default defineConfig({
  plugins: [
    vue(),
    inertiaLayout(),
  ],
})
```

### TypeScript support

`defineLayout` is a compile-time macro. It's not an actual method that needs to be imported.

To make the TypeScript engine understand the macro, add `momentum-inertia-layout/macro` to the array `types` in `tsconfig.json`.

```json
{
  "compilerOptions": {
    "types": [
      "vite/client",
      "momentum-inertia-layout/macro"
    ]
  }
}
```

## Usage
Import the layout component, and pass it to the `defineLayout` hook.

```vue
<script setup>
import Layout from "@/layouts/guest.vue"

defineLayout(Layout)
</script>

<template>
  <H1>Welcome</H1>
  <p>Hello {{ user.name }}, welcome to your first Inertia app!</p>
</template>
```

You can also create more complex layout arrangements using nested layouts.

```vue
<script setup>
import MainLayout from "@/layouts/main.vue"
import SettingsLayout from "@/layouts/settings.vue"

defineLayout([MainLayout, SettingsLayout])
</script>
```

## Advanced Inertia

[<img src="https://advanced-inertia.com/og.png" width="420px" />](https://advanced-inertia.com)

Take your Inertia.js skills to the next level with my book [Advanced Inertia](https://advanced-inertia.com/).
Learn advanced concepts and make apps with Laravel and Inertia.js a breeze to build and maintain.

## Momentum

Momentum is a set of packages designed to improve your experience building Inertia-powered apps.

- [Modal](https://github.com/lepikhinb/momentum-modal) — Build dynamic modal dialogs for Inertia apps
- [Preflight](https://github.com/lepikhinb/momentum-preflight) — Realtime backend-driven validation for Inertia apps
- [Paginator](https://github.com/lepikhinb/momentum-paginator) — Headless wrapper around Laravel Pagination
- [Trail](https://github.com/lepikhinb/momentum-trail) — Frontend package to use Laravel routes with Inertia
- [Lock](https://github.com/lepikhinb/momentum-lock) — Frontend package to use Laravel permissions with Inertia
- [Vite Plugin Watch](https://github.com/lepikhinb/vite-plugin-watch) — Vite plugin to run shell commands on file changes

## Credits

- [Boris Lepikhin](https://twitter.com/lepikhinb)
- [Enzo Innocenzi](https://gist.github.com/innocenzi/5334b9679c35465defe72bdb57dd541c)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
