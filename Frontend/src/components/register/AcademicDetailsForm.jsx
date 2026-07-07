import React from "react";

export default function AcademicDetailsForm({ formData, handleInputChange }) {
  return (
    <>
      <h3 className="font-oswald text-2xl font-bold uppercase tracking-widest text-[#0a0a0a] border-b-2 border-gray-200 pb-2 mb-6">
        2. Academic Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
            University ID (QID)
          </label>
          <input
            type="text"
            name="studentId"
            required
            value={formData.studentId}
            onChange={handleInputChange}
            className="w-full bg-transparent border-2 border-gray-300 text-[#0a0a0a] p-3 focus:outline-none focus:border-[#2ec5d4] transition-colors uppercase font-bold text-sm tracking-wider placeholder-gray-300"
            placeholder="QID"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
            Course
          </label>
          <select
            name="course"
            required
            value={formData.course}
            onChange={handleInputChange}
            className="w-full bg-transparent border-2 border-gray-300 text-[#0a0a0a] p-3 focus:outline-none focus:border-[#2ec5d4] transition-colors uppercase font-bold text-sm tracking-wider cursor-pointer"
          >
            <option value="">SELECT COURSE</option>
            {[
              "B.Tech",
              "M.Tech",
              "BCA",
              "MCA",
              "BBA",
              "MBA",
              "B.Sc",
              "M.Sc",
            ].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
              Year
            </label>
            <select
              name="year"
              required
              value={formData.year}
              onChange={handleInputChange}
              className="w-full bg-transparent border-2 border-gray-300 text-[#0a0a0a] p-3 focus:outline-none focus:border-[#2ec5d4] transition-colors uppercase font-bold text-sm tracking-wider cursor-pointer"
            >
              <option value="">YEAR</option>
              {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
              Semester
            </label>
            <select
              name="semester"
              required
              value={formData.semester}
              onChange={handleInputChange}
              className="w-full bg-transparent border-2 border-gray-300 text-[#0a0a0a] p-3 focus:outline-none focus:border-[#2ec5d4] transition-colors uppercase font-bold text-sm tracking-wider cursor-pointer"
            >
              <option value="">SEM</option>
              {["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"].map(
                (s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
              Section
            </label>
            <input
              type="text"
              name="section"
              required
              value={formData.section}
              onChange={handleInputChange}
              className="w-full bg-transparent border-2 border-gray-300 text-[#0a0a0a] p-3 focus:outline-none focus:border-[#2ec5d4] transition-colors uppercase font-bold text-sm tracking-wider placeholder-gray-300"
              placeholder="Section"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
              Set / Group
            </label>
            <input
              type="text"
              name="set"
              required
              value={formData.set}
              onChange={handleInputChange}
              className="w-full bg-transparent border-2 border-gray-300 text-[#0a0a0a] p-3 focus:outline-none focus:border-[#2ec5d4] transition-colors uppercase font-bold text-sm tracking-wider placeholder-gray-300"
            />
          </div>
        </div>
      </div>
    </>
  );
}
