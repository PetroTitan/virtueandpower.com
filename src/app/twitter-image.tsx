// Twitter card image. Identical to the OpenGraph image — Twitter's
// summary_large_image format uses the same 1200x630 aspect, so we
// re-export rather than duplicate the layout.
//
// Keeping a separate file (per Next.js conventions) means the
// Metadata API picks up the twitter:image tag automatically; sharing
// the implementation avoids two sources of truth for the layout.

import OpenGraphImage, {
  alt,
  contentType,
  runtime,
  size,
} from "./opengraph-image";

export { alt, contentType, runtime, size };
export default OpenGraphImage;
