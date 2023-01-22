import type { Plugin } from "vite"

type Layout = {
  name: string
  path: string
  import: string
}

const defineLayoutRegex = /defineLayout\(([^)]+)\)/

const parseDefineLayout = (code: string) => {
  const match = defineLayoutRegex.exec(code)

  if (!match) {
    throw "Unable to parse the `defineLayout` macro"
  }

  return match[1]
}

const getLayouts = (code: string, argument: string): Layout[] => {
  const layouts = argument
    .replace(/[[\]]/g, "")
    .replace(/\s/g, "")
    .split(",")
    .filter(Boolean)

  return layouts.map((componentName, index) => {
    const name = `_InertiaLayout_${index}_`

    const path = getImportPath(code, componentName)

    return {
      name,
      path,
      import: `import ${name} from "${path}"`,
    }
  })
}

const getImportPath = (code: string, componentName: string) => {
  const regex = new RegExp(
    `import\\s+${componentName}\\s+from\\s+['|"](.+)['|"]`,
    "g"
  )

  const match = regex.exec(code)

  if (!match) {
    throw `Component "${componentName}" is not imported correctly`
  }

  return match[1]
}

const transform = (code: string, layouts: Layout[]) => {
  const output = layouts.map((layout) => layout.import).join("\n")

  const components = layouts.map((layout) => layout.name).join(",")

  return (
    output +
    "\n" +
    code.replace(
      "defineComponent({",
      `defineComponent({layout:[${components}],`
    )
  )
}

const transformRaw = (code: string, layouts: Layout[]) => {
  const isTypeScript = /lang=['"]ts['"]/.test(code)

  let output = `<script${isTypeScript ? ' lang="ts"' : ""}>`

  output += layouts.map((layout) => layout.import).join("\n")

  const components = layouts.map((layout) => layout.name).join(",")

  output += `\nexport default { layout: [${components}] } </script>`

  return `${output}${code}`
}

export default (): Plugin => ({
  name: "inertia-define-layout",

  transform: (code: string) => {
    if (!defineLayoutRegex.test(code)) {
      return code
    }

    const argument = parseDefineLayout(code)

    const layouts = getLayouts(code, argument)

    const output = code.replace(defineLayoutRegex, "")

    const isRaw = /<script/g.test(code)

    return isRaw ? transformRaw(output, layouts) : transform(output, layouts)
  },
})
