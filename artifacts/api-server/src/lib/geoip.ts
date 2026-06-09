interface GeoResult {
  countryCode: string;
  countryName: string;
  city: string;
  region: string;
}

const cache = new Map<string, GeoResult>();
const MAX_CACHE = 20000;

const PRIVATE_RANGES = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^::1$/,
  /^fc[0-9a-f]{2}:/i,
  /^fd[0-9a-f]{2}:/i,
  /^fe80:/i,
];

function isPrivate(ip: string): boolean {
  const clean = ip.replace(/^::ffff:/, "");
  return PRIVATE_RANGES.some((r) => r.test(clean));
}

export async function lookupGeo(rawIp: string): Promise<GeoResult> {
  const ip = rawIp.replace(/^::ffff:/, "").split(",")[0].trim();
  const empty: GeoResult = { countryCode: "", countryName: "", city: "", region: "" };

  if (!ip || ip === "Unknown" || isPrivate(ip)) return empty;

  const cached = cache.get(ip);
  if (cached) return cached;

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2000);
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,countryCode,country,city,regionName`,
      { signal: ctrl.signal },
    );
    clearTimeout(timer);

    if (!res.ok) return empty;
    const data = (await res.json()) as {
      status: string;
      countryCode?: string;
      country?: string;
      city?: string;
      regionName?: string;
    };

    if (data.status !== "success") return empty;

    const result: GeoResult = {
      countryCode: data.countryCode || "",
      countryName: data.country || "",
      city: data.city || "",
      region: data.regionName || "",
    };

    if (cache.size >= MAX_CACHE) {
      const first = cache.keys().next().value;
      if (first) cache.delete(first);
    }
    cache.set(ip, result);
    return result;
  } catch {
    return empty;
  }
}
