"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Card } from "./Card";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingData {
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  service: string;
}

export function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<"date" | "time" | "details">("date");
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate available dates (next 30 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  // Generate time slots for selected date
  const generateTimeSlots = (date: string) => {
    const slots: TimeSlot[] = [];
    const selectedDate = new Date(date);
    const now = new Date();
    const minTime = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 hours from now
    
    for (let hour = 8; hour < 18; hour++) {
      const slotTime = new Date(selectedDate);
      slotTime.setHours(hour, 0, 0, 0);
      
      const isAvailable = selectedDate.toDateString() === now.toDateString() 
        ? slotTime > minTime 
        : true;
      
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        available: isAvailable
      });
    }
    
    return slots;
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime("");
    setCurrentStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setCurrentStep("details");
  };

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingData,
          date: selectedDate,
          time: selectedTime,
        }),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Ett fel uppstod. Försök igen eller kontakta oss direkt.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBooking = () => {
    setSelectedDate("");
    setSelectedTime("");
    setCurrentStep("date");
    setBookingData({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center p-10 bg-gradient-to-br from-white/[0.02] to-white/[0.04] backdrop-blur-xl border border-white/[0.06] rounded-2rem">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="text-h2 text-ink mb-4">Bokning bekräftad!</h2>
          <p className="text-lg text-ink-dim mb-8">
            Tack för din bokning! Vi har skickat en bekräftelse till din e-post och kommer att kontakta dig snart.
          </p>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={resetBooking}
            className="bg-gradient-to-r from-blue to-teal hover:from-blue/90 hover:to-teal/90"
          >
            Boka en till tid
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-ink mb-2 sm:mb-3">Boka Demo</h1>
        <p className="text-sm sm:text-base text-ink-dim max-w-xl mx-auto px-4">
          Välj en tid som passar dig bäst. Vi kommer att kontakta dig för att bekräfta bokningen och diskutera dina behov.
        </p>
      </div>

      <div className="bg-gradient-to-br from-white/[0.02] to-white/[0.04] backdrop-blur-xl border border-white/[0.06] rounded-xl sm:rounded-2rem p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue/5 via-transparent to-teal/5 opacity-0 hover:opacity-100 transition-opacity duration-1000" />
        
        {/* Subtle animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-teal/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        {/* Progress Steps */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 text-xs sm:text-sm ${
              currentStep === "date"
                ? "border-blue bg-blue text-white"
                : "border-white/20 text-white/40"
            }`}>
              1
            </div>
            <div className={`w-8 sm:w-12 h-0.5 ${
              currentStep === "details"
                ? "bg-blue"
                : "bg-white/20"
            }`}></div>
            <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 text-xs sm:text-sm ${
              currentStep === "details"
                ? "border-blue bg-blue text-white"
                : "border-white/20 text-white/40"
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Step 1: Date and Time Selection */}
        {currentStep === "date" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Date Selection */}
            <div className="relative">
              <h2 className="text-base sm:text-lg font-semibold text-ink mb-3 sm:mb-4 text-center lg:text-left">Välj datum</h2>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2 max-w-xs mx-auto lg:mx-0">
                {generateAvailableDates().map((date, index) => {
                  const dateObj = new Date(date);
                  const dayName = dateObj.toLocaleDateString('sv-SE', { weekday: 'short' });
                  const dayNumber = dateObj.getDate();
                  const isSelected = selectedDate === date;
                  
                  return (
                    <button
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      className={`relative overflow-hidden p-2 sm:p-3 bg-gradient-to-br from-white/[0.02] to-white/[0.04] border transition-all duration-500 rounded-lg sm:rounded-xl transform hover:scale-105 ${
                        isSelected 
                          ? 'border-blue/50 bg-blue/10 shadow-lg shadow-blue/25' 
                          : 'border-white/[0.06] hover:border-blue/40 hover:bg-white/[0.08] hover:shadow-lg'
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: 'fadeInScale 0.6s ease-out forwards'
                      }}
                    >
                      {/* Selection glow effect */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue/20 to-teal/20 rounded-lg sm:rounded-xl animate-pulse" />
                      )}
                      
                      {/* Hover glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue/10 to-teal/10 rounded-lg sm:rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        <div className="text-xs text-ink-dim mb-0.5 sm:mb-1 font-medium">{dayName}</div>
                        <div className="text-sm sm:text-base font-bold text-ink">{dayNumber}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Time Selection */}
            <div className="relative">
              <h2 className="text-base sm:text-lg font-semibold text-ink mb-3 sm:mb-4 text-center lg:text-left">Välj tid</h2>
              
              {/* Time slots with smooth animation */}
              <div className={`transition-all duration-700 ease-out ${
                selectedDate 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
              }`}>
                {selectedDate && (
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xs mx-auto lg:mx-0">
                    {generateTimeSlots(selectedDate).map((slot, index) => (
                      <button
                        key={slot.time}
                        onClick={() => handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={`relative overflow-hidden p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-500 text-xs sm:text-sm font-medium transform hover:scale-105 ${
                          slot.available
                            ? selectedTime === slot.time
                              ? 'bg-gradient-to-r from-blue to-teal text-white border-2 border-blue shadow-lg shadow-blue/25'
                              : 'bg-gradient-to-br from-white/[0.03] to-white/[0.06] border border-white/[0.08] hover:border-blue/40 hover:bg-white/[0.08] text-ink hover:shadow-lg'
                            : 'bg-white/[0.01] border border-white/[0.03] text-ink-dim cursor-not-allowed'
                        }`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: selectedDate ? 'slideInUp 0.6s ease-out forwards' : 'none'
                        }}
                      >
                        {/* Glow effect for selected time */}
                        {slot.available && selectedTime === slot.time && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue/20 to-teal/20 rounded-lg sm:rounded-xl animate-pulse" />
                        )}
                        
                        {/* Hover glow effect */}
                        {slot.available && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue/10 to-teal/10 rounded-lg sm:rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        )}
                        
                        <span className="relative z-10">{slot.time}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Placeholder when no date selected */}
              {!selectedDate && (
                <div className="text-center text-ink-dim text-xs sm:text-sm py-8 sm:py-12 transition-all duration-500">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-ink-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="px-2">Välj ett datum först för att se tillgängliga tider</p>
                </div>
              )}
            </div>
          </div>
        )}



        {/* Step 2: Contact Details */}
        {currentStep === "details" && (
          <div className="max-w-2xl mx-auto animate-slide-in-right">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-blue to-teal flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-ink mb-2">Dina uppgifter</h2>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue/20 to-teal/20 rounded-full border border-blue/30">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-ink">
                  {new Date(selectedDate).toLocaleDateString('sv-SE')} kl {selectedTime}
                </span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">Namn *</label>
                  <input
                    type="text"
                    required
                    value={bookingData.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full p-3 sm:p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg sm:rounded-xl text-ink placeholder-ink-dim focus:border-blue/50 focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="Ditt namn"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink mb-2">E-post *</label>
                  <input
                    type="email"
                    required
                    value={bookingData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-3 sm:p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg sm:rounded-xl text-ink placeholder-ink-dim focus:border-blue/50 focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="din@email.se"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Företag</label>
                <input
                  type="text"
                  value={bookingData.company || ""}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="w-full p-3 sm:p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg sm:rounded-xl text-ink placeholder-ink-dim focus:border-blue/50 focus:outline-none transition-colors text-sm sm:text-base"
                  placeholder="Företagsnamn (valfritt)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ink mb-2">Tjänst du är intresserad av *</label>
                <select
                  required
                  value={bookingData.service || ""}
                  onChange={(e) => handleInputChange("service", e.target.value)}
                  className="w-full p-3 sm:p-4 bg-white/[0.02] border border-white/[0.06] rounded-lg sm:rounded-xl text-ink focus:border-blue/50 focus:outline-none transition-colors text-sm sm:text-base"
                >
                  <option value="">Välj tjänst</option>
                  <option value="maps">Google Maps-optimering</option>
                  <option value="bookings">Bokningssystem</option>
                  <option value="reviews">Recensionshantering</option>
                  <option value="bundle">Komplett paket</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4 sm:pt-6">
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentStep("date")}
                  className="text-ink-dim hover:text-ink text-sm sm:text-base"
                >
                  ← Tillbaka till datum
                </Button>
                <Button 
                  type="submit"
                  variant="primary" 
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue to-teal hover:from-blue/90 hover:to-teal/90 text-sm sm:text-base"
                >
                  {isSubmitting ? "Skickar..." : "Bekräfta bokning"}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
