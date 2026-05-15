"use client";

import * as React from "react";
import { ExternalLink, GraduationCap, Info, Sparkles, X } from "lucide-react";
import { motion } from "framer-motion";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import { ApplyButton } from "@/components/ui/apply-button";

type ApplicationModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ApplicationModal({
  isOpen,
  onOpenChange,
}: ApplicationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl overflow-hidden bg-[#F7F5F3] p-0 border-none"
        from="top"
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      >
        <DialogHeader className="bg-[#1a3a52] text-white p-8 rounded-t-lg relative">
          <DialogTitle className="text-3xl font-bold font-instrument-serif flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-[rgb(184,151,104)]" />
            Online Enrollment
          </DialogTitle>
          <DialogDescription className="text-white/80 mt-3 text-base">
            Start your journey with us today. We have moved our enrollment process to our online portal for your convenience.
          </DialogDescription>
          <DialogClose className="text-white/80 hover:text-white hover:bg-white/20 absolute top-4 right-4 transition-colors p-2 rounded-full">
            <X size={20} />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#1a3a52]">
              <Info className="w-5 h-5" />
              Enrollment Process
            </h3>
            <div className="space-y-3">
              {[
                "Access the DCCP Online Enrollment System",
                "Create your account or log in",
                "Complete the registration form",
                "Upload required documents",
              ].map((step, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1a3a52]/10 text-[#1a3a52] flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-600 text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <p className="text-sm text-gray-600">
              Click the button below to proceed to our secure enrollment portal. You will be redirected to <strong>portal.dccp.edu.ph</strong>.
            </p>
            <div className="pt-2">
              <a 
                href="https://portal.dccp.edu.ph/enrollment" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <ApplyButton variant="default" size="large" animated className="w-full">
                  Proceed to Online Enrollment
                  <ExternalLink className="w-4 h-4 ml-2" />
                </ApplyButton>
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Need help? Contact us at admissions@dccp.edu.ph or +63 74 442 2222
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
