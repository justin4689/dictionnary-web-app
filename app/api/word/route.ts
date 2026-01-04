import { NextResponse } from "next/server";
import { langMap, type LangCode } from "@/lib/lang";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const word = searchParams.get("word")?.trim();
  const lang = (searchParams.get("lang")?.trim() || "fr") as LangCode;

  if (!word) {
    return NextResponse.json({ error: "Missing 'word' query param" }, { status: 400 });
  }

  if (!(lang in langMap)) {
    return NextResponse.json({ error: "Unsupported 'lang'" }, { status: 400 });
  }

  const domain = langMap[lang];
  const url = `https://${domain}/w/api.php?action=query&titles=${encodeURIComponent(
    word
  )}&prop=extracts&format=json&origin=*`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "MyDictionaryApp/1.0",
    },
    // MediaWiki endpoints are generally GET/cacheable
    cache: "no-store",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Wiktionary request failed (${res.status})` },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
