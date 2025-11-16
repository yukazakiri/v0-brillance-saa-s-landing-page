import { fetchSettings } from "@/lib/sanity/queries";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const settings = await fetchSettings();

    if (!settings) {
      return NextResponse.json({
        _id: "default",
        _type: "settings",
        siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
        shortTitle: "Data Center College",
        tagline: "Empowering the next generation of IT professionals, business leaders, and innovators",
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({
      _id: "default",
      _type: "settings",
      siteTitle: "Data Center College of The Philippines of Baguio City, Inc.",
      shortTitle: "Data Center College",
      tagline: "Empowering the next generation of IT professionals, business leaders, and innovators",
    });
  }
}

export const revalidate = 60; // Revalidate every 60 seconds
