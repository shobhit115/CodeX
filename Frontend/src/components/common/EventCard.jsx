import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Image as ImageIcon,
  Calendar,
  X,
  ExternalLink,
  MapPin,
  Clock,
} from "lucide-react";

export default function EventCard({ event, onClose }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (event) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [event]);

  if (!event) return null;

  // createPortal forces this component to render at the root <body> level, 
  // completely bypassing any nested CSS stacking context issues.
  return createPortal(
    <div
      className="fixed inset-0 z-[99999] bg-bg/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      {/* Removed pt-24 since the modal now properly covers the navbar */}
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-8">
        
        {/* Modal Container */}
        <div
          className="bg-card w-full max-w-3xl max-h-[85vh] sm:max-h-[90vh] flex flex-col relative rounded-2xl shadow-xl border border-border overflow-hidden transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* --- FIXED HEADER --- */}
          <div className="flex items-center justify-between px-6 py-4 sm:px-8 sm:py-5 border-b border-border-soft bg-card shrink-0 z-20">
            <h2 className="text-lg sm:text-xl font-bold text-text uppercase tracking-widest">
              Event Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-text-muted hover:text-text hover:bg-card-hover rounded-full transition-all active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* --- SCROLLABLE BODY --- */}
          <div className="flex-1 overflow-y-auto bg-bg-soft">
            
            {/* Hero Image */}
            <div className="w-full h-[240px] sm:h-[320px] md:h-[400px] bg-card-hover relative flex items-center justify-center shrink-0">
              {event.coverImage ? (
                <>
                  <img
                    src={event.coverImage}
                    alt={event.eventName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                </>
              ) : (
                <div className="flex flex-col items-center text-text-muted">
                  <ImageIcon className="w-16 h-16 mb-3 opacity-50 stroke-[1.5]" />
                  <span className="text-sm font-bold uppercase tracking-widest opacity-50">
                    No Image Provided
                  </span>
                </div>
              )}

              {/* Floating Date Badge */}
              <div className="absolute -bottom-8 right-6 sm:right-10 bg-card px-4 py-3 sm:px-5 sm:py-4 rounded-xl border border-border shadow-sm flex flex-col items-center min-w-[80px] sm:min-w-[100px] z-10">
                <span className="text-[10px] sm:text-xs font-black text-accent uppercase tracking-widest mb-1">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </span>
                <span className="text-3xl sm:text-4xl font-black text-text leading-none">
                  {new Date(event.date).getDate()}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 pt-12 md:pt-16 bg-card relative z-0">
              <div className="inline-flex items-center bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                Event Overview
              </div>

              <h3 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-text mb-8 leading-tight uppercase">
                {event.eventName}
              </h3>

              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm font-semibold text-text-muted mb-10 border-b border-border-soft pb-10">
                <div className="flex items-center gap-2.5 bg-bg px-4 py-2.5 rounded-lg border border-border shadow-sm">
                  <Calendar className="w-4 h-4 text-accent" />
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <div className="flex items-center gap-2.5 bg-bg px-4 py-2.5 rounded-lg border border-border shadow-sm">
                  <Clock className="w-4 h-4 text-accent" />
                  {new Date(event.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>

                <div className="flex items-center gap-2.5 bg-bg px-4 py-2.5 rounded-lg border border-border shadow-sm">
                  <MapPin className="w-4 h-4 text-accent" />
                  Offline
                </div>
              </div>

              {/* Rich Text Wrapper */}
              <div
                className="
                  text-text-muted text-[1.05rem] lg:text-lg leading-[1.8] max-w-none
                  [&_p]:mb-6
                  [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:text-text [&_h1]:tracking-tight
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-5 [&_h2]:text-text [&_h2]:tracking-tight [&_h2]:mt-10
                  [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-4 [&_h3]:text-text [&_h3]:mt-8
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul_li]:mb-2 [&_ul_li]:pl-2 [&_ul_marker]:text-accent
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol_li]:mb-2 [&_ol_li]:pl-2
                  [&_a]:text-accent [&_a]:underline hover:[&_a]:text-accent [&_a]:font-medium [&_a]:underline-offset-2
                  [&_strong]:font-bold [&_strong]:text-text
                  [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-6 [&_blockquote]:py-2 [&_blockquote]:mb-6 [&_blockquote]:bg-bg-soft [&_blockquote]:italic [&_blockquote]:rounded-r-xl [&_blockquote]:text-text
                "
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>
          </div>

          {/* --- FIXED FOOTER --- */}
          {event.registrationLink && (
            <div className="p-4 sm:p-6 border-t border-border bg-card shrink-0 flex justify-end">
              <a
                href={event.registrationLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-accent text-text-inverse px-8 py-3 rounded-xl font-semibold tracking-wide transition-all hover:opacity-90 shadow-sm active:scale-[0.98]"
              >
                Register Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}