import React, { useState, useEffect } from "react";
import { eventService } from "../services/eventService";

import EventList from "../features/events/components/EventList";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await eventService.getEvents();
        setEvents(response.data || []);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-page flex flex-col min-h-screen bg-bg-soft relative font-jetbrains">
      <div
        className="absolute inset-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 pt-10">
        <section className="w-full max-w-[1400px] mx-auto px-4 lg:px-12 ">
          
          <div>
            <h1 className="text-2xl font-bold text-text tracking-tight ">
              Events
            </h1>
            <p className="text-sm text-text-text-muted mt-1 pb-4">
              Discover our timeline of upcoming workshops, hackathons, and technical sessions, and browse through our past activities.
            </p>
          </div>

          <div className="w-full">
            <EventList events={events} loading={loading} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;