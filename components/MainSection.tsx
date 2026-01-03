import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, Volume2Icon } from "lucide-react";

export default function MainSection() {
  return (
    <section>
      {/* Search Bar */}
      <div>
      <form
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
      <div></div>
      {/* Error */}
      <div></div>

      {/*No Results*/}
      <div></div>
      {/* Results */}
      <div>
       {/* Words*/}
       <div>
        {/* Word*/}
         <div>
            <h3>{"Word"}</h3>
         </div>
         {/* Audio*/}
         <div>
            <button>
                <Volume2Icon />
            </button>
            <audio src="" />
         </div>
         {/* Phonetic*/}
         <p>{"Phonetic"}</p>
       </div>
       {/* Meaning*/}
       <div>
        <h3>{"part of speech"}</h3>
       </div>
       <div>
        <h3>Meanings</h3>
        {/*List*/}
        <ul className="">
            <li className="">
                <p>definitions</p>
                <p>Examples:</p>
            </li>
        </ul>
       </div>
      </div>
    </section>
  );
}
