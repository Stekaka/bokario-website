"use client";

import { BookingCalendar } from "@/components/BookingCalendar";
import { ScrollProgressBar } from "@/components/ProgressBar";
import { ScrollToTop } from "@/components/SmoothScroll";

export default function BookingPage() {
  return (
    <main id="main" className="bg-black">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
      
      <BookingCalendar />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </main>
  );
}
