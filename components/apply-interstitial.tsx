"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, ExternalLink, GraduationCap, Info, Loader2, X } from "lucide-react"
import { ApplyButton } from "@/components/ui/apply-button"

export default function ApplyInterstitial() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)

  const portalUrl = "https://portal.dccp.edu.ph/enrollment"

  useEffect(() => {
    if (isCancelled) return

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setIsRedirecting(true)
      window.location.href = portalUrl
    }
  }, [countdown, isCancelled])

  const handleContinue = () => {
    setIsRedirecting(true)
    window.location.href = portalUrl
  }

  const handleCancel = () => {
    setIsCancelled(true)
    router.back()
  }

  return (
    <div className="w-full max-w-3xl bg-white rounded-2xl border border-border shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-[#1a3a52] p-8 text-white relative overflow-hidden">
        {/* Abstract pattern overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <GraduationCap className="w-8 h-8 text-[#c79244]" />
            </div>
            <h1 className="text-3xl font-serif font-bold">Online Enrollment</h1>
          </div>
          <p className="text-white/80 text-lg max-w-xl">
            You are being redirected to our secure student portal to complete your application.
          </p>
        </div>

        {/* Countdown Indicator */}
        {!isCancelled && !isRedirecting && (
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/10">
            <div
              className="h-full bg-[#c79244] transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 5) * 100}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-8 space-y-8">
        {!isCancelled ? (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-full shrink-0">
              <Loader2 className="w-4 h-4 text-amber-700 animate-spin" />
            </div>
            <div>
              <p className="font-semibold text-amber-900">Redirecting in {countdown} seconds...</p>
              <p className="text-sm text-amber-700/80 mt-1">
                We are taking you to <strong>portal.dccp.edu.ph</strong>
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3">
            <div className="p-2 bg-red-100 rounded-full shrink-0">
              <X className="w-4 h-4 text-red-700" />
            </div>
            <div>
              <p className="font-semibold text-red-900">Redirection Cancelled</p>
              <p className="text-sm text-red-700/80 mt-1">
                You can stay here or go back.
              </p>
            </div>
          </div>
        )}

        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-[#1a3a52]">
            <Info className="w-5 h-5" />
            What to expect
          </h2>
          <div className="grid gap-4">
            {[
              "Access the Online Enrollment System via the portal.",
              "Create an account or login if you already have one.",
              "Fill out the registration form with your personal details.",
              "Upload the required documents for verification.",
              "Await confirmation from our admissions team."
            ].map((step, i) => (
              <div key={i} className="flex gap-3 items-start group">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a3a52]/10 text-[#1a3a52] flex items-center justify-center text-sm font-bold mt-0.5 group-hover:bg-[#1a3a52] group-hover:text-white transition-colors duration-300">
                  {i + 1}
                </div>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <ApplyButton
            onClick={handleContinue}
            disabled={isRedirecting}
            variant="default"
            size="large"
            className="w-full sm:flex-1 justify-center"
          >
            {isRedirecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                Continue Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </>
            )}
          </ApplyButton>

          <button
            onClick={handleCancel}
            disabled={isRedirecting}
            className="px-6 py-3 rounded-sm text-[#1a3a52] font-semibold hover:bg-muted transition-colors border border-transparent hover:border-border w-full sm:w-auto text-center"
          >
            Cancel / Go Back
          </button>
        </div>

        <section className="pt-6 border-t border-border">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Need Assistance?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-muted rounded-full">
                <CheckCircle2 className="w-4 h-4 text-[#1a3a52]" />
              </div>
              <span>Call: +63 74 442 2222</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-muted rounded-full">
                <CheckCircle2 className="w-4 h-4 text-[#1a3a52]" />
              </div>
              <span>Email: baguio-campus@dccph.edu.ph</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
