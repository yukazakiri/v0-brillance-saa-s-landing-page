"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="w-full border-b border-[#37322f]/6 bg-[#f7f5f3] sticky top-0 z-50">
      <div className="max-w-[1060px] mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] rounded-lg flex items-center justify-center">
              <Image
                src="/placeholder-logo.png"
                alt="DCCPH Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#37322f] font-bold text-sm">DCCPH</span>
              <span className="text-[#37322f]/60 text-xs hidden sm:block">Data Center College</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="text-[#37322f] hover:text-[#1e40af] text-sm font-medium transition-colors">
              Programs
            </button>
            <button className="text-[#37322f] hover:text-[#1e40af] text-sm font-medium transition-colors">About</button>
            <button className="text-[#37322f] hover:text-[#1e40af] text-sm font-medium transition-colors">
              Campuses
            </button>
            <button className="text-[#37322f] hover:text-[#1e40af] text-sm font-medium transition-colors">
              Contact
            </button>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white">Apply Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-[#37322f]/5 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-[#37322f]" /> : <Menu className="w-6 h-6 text-[#37322f]" />}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#37322f]/6">
            <div className="flex flex-col space-y-3 pt-4">
              <button className="text-[#37322f] hover:text-[#1e40af] text-sm font-medium text-left py-2 transition-colors">
                Programs
              </button>
              <button className="text-[#37322f] hover:text-[#1e40af] text-sm font-medium text-left py-2 transition-colors">
                About
              </button>
              <button className="text-[#37322f] hover:text-[#1e40af] text-sm font-medium text-left py-2 transition-colors">
                Campuses
              </button>
              <button className="text-[#37322f] hover:text-[#1e40af] text-sm font-medium text-left py-2 transition-colors">
                Contact
              </button>
              <Button className="w-full bg-[#1e40af] hover:bg-[#1e3a8a] text-white mt-2">Apply Now</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
