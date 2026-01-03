"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ViewTransitionLink from "@/components/view-transition-link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/animate-ui/components/radix/dialog";

const menuItems = [
  { name: "Student Portal", href: "https://portal.dccp.edu.ph", external: true },
  { name: "Faculty Portal", href: "https://portal.dccp.edu.ph", external: true },
  { name: "LMS", href: "#", dialog: true },
  { name: "Library", href: "#", dialog: true },
];

export default function PortalHeader() {
  const [menuState, setMenuState] = useState(false);
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] z-50">
      {/* Architectural vertical lines that match the layout */}
      <div className="absolute left-0 top-0 w-[1px] h-full bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] pointer-events-none z-10" />
      <div className="absolute right-0 top-0 w-[1px] h-full bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] pointer-events-none z-10" />

      {/* Top Utility Belt */}
      <div className="w-full bg-[#1a3a52] py-2 px-6 hidden lg:block border-x border-transparent relative mx-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <span className="text-[10px] text-white/50 uppercase tracking-[0.25em] font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C79244] animate-pulse"></span>
            Student & Faculty Gateway
          </span>
          <div className="flex gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors font-bold bg-transparent border-none cursor-pointer">
                  Support
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Coming Soon</DialogTitle>
                  <DialogDescription>
                    Support services are currently being developed.
                    For immediate assistance, please contact the administration office or email support@dccp.edu.ph.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-[10px] text-white/60 hover:text-white uppercase tracking-widest transition-colors font-bold border-l border-white/10 pl-6 bg-transparent border-t-0 border-r-0 border-b-0 cursor-pointer">
                  Admissions
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Coming Soon</DialogTitle>
                  <DialogDescription>
                    Online admissions portal is currently under development.
                    For admission inquiries, please visit the main campus or contact baguio-campus@dccph.edu.ph.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <nav
        data-state={menuState && "active"}
        className="w-full border-b border-[rgba(26,58,82,0.08)] bg-[#F7F5F3]/95 backdrop-blur-md transition-all duration-300 relative"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-[100px]">
            {/* Desktop Left Nav */}
            <div className="hidden lg:flex items-center gap-10 h-full">
              <Link
                href="https://portal.dccp.edu.ph"
                target="_blank"
                className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#605A57] hover:text-[#1a3a52] transition-all relative group py-2"
              >
                Portal Home
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a3a52] transition-all group-hover:w-full"></span>
              </Link>
              <Link
                href="https://portal.dccp.edu.ph"
                target="_blank"
                className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#605A57] hover:text-[#1a3a52] transition-all relative group py-2"
              >
                Faculty
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a3a52] transition-all group-hover:w-full"></span>
              </Link>
            </div>

            {/* Center Branding */}
            <ViewTransitionLink
              href="/"
              aria-label="home"
              className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 flex items-center gap-4 transition-all hover:scale-[1.03] duration-500 group"
              transitionType="slide-reverse"
            >
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl md:text-4xl font-bold text-[#1a3a52] tracking-tight leading-none group-hover:text-[#C79244] transition-colors">
                  DCCPHub
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-[1px] w-4 bg-[#C79244]/40"></div>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-[#605A57] font-bold">
                    Data Center College
                  </span>
                  <div className="h-[1px] w-4 bg-[#C79244]/40"></div>
                </div>
              </div>
            </ViewTransitionLink>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMenuState(!menuState)}
              aria-label={menuState == true ? "Close Menu" : "Open Menu"}
              className="lg:hidden relative z-20 text-[#1a3a52] hover:bg-[#1a3a52]/5 p-2 rounded-lg transition-colors border border-[rgba(26,58,82,0.1)]"
            >
              <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-300" />
              <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-300" />
            </button>

            {/* Desktop Right Nav & CTAs */}
            <div className="hidden lg:flex items-center gap-10 h-full">
              <div className="flex items-center gap-10 border-r border-[rgba(26,58,82,0.1)] pr-10 h-10">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#605A57] hover:text-[#1a3a52] transition-all relative group py-2 bg-transparent border-none cursor-pointer">
                      LMS
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a3a52] transition-all group-hover:w-full"></span>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Coming Soon</DialogTitle>
                      <DialogDescription>
                        The Learning Management System (LMS) is currently under development.
                        Check back soon for access to online courses and learning materials.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#605A57] hover:text-[#1a3a52] transition-all relative group py-2 bg-transparent border-none cursor-pointer">
                      Library
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a3a52] transition-all group-hover:w-full"></span>
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Coming Soon</DialogTitle>
                      <DialogDescription>
                        The Digital Library is currently under development.
                        Check back soon for access to e-books, journals, and other learning resources.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex items-center gap-6">
                <Link
                  href="https://portal.dccp.edu.ph/login"
                  target="_blank"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a3a52] hover:opacity-70 transition-opacity"
                >
                  Sign In
                </Link>
                <Button
                  asChild
                  size="sm"
                  className="bg-[#1a3a52] hover:bg-[#1a3a52]/90 text-white font-bold uppercase tracking-[0.2em] text-[10px] px-8 rounded-none h-11 transition-all border border-[#1a3a52] hover:-translate-y-0.5"
                >
                  <Link href="https://portal.dccp.edu.ph/signup" target="_blank">
                    Register
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className="in-data-[state=active]:block lg:hidden hidden w-full bg-[#F7F5F3] border-t border-[rgba(26,58,82,0.12)] shadow-2xl animate-in slide-in-from-top duration-500 overflow-hidden">
          <div className="p-10 space-y-10">
            <ul className="space-y-8">
              {menuItems.map((item, index) => (
                <li key={index}>
                  {item.dialog ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-2xl font-serif text-[#1a3a52] hover:text-[#C79244] transition-colors block border-b border-[rgba(26,58,82,0.08)] pb-6 flex justify-between items-center group w-full text-left bg-transparent border-t-0 border-r-0 border-l-0">
                          {item.name}
                          <span className="text-xl opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                            →
                          </span>
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Coming Soon</DialogTitle>
                          <DialogDescription>
                            {item.name === "LMS"
                              ? "The Learning Management System (LMS) is currently under development. Check back soon for access to online courses and learning materials."
                              : "The Digital Library is currently under development. Check back soon for access to e-books, journals, and other learning resources."
                            }
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      className="text-2xl font-serif text-[#1a3a52] hover:text-[#C79244] transition-colors block border-b border-[rgba(26,58,82,0.08)] pb-6 flex justify-between items-center group"
                    >
                      {item.name}
                      <span className="text-xl opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                        →
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="grid gap-4 pt-6">
              <Button
                asChild
                className="w-full bg-[#1a3a52] text-white rounded-none h-14 uppercase tracking-[0.3em] text-[10px] font-bold"
              >
                <Link href="https://portal.dccp.edu.ph/signup" target="_blank">
                  Registration
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-[rgba(26,58,82,0.2)] text-[#1a3a52] rounded-none h-14 uppercase tracking-[0.3em] text-[10px] font-bold"
              >
                <Link href="https://portal.dccp.edu.ph/login" target="_blank">
                  Portal Login
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
