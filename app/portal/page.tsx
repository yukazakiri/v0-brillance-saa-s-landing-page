import HeroSection from "@/components/hero-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "DCCPHub - Student & Faculty Portal | Data Center College",
    description: "Access your student records, learning management system, and faculty resources.",
}

export default function PortalPage() {
    return (
        <main className="min-h-screen bg-background">
            <HeroSection />
        </main>
    )
}
