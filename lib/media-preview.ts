type CloudinaryTransformOptions = {
  blur?: number;
  crop?: "fill" | "fit" | "limit";
  gravity?: "auto";
  format?: "auto";
  height?: number;
  quality?: "auto" | "auto:good" | number;
  width?: number;
};

function isCloudinaryDeliveryUrl(src: string): boolean {
  return src.includes("res.cloudinary.com") && src.includes("/upload/");
}

function buildCloudinaryTransformString(
  options: CloudinaryTransformOptions,
): string {
  const transforms: string[] = [];

  if (options.format === "auto") transforms.push("f_auto");
  if (options.quality === "auto") transforms.push("q_auto");
  if (options.quality === "auto:good") transforms.push("q_auto:good");
  if (typeof options.quality === "number")
    transforms.push(`q_${options.quality}`);
  if (options.crop === "fill") transforms.push("c_fill");
  if (options.crop === "fit") transforms.push("c_fit");
  if (options.crop === "limit") transforms.push("c_limit");
  if (options.gravity === "auto") transforms.push("g_auto");
  if (typeof options.height === "number")
    transforms.push(`h_${options.height}`);
  if (typeof options.width === "number") transforms.push(`w_${options.width}`);
  if (typeof options.blur === "number")
    transforms.push(`e_blur:${options.blur}`);

  return transforms.join(",");
}

export function optimizeCloudinaryDelivery(
  src?: string | null,
  options: CloudinaryTransformOptions = {},
): string | null {
  if (!src) return null;
  if (!isCloudinaryDeliveryUrl(src)) return src;

  try {
    const url = new URL(src);
    const transformString = buildCloudinaryTransformString(options);
    if (!transformString) return url.toString();

    url.pathname = url.pathname.replace(
      "/upload/",
      `/upload/${transformString}/`,
    );
    return url.toString();
  } catch {
    return src;
  }
}

export function buildBlurPreviewUrl(src?: string | null): string | null {
  if (!src) return null;

  if (isCloudinaryDeliveryUrl(src)) {
    return optimizeCloudinaryDelivery(src, {
      blur: 1200,
      format: "auto",
      quality: 20,
      width: 64,
    });
  }

  try {
    const url = new URL(src);
    url.searchParams.set("w", "64");
    url.searchParams.set("q", "20");
    return url.toString();
  } catch {
    return src;
  }
}

export function buildSocialShareImageUrl(src?: string | null): string | null {
  if (!src) return null;

  if (isCloudinaryDeliveryUrl(src)) {
    return optimizeCloudinaryDelivery(src, {
      crop: "fill",
      format: "auto",
      gravity: "auto",
      height: 630,
      quality: "auto:good",
      width: 1200,
    });
  }

  try {
    const url = new URL(src);
    url.searchParams.set("w", "1200");
    url.searchParams.set("h", "630");
    url.searchParams.set("fit", "cover");
    url.searchParams.set("q", "80");
    return url.toString();
  } catch {
    return src;
  }
}
