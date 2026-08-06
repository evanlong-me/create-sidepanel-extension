// NOTE: plugins are passed as imported objects instead of package-name
// strings. Parcel's plugin loader fails to require() packages that use
// node:-prefixed imports internally (e.g. jiti via @tailwindcss/node),
// so the plugin must be loaded through the native ESM import here.
import tailwindcss from '@tailwindcss/postcss'

export default {
  plugins: [tailwindcss()]
}
