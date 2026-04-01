type CloudinaryTransformOptions = {
  blur?: number
  format?: "auto"
  quality?: "auto" | number
  width?: number
}

function isCloudinaryDeliveryUrl(src: string): boolean {
  return src.includes("res.cloudinary.com") && src.includes("/upload/")
}

function buildCloudinaryTransformString(options: CloudinaryTransformOptions): string {
  const transforms: string[] = []

  if (options.format === "auto") transforms.push("f_auto")
  if (options.quality === "auto") transforms.push("q_auto")
  if (typeof options.quality === "number") transforms.push(`q_${options.quality}`)
  if (typeof options.width === "number") transforms.push(`w_${options.width}`)
  if (typeof options.blur === "number") transforms.push(`e_blur:${options.blur}`)

  return transforms.join(",")
}

export function optimizeCloudinaryDelivery(
  src?: string | null,
  options: CloudinaryTransformOptions = {},
): string | null {
  if (!src) return null
  if (!isCloudinaryDeliveryUrl(src)) return src

  try {
    const url = new URL(src)
    const transformString = buildCloudinaryTransformString(options)
    if (!transformString) return url.toString()

    url.pathname = url.pathname.replace("/upload/", `/upload/${transformString}/`)
    return url.toString()
  } catch {
    return src
  }
}

export function buildBlurPreviewUrl(src?: string | null): string | null {
  if (!src) return null

  if (isCloudinaryDeliveryUrl(src)) {
    return optimizeCloudinaryDelivery(src, {
      blur: 1200,
      format: "auto",
      quality: 20,
      width: 64,
    })
  }

  try {
    const url = new URL(src)
    url.searchParams.set("w", "64")
    url.searchParams.set("q", "20")
    return url.toString()
  } catch {
    return src
  }
}
