import { fetchFAQs } from "@/lib/sanity/queries";
import FAQAccordion from "./faq-accordion";

export default async function FAQSection() {
    const faqData = await fetchFAQs();

    return (
        <div className="w-full flex justify-center items-start">
            <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
                {/* Left Column - Header */}
                <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
                    <div className="w-full flex flex-col justify-center text-[#49423D] font-semibold leading-tight md:leading-[44px] font-sans text-4xl tracking-tight">
                        Frequently Asked Questions
                    </div>
                    <div className="w-full text-[#605A57] text-base font-normal leading-7 font-sans">
                        Explore your data, build your dashboard,
                        <br className="hidden md:block" />
                        bring your team together.
                    </div>
                </div>

                {/* Right Column - FAQ Items */}
                <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
                    <FAQAccordion items={faqData} />
                </div>
            </div>
        </div>
    );
}
