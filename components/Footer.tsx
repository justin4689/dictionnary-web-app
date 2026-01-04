"use client";

import { useLanguage } from "@/app/providers";

export default function Footer () {

    const { t } = useLanguage()
    const year = new Date().getFullYear()

    return (
        <footer className="border-t py-2">
            <div className="container text-center text-sm text-muted-foreground">
                {t("footer_copyright", { year })}
            </div>
        </footer>
    )
}


