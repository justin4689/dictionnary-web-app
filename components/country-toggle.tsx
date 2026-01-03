"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { type LangCode, useLanguage } from "@/app/providers"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Country = {
  code: string
  label: string
  flag: string
}

const countries: Country[] = [
  { code: "fr", label: "Français", flag: "/flags/FR.svg" },
  { code: "en", label: "English", flag: "/flags/US.svg" },
  { code: "es", label: "Español", flag: "/flags/ES.svg" },
  { code: "de", label: "Deutsch", flag: "/flags/DE.svg" },
]

export function CountryToggle() {
  const [current, setCurrent] = React.useState(countries[0])
  const { setLang } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-3"
        >
          <Image
            src={current.flag}
            alt={current.label}
            width={20}
            height={20}
            className="rounded-sm"
          />
          <span className="hidden sm:inline text-sm">
            {current.label}
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
              alt={country.label}
              width={18}
              height={18}
              className="rounded-sm"
            />
            <span className="text-black">{country.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
