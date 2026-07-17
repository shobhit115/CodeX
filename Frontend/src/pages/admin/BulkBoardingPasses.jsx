import { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Ticket,
  Plus,
  Trash2,
  Loader2,
  Send,
  Users,
  User,
  Mail,
  Calendar,
  Info,
  Hash,
  Wifi,
  KeyRound,
  Upload,
  Download,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../context/messageSlice";
import { boardingPassService } from "../../services/boardingPassService";

export default function BulkBoardingPasses() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const csvInputRef = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      eventName: "",
      eventDescription: "",
      qid: "",
      includeWifi: false,
      wifiUser: "",
      wifiPass: "",
      includeLogin: false,
      loginUser: "",
      loginPass: "",
      students: [{ name: "", email: "" }],
    },
  });

  const watchIncludeWifi = watch("includeWifi");
  const watchIncludeLogin = watch("includeLogin");
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  //-----------------------------------------------------
  // CSV Upload (Native JS, No Dependencies)
  //-----------------------------------------------------
  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split(/\r?\n/).filter((row) => row.trim() !== "");

      if (rows.length === 0) return;

      let startIndex = 0;
      if (
        rows[0].toLowerCase().includes("name") ||
        rows[0].toLowerCase().includes("email")
      ) {
        startIndex = 1;
      }

      const parsedStudents = [];

      for (let i = startIndex; i < rows.length; i++) {
        const cols = rows[i]
          .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
          .map((col) => col.replace(/^"|"$/g, "").trim());

        if (cols.length >= 2) {
          parsedStudents.push({
            name: cols[0] || "",
            email: cols[1] || "",
          });
        }
      }

      if (parsedStudents.length > 0) {
        if (fields.length === 1 && !fields[0].name && !fields[0].email) {
          replace(parsedStudents);
        } else {
          append(parsedStudents);
        }
        dispatch(
          setSuccess(`${parsedStudents.length} students imported from CSV.`)
        );
      } else {
        dispatch(setError("Could not parse valid students from the CSV."));
      }
    };

    reader.onerror = () => {
      dispatch(setError("Failed to read the CSV file."));
    };

    reader.readAsText(file);
    e.target.value = null;
  };

  const handleDownloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,Name,Email\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "boarding_pass_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //-----------------------------------------------------
  // Submit
  //-----------------------------------------------------
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const validStudents = data.students.filter(
        (student) =>
          student.name.trim() && student.email.trim()
      );

      if (validStudents.length === 0) {
        dispatch(setError("Please provide at least one valid student."));
        setLoading(false);
        return;
      }

      const submitData = {
        eventName: data.eventName,
        eventDescription: data.eventDescription,
        qid: data.qid,
        wifiUser: data.includeWifi ? data.wifiUser : undefined,
        wifiPass: data.includeWifi ? data.wifiPass : undefined,
        loginUser: data.includeLogin ? data.loginUser : undefined,
        loginPass: data.includeLogin ? data.loginPass : undefined,
        studentsStr: JSON.stringify(validStudents)
      };

      const response = await boardingPassService.generateBulkBoardingPasses(submitData);

      dispatch(
        setSuccess(response.message || "Boarding Passes generated successfully.")
      );
      reset();
    } catch (error) {
      dispatch(
        setError(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to generate boarding passes."
        )
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 lg:p-10 font-sans text-text bg-bg min-h-full">
      <header className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Boarding Pass Forge</h1>
          <p className="text-sm text-text-muted mt-1">
            Bulk generate and email boarding passes.
          </p>
        </div>
        <div className="hidden sm:block p-3 rounded-xl bg-accent/10 border border-border-soft">
          <Ticket className="w-8 h-8 text-accent" />
        </div>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left Panel : Event Details */}
        <div className="lg:col-span-4 bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8 h-fit space-y-6">
          <h2 className="flex items-center gap-2 text-lg font-bold border-b border-border-soft pb-4">
            <Calendar className="w-5 h-5 text-accent" />
            Event Details
          </h2>

          {/* Event Name */}
          <div>
            <label className="block text-sm font-semibold text-text mb-2">
              Event Name
            </label>
            <input
              type="text"
              {...register("eventName", { required: "Event name is required" })}
              placeholder="CodeX 2026"
              className="w-full rounded-lg border border-border bg-card text-text p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {errors.eventName && (
              <p className="mt-1 text-xs text-danger">
                {errors.eventName.message}
              </p>
            )}
          </div>

          {/* Event Description */}
          <div>
            <label className="block text-sm font-semibold text-text mb-2">
              Event Description
            </label>
            <div className="relative">
              <Info className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
              <textarea
                {...register("eventDescription", { required: "Description is required" })}
                placeholder="Join us for the ultimate coding showdown..."
                rows="3"
                className="w-full rounded-lg border border-border bg-card text-text pl-10 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              ></textarea>
            </div>
            {errors.eventDescription && (
              <p className="mt-1 text-xs text-danger">
                {errors.eventDescription.message}
              </p>
            )}
          </div>

          {/* QID */}
          <div>
            <label className="block text-sm font-semibold text-text mb-2">
              QID
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
              <input
                type="text"
                {...register("qid", { required: "QID is required" })}
                placeholder="e.g. QID-12345"
                className="w-full rounded-lg border border-border bg-card text-text pl-10 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            {errors.qid && (
              <p className="mt-1 text-xs text-danger">
                {errors.qid.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 border-b border-border-soft pb-4 pt-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <KeyRound className="w-5 h-5 text-accent" />
              Credentials (Optional)
            </h2>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer">
                <input type="checkbox" {...register("includeWifi")} className="w-4 h-4 text-accent bg-card border-border rounded focus:ring-accent" />
                Include Event WiFi
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-text cursor-pointer">
                <input type="checkbox" {...register("includeLogin")} className="w-4 h-4 text-accent bg-card border-border rounded focus:ring-accent" />
                Include Event Login
              </label>
            </div>
          </div>

          {/* WiFi Credentials */}
          {watchIncludeWifi && (
            <div className="space-y-4 bg-bg-soft p-4 rounded-xl border border-border-soft">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5" /> Event WiFi
              </p>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  WiFi User / ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    {...register("wifiUser")}
                    placeholder="guest_user"
                    className="w-full rounded-lg border border-border bg-card text-text pl-10 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  WiFi Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    {...register("wifiPass")}
                    placeholder="guest_pass123"
                    className="w-full rounded-lg border border-border bg-card text-text pl-10 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Login Credentials */}
          {watchIncludeLogin && (
            <div className="space-y-4 bg-bg-soft p-4 rounded-xl border border-border-soft">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" /> Event Login
              </p>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Login ID
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    {...register("loginUser")}
                    placeholder="login_id123"
                    className="w-full rounded-lg border border-border bg-card text-text pl-10 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Login Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    {...register("loginPass")}
                    placeholder="secure_pass456"
                    className="w-full rounded-lg border border-border bg-card text-text pl-10 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel : Student Details */}
        <div className="lg:col-span-8 bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-border-soft pb-4 mb-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Users className="w-5 h-5 text-accent" />
              Attendee Details
            </h2>

            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full">
                {fields.length} Attendee(s)
              </span>

              {/* CSV Download Template */}
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-border bg-card hover:bg-card-hover text-text font-medium transition-colors shadow-sm"
                title="Download CSV Template (Name, Email)"
              >
                <Download className="w-4 h-4" />
                Template
              </button>

              {/* CSV Upload Button */}
              <input
                type="file"
                accept=".csv"
                ref={csvInputRef}
                onChange={handleCsvUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => csvInputRef.current.click()}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-border bg-card hover:bg-card-hover text-text font-medium transition-colors shadow-sm"
              >
                <Upload className="w-4 h-4" />
                Import CSV
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start bg-bg-soft border border-border rounded-xl p-4"
              >
                {/* Name */}
                <div className="md:col-span-5 relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Attendee Name"
                    {...register(`students.${index}.name`, {
                      required: "Name is required",
                    })}
                    className="w-full rounded-lg border border-border bg-card text-text pl-10 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.students?.[index]?.name && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.students[index].name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="md:col-span-6 relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                  <input
                    type="email"
                    placeholder="attendee@email.com"
                    {...register(`students.${index}.email`, {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full rounded-lg border border-border bg-card text-text pl-10 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.students?.[index]?.email && (
                    <p className="mt-1 text-xs text-danger">
                      {errors.students[index].email.message}
                    </p>
                  )}
                </div>

                {/* Delete */}
                <div className="md:col-span-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="text-text-muted hover:text-danger disabled:opacity-40 mt-2 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="border-t border-border mt-6 pt-6 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() =>
                append({ name: "", email: "" })
              }
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-card-hover text-text transition-all font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Attendee
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-text-inverse hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Boarding Passes...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Generate & Send Passes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}