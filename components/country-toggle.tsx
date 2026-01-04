"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/providers"
import type { LangCode } from "@/lib/lang"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Country = {
  code: string
  labelKey: "lang_fr" | "lang_en" | "lang_es" | "lang_de" | "lang_it"
  flag: string
}

const countries: Country[] = [
  { code: "fr", labelKey: "lang_fr", flag: "/flags/FR.svg" },
  { code: "en", labelKey: "lang_en", flag: "/flags/US.svg" },
  { code: "es", labelKey: "lang_es", flag: "/flags/ES.svg" },
  { code: "de", labelKey: "lang_de", flag: "/flags/DE.svg" },
  { code: "it", labelKey: "lang_it", flag: "/flags/IT.svg" },
]

export function CountryToggle() {
  const [current, setCurrent] = React.useState(countries[0])
  const { lang, setLang, t } = useLanguage()

  React.useEffect(() => {
    const next = countries.find((c) => c.code === lang)
    if (next) setCurrent(next)
  }, [lang])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-3"
        >
          <Image
            src={current.flag}
            alt={t(current.labelKey)}
            width={20}
            height={20}
            className="rounded-sm"
          />
          <span className="hidden sm:inline text-sm">
            {t(current.labelKey)}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {countries.map((country) => (
          <DropdownMenuItem
            key={country.code}
            onClick={() => {
              setCurrent(country)
              setLang(country.code as LangCode)
            }}
            className="flex items-center gap-2"
          >
            <Image
              src={country.flag}
              alt={t(country.labelKey)}
              width={18}
              height={18}
              className="rounded-sm"
            />
            <span className="text-black dark:text-muted-foreground">{t(country.labelKey)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
