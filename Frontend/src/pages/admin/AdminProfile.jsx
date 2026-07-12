import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Phone, Camera, Save, Loader2, Shield } from "lucide-react";
import adminService from "../../services/adminService";
import { setLogin } from "../../context/authSlice";

export default function AdminProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      const adminObj = user.admin || user;
      setFormData({
        name: adminObj.name || "",
        mobileNumber: adminObj.mobileNumber || "",
      });
      setPreviewPhoto(adminObj.profilePhoto || null);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const submitData = new FormData();
      if (formData.name) submitData.append("name", formData.name);
      if (formData.mobileNumber) submitData.append("mobileNumber", formData.mobileNumber);
      if (profilePhoto) submitData.append("profilePhoto", profilePhoto);

      const response = await adminService.updateProfile(submitData);
      
      if (response.success) {
        dispatch(setLogin(response.data));
        setMessage({ type: "success", text: "Profile updated successfully!" });
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Failed to update profile." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Admin Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Photo Section */}
            <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-slate-100">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-lg relative">
                  {previewPhoto ? (
                    <img 
                      src={previewPhoto} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-teal-50 text-teal-500">
                      <User size={48} />
                    </div>
                  )}
                </div>
                <label 
                  htmlFor="photo-upload" 
                  className="absolute bottom-0 right-0 bg-teal-500 text-white p-2.5 rounded-full shadow-lg cursor-pointer hover:bg-teal-600 transition-colors"
                >
                  <Camera size={18} />
                </label>
                <input 
                  id="photo-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handlePhotoChange}
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-slate-900">Profile Photo</h3>
                <p className="text-sm text-slate-500 mt-1 mb-4">
                  Upload a new Profile Picture.
                </p>
                <label 
                  htmlFor="photo-upload"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  Change Photo
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={(user?.admin || user)?.email || ""}
                    disabled
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 text-sm cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Email address cannot be changed.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone size={18} />
                  </div>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm transition-colors"
                    placeholder="Enter your mobile number"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 block">
                  Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Shield size={18} />
                  </div>
                  <input
                    type="text"
                    value="Administrator"
                    disabled
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 bg-slate-50 rounded-lg text-slate-500 text-sm cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
            {message.text && (
              <div className={`p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {message.text}
              </div>
            )}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-teal-600 border border-transparent rounded-lg shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving Changes
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
