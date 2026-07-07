import React from "react";

export default function PersonalDetailsForm({ formData, handleInputChange }) {
  return (
    <>
      <h3 className="font-oswald text-2xl font-bold uppercase tracking-widest text-[#0a0a0a] border-b-2 border-gray-200 pb-2 mb-6">
        1. Personal Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full bg-transparent border-2 border-gray-300 text-[#0a0a0a] p-3 focus:outline-none focus:border-[#2ec5d4] transition-colors uppercase font-bold text-sm tracking-wider placeholder-gray-300"
            placeholder="Enter Your Name"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
            Father's Name
          </label>
          <input
            type="text"
            name="fatherName"
            required
            value={formData.fatherName}
            onChange={handleInputChange}
            className="w-full bg-transparent border-2 border-gray-300 text-[#0a0a0a] p-3 focus:outline-none focus:border-[#2ec5d4] transition-colors uppercase font-bold text-sm tracking-wider placeholder-gray-300"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full bg-transparent border-2 border-gray-300 text-[#0a0a0a] p-3 focus:outline-none focus:border-[#2ec5d4] transition-colors font-bold text-sm tracking-wider placeholder-gray-300"
            placeholder="Email"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            required
            pattern="[0-9]{10}"
            title="Must be a 10-digit number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full bg-transparent border-2 border-gray-300 text-[#0a0a0a] p-3 focus:outline-none focus:border-[#2ec5d4] transition-colors font-bold text-sm tracking-wider placeholder-gray-300"
            placeholder="Enter Phone Number"
          />
        </div>
      </div>
    </>
  );
}
