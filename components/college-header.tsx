"use client"

export default function CollegeHeader() {
  return (
    <div className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] absolute left-0 top-0 flex justify-center items-center z-20 px-6 sm:px-8 md:px-12 lg:px-0">
      <div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]"></div>

      <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] md:max-w-[calc(100%-64px)] lg:max-w-[900px] lg:w-[900px] h-10 sm:h-11 md:h-12 py-1.5 sm:py-2 px-3 sm:px-4 md:px-4 pr-2 sm:pr-3 bg-white backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center relative z-30">
        <div className="flex justify-center items-center">
          <div className="flex justify-start items-center">
            <div className="flex flex-col justify-center text-[#1a3a52] text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-5 font-sans">
              DCCPB
            </div>
          </div>
          <div className="pl-3 sm:pl-4 md:pl-5 lg:pl-5 flex justify-start items-start hidden sm:flex flex-row gap-2 sm:gap-3 md:gap-4 lg:gap-4">
            <div className="flex justify-start items-center">
              <div className="flex flex-col justify-center text-[rgba(26,58,82,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                About
              </div>
            </div>
            <div className="flex justify-start items-center">
              <div className="flex flex-col justify-center text-[rgba(26,58,82,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                Programs
              </div>
            </div>
            <div className="flex justify-start items-center">
              <div className="flex flex-col justify-center text-[rgba(26,58,82,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                Admissions
              </div>
            </div>
            <div className="flex justify-start items-center">
              <div className="flex flex-col justify-center text-[rgba(26,58,82,0.80)] text-xs md:text-[13px] font-medium leading-[14px] font-sans">
                Campus Life
              </div>
            </div>
          </div>
        </div>
        <div className="h-6 sm:h-7 md:h-8 flex justify-start items-start gap-2 sm:gap-3">
          <div className="px-2 sm:px-3 md:px-[14px] py-1 sm:py-[6px] bg-[#1a3a52] shadow-[0px_1px_2px_rgba(26,58,82,0.12)] overflow-hidden rounded-full flex justify-center items-center">
            <div className="flex flex-col justify-center text-white text-xs md:text-[13px] font-medium leading-5 font-sans">
              Apply Now
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
