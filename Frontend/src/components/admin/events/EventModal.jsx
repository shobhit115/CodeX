import React from "react";
import { X, AlertCircle, Link as LinkIcon, Image as ImageIcon, Loader2 } from "lucide-react";

export default function EventModal({
  setIsModalOpen,
  editingId,
  handleSubmit,
  formData,
  handleInputChange,
  handleFileChange,
  imagePreview,
  isSubmitting,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative my-auto">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-6">
            {editingId ? "Edit Event Details" : "Initialize New Event"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Event Name
                </label>
                <input
                  type="text"
                  name="eventName"
                  required
                  value={formData.eventName}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors shadow-sm"
                  placeholder="Event Name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-white border border-slate-300 text-slate-900 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors shadow-sm resize-none"
                placeholder="Event Description"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Registration URL{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  name="registrationLink"
                  value={formData.registrationLink}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-slate-300 text-slate-900 rounded-lg p-2.5 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors shadow-sm"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Cover Image
              </label>
              <div className="flex items-center gap-4">
                <label className="flex-1 border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-teal-50 hover:border-teal-400 rounded-xl p-6 text-center cursor-pointer transition-colors group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-2 group-hover:text-teal-500 transition-colors" />
                  <span className="text-sm font-medium text-slate-500 group-hover:text-teal-600">
                    Click to browse or drag image here
                  </span>
                </label>
                {imagePreview && (
                  <div className="w-28 h-28 border border-slate-200 rounded-xl overflow-hidden shrink-0 bg-slate-100 shadow-sm">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-teal-700 disabled:opacity-50 mt-4 shadow-sm"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : editingId ? (
                "Save Changes"
              ) : (
                "Create Event"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
