import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  const logo = {
    url: "/",
    src: "/icon.svg",
    alt: "DCCPB Logo",
    title: "DCCPB",
    description: "of the Philippines",
    sub_description: "of Baguio City, Inc.",
  }

  return (
    <header className="w-full border-b border-[rgba(55,50,47,0.06)] bg-[#f7f5f3]">
      <div className="max-w-[1060px] mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <Link href={logo.url} className="flex items-center gap-3 group">
              <img
                src={logo.src}
                className="h-12 w-12 drop-shadow-lg rounded-full bg-white border-2 border-[#1a3a52]"
                alt={logo.alt}
              />
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-2xl md:text-4xl tracking-tight text-[#1a3a52] drop-shadow-[2px_2px_0px_rgba(55,50,47,0.15)]">
                  {logo.title}
                </span>
                <span
                  className="italic text-xl md:text-2xl font-semibold text-[#37322f] -mt-2"
                  style={{
                    fontFamily: "'Brush Script MT', cursive",
                    textShadow: "1px 1px 0 rgba(55,50,47,0.1)",
                  }}
                >
                  {logo.description}
                  <span
                    className="text-xs md:text-sm text-[#605A57] font-bold ml-1"
                    style={{
                      textShadow: "1px 1px 0 #fff, 1px 1px 2px rgba(55,50,47,0.15)",
                    }}
                  >
                    {logo.sub_description}
                  </span>
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <button className="text-[#37322f] hover:text-[#1a3a52] text-sm font-medium transition-colors">Products</button>
              <button className="text-[#37322f] hover:text-[#1a3a52] text-sm font-medium transition-colors">Pricing</button>
              <button className="text-[#37322f] hover:text-[#1a3a52] text-sm font-medium transition-colors">Docs</button>
            </div>
          </div>
          <Button variant="ghost" className="text-[#37322f] hover:bg-[#37322f]/5">
            Log in
          </Button>
        </nav>
      </div>
    </header>
  )
}
