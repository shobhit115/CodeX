import React from "react";
import {
  Image as ImageIcon,
  Calendar,
  X,
  ExternalLink,
  MapPin,
  Clock,
} from "lucide-react";

export default function EventCard({ event, onClose }) {
  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-none border-4 border-black w-full max-w-3xl max-h-[90vh] flex flex-col relative transform transition-all overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- FIXED HEADER --- */}
        <div className="flex items-center justify-between px-8 py-5 border-b-4 border-black bg-white z-20">
          <h2 className="text-xl font-bold text-black uppercase tracking-widest">
            Event Details
          </h2>
          <button
            onClick={onClose}
            className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* --- SCROLLABLE BODY --- */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          {/* Hero Image */}
          <div className="w-full h-[280px] sm:h-[350px] md:h-[420px] bg-slate-50 relative flex items-center justify-center shrink-0 group">
            {event.coverImage ? (
              <>
                <img
                  src={event.coverImage}
                  alt={event.eventName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
              </>
            ) : (
              <div className="flex flex-col items-center text-black">
                <ImageIcon className="w-16 h-16 mb-2 stroke-[1.5]" />
                <span className="text-xl font-bold uppercase tracking-widest">
                  No Image
                </span>
              </div>
            )}

            {/* Floating Date Badge */}
            <div className="absolute -bottom-10 right-10 bg-white px-5 py-3 rounded-none border-4 border-black flex flex-col items-center min-w-[100px] z-10">
              <span className="text-xs font-black text-[#2ec5d4] uppercase tracking-widest mb-1">
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                })}
              </span>
              <span className="text-4xl font-black text-slate-900 leading-none">
                {new Date(event.date).getDate()}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-10 lg:p-12 pt-14 md:pt-16 bg-white relative z-0">
            <div className="inline-flex items-center bg-teal-50/80 text-teal-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Event Overview
            </div>

            <h3 className="font-bold text-4xl sm:text-5xl text-black mb-8 leading-tight uppercase">
              {event.eventName}
            </h3>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm font-semibold text-slate-600 mb-12">
              <div className="flex items-center gap-2.5 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100/80">
                <Calendar className="w-4 h-4 text-teal-500" />
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 border-2 border-black bg-white">
                <Clock className="w-5 h-5 text-[#2ec5d4] stroke-[2.5]" />
                {new Date(event.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>

              <div className="flex items-center gap-2.5 px-4 py-2 border-2 border-black bg-white">
                <MapPin className="w-5 h-5 text-[#2ec5d4] stroke-[2.5]" />
                Offline
              </div>
            </div>

            {/* Rich Text Wrapper */}
            <div
              className="
                text-slate-600 text-[1.05rem] lg:text-lg leading-[1.8] max-w-none
                [&_p]:mb-6
                [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:text-slate-900 [&_h1]:tracking-tight
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-5 [&_h2]:text-slate-900 [&_h2]:tracking-tight [&_h2]:mt-10
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-4 [&_h3]:text-slate-900 [&_h3]:mt-8
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul_li]:mb-2 [&_ul_li]:pl-2 [&_ul_marker]:text-teal-500
                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol_li]:mb-2 [&_ol_li]:pl-2
                [&_a]:text-teal-600 [&_a]:underline hover:[&_a]:text-teal-800 [&_a]:font-medium [&_a]:underline-offset-2
                [&_strong]:font-bold [&_strong]:text-slate-900
                [&_blockquote]:border-l-4 [&_blockquote]:border-teal-500 [&_blockquote]:pl-6 [&_blockquote]:py-1 [&_blockquote]:mb-6 [&_blockquote]:bg-slate-50 [&_blockquote]:italic [&_blockquote]:rounded-r-2xl [&_blockquote]:text-slate-700
              "
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>
        </div>

        {/* --- FIXED FOOTER --- */}
        {event.registrationLink && (
          <div className="p-6 sm:p-8 border-t-4 border-black bg-white z-10 flex justify-end">
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-slate-900 text-white px-9 py-3.5 rounded-2xl font-semibold tracking-wide transition-all hover:bg-teal-600 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Register Now
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
