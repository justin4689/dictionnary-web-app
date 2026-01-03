"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { SearchIcon, Volume2Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/app/providers";
import { getWord, speak, type WiktionaryApiResponse } from "@/lib/api";

export default function MainSection() {
  const [queryWord, setQueryWord] = React.useState("");
  const [submittedWord, setSubmittedWord] = React.useState<string | null>(null);
  const { lang } = useLanguage();

  const wordQuery = useQuery<WiktionaryApiResponse>({
    queryKey: ["wiktionary", lang, submittedWord],
    queryFn: async () => {
      if (!submittedWord) {
        throw new Error("No word submitted");
      }
      return getWord(submittedWord, lang);
    },
    enabled: Boolean(submittedWord),
  });

  const page = React.useMemo(() => {
    const pages = wordQuery.data?.query?.pages;
    if (!pages) return null;
    const firstKey = Object.keys(pages)[0];
    return firstKey ? pages[firstKey] : null;
  }, [wordQuery.data]);

  const isMissing = React.useMemo(() => {
    if (!page) return false;
    return Object.prototype.hasOwnProperty.call(page, "missing");
  }, [page]);

  return (
    <section>
      {/* Search Bar */}
      <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = queryWord.trim();
          if (!trimmed) return;
          setSubmittedWord(trimmed);
        }}
  className="
    relative flex items-center w-full
    rounded-lg border border-border
    focus-within:ring-1
    transition-colors
  "
>
  <Input
    type="text"
    placeholder="Search for a word..."
    value={queryWord}
    onChange={(e) => setQueryWord(e.target.value)}
    className="
      flex-1 border-0 bg-transparent
      focus-visible:ring-0
      focus-visible:ring-offset-0
      focus:outline-none
    "
  />

  <Button
    type="submit"
    variant="ghost"
    size="icon"
    className="text-muted-foreground hover:text-foreground"
  >
    <SearchIcon className="h-5 w-5" />
    <span className="sr-only">Search</span>
  </Button>
</form>

      </div>
      {/* Loading */}
      {wordQuery.isFetching ? (
        <div className="mt-4  min-h-[200px] flex items-center justify-center gap-2">
          <Spinner />
          <span className="text-sm text-muted-foreground">Loading</span>
        </div>
      ) : null}
      {/* Error */}
      {wordQuery.isError ? <div>{(wordQuery.error as Error).message}</div> : null}

      {/*No Results*/}
      {submittedWord && wordQuery.isSuccess && (!page || isMissing) ? (
        <div>No results.</div>
      ) : null}
      {/* Results */}
      {page && !isMissing ? (
      <div>
       {/* Words*/}
       <div className="flex items-center w-full justify-between mt-4">
        {/* Word*/}
         <div>
            <h3 className="text-lg font-semibold underline">{page.title}</h3>
         </div>
         {/* Audio*/}
         <div>
            <Button
              className="text-muted-foreground hover:text-foreground hover:cursor-pointer pointer-events-auto"
              type="button"
              onClick={() => {
                speak(page.title, lang);

              }}
            >
                <Volume2Icon className="h-5 w-5 text-white" />
            </Button>
            {null}
         </div>
       
       </div>
       <div className="mt-4">
         <div dangerouslySetInnerHTML={{ __html: page.extract ?? "" }} />
       </div>
      </div>
      ) : null}
    </section>
  );
}
