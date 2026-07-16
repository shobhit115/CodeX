import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { certificateService } from "../services/certificateService";

const VerifyCertificate = () => {
  const { certificateId } = useParams();

  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");

  const verificationURL = `${window.location.origin}/verify-certificate/${certificateId}`;

  useEffect(() => {
    fetchCertificate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateId]);

  const fetchCertificate = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await certificateService.verifyCertificate(certificateId);

      if (response.success) {
        setCertificate(response.data);
      } else {
        setError("Certificate not found.");
      }
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message || "Unable to verify this certificate."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const copyVerificationLink = async () => {
    try {
      await navigator.clipboard.writeText(verificationURL);
      alert("Verification link copied.");
    } catch {
      alert("Unable to copy link.");
    }
  };

  /* ---------------- Loading State ---------------- */
  if (loading) {
    return (
      <div className="app-shell flex items-center justify-center px-6">
        <div className="stat-card max-w-lg text-center items-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-[6px] border-border border-t-accent" />
          <h2 className="mt-8 font-sans text-2xl font-bold uppercase tracking-[0.3em] text-text">
            Verifying
          </h2>
          <p className="mt-4 text-text-muted text-sm font-mono uppercase tracking-widest">
            Checking authenticity...
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- Error State ---------------- */
  if (error || !certificate) {
    return (
      <div className="app-shell flex items-center justify-center px-6">
        <div className="stat-card max-w-2xl border-danger/50 text-center">
          <h1 className="mt-2 font-sans text-4xl lg:text-6xl uppercase tracking-[0.05em] text-danger">
            Invalid Certificate
          </h1>
          <p className="mt-6 text-text-muted font-mono uppercase tracking-widest text-sm">
            {error}
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- Main Certificate Page ---------------- */
  return (
    <div className="app-shell">
      {/* Fixed Print-Specific CSS */}
      <style>{`
        @media print {
          @page { size: landscape; margin: 0; }
          body { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            background-color: white !important;
          }
          
          /* 1. Hide everything on the page without collapsing the layout completely */
          body * {
            visibility: hidden;
          }

          /* 2. Show only the certificate wrapper and its children */
          #certificate-overlay, #certificate-overlay * {
            visibility: visible;
          }

          /* 3. Pull the certificate to the absolute top-left corner of the paper */
          #certificate-overlay {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 20px !important;
            background: white !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      <main
        id="certificate-overlay"
        className="main-content min-h-screen py-12 px-4 flex flex-col items-center justify-center relative overflow-y-auto"
      >
        {/* Background Ambient Glow matching the theme */}
        <div className="ambient-glow w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 print:hidden" />

        {/* Action Buttons using theme components */}
        <div className="relative z-10 w-full max-w-[1000px] flex flex-wrap justify-end gap-4 mb-8 print:hidden">
          <button onClick={handlePrint} className="button button--solid">
            Download PDF
          </button>
          <button
            onClick={copyVerificationLink}
            className="button button--secondary"
          >
            Copy Link
          </button>
        </div>

        {/* Certificate Container 
          FIXED: Removed 'md:aspect-[1.414/1]' and added 'min-h-[600px] md:min-h-[700px]' 
          so the container can grow vertically if the text wraps, preventing the bottom from overflowing.
        */}
        <div className="relative z-10 w-full max-w-[1000px] min-h-[600px] md:min-h-[700px] bg-white shadow-[0_18px_60px_rgba(13,13,13,0.15)] print:shadow-none print:w-full print:h-full print:max-w-none flex flex-col p-3 md:p-5 border-[10px] border-[#e5e7eb] border-double rounded-sm text-[#111111]">
          {/* Inner Border container */}
          <div className="relative border-4 border-[#d1d5db] flex-1 w-full p-4 md:p-8 flex flex-col justify-between text-center bg-[#fffdf9]">
            
            {/* Header */}
            <div className="flex justify-between items-start w-full shrink-0">
              <img
                src="/university-logo.svg"
                alt="University Logo"
                className="w-16 md:w-28 object-contain"
              />

              <div className="flex flex-col items-center px-2 md:px-4">
                <span className="inline-flex rounded-full border border-[#34d399] bg-[#ecfdf5] px-3 py-1 text-[8px] md:text-xs font-bold font-mono uppercase tracking-[0.2em] text-[#047857] mb-2 md:mb-4 shadow-sm">
                  ✔ Verified Authentic
                </span>
                <h1 className="text-3xl md:text-6xl font-sans font-bold uppercase tracking-[0.15em] text-[#111111] leading-none">
                  Certificate
                </h1>
                <h2 className="text-sm md:text-2xl font-serif tracking-widest text-[#555555] mt-2 italic">
                  of Achievement
                </h2>
              </div>

              <img
                src="/codex-logo.svg"
                alt="CodeX Logo"
                className="w-16 md:w-28 object-contain"
              />
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-col justify-center py-6 md:py-8">
              <p className="text-xs md:text-sm font-mono text-[#666666] uppercase tracking-widest mb-4">
                This is proudly presented to
              </p>

              <h2 className="text-3xl md:text-7xl font-serif italic text-[#111111] border-b-[3px] border-[#d1d5db] pb-3 mx-auto inline-block px-8 md:px-20 leading-tight">
                {certificate.studentName}
              </h2>

              <p className="text-xs md:text-sm font-mono text-[#666666] mt-6 md:mt-10 uppercase tracking-widest">
                For successfully participating in
              </p>

              <h3 className="mt-3 text-xl md:text-4xl font-sans font-medium uppercase tracking-wide text-[#111111]">
                {certificate.eventName}
              </h3>

              <div className="mt-6 md:mt-8">
                <span className="inline-flex bg-[#111111] px-5 py-2 md:px-8 md:py-3 rounded-none text-[10px] md:text-sm font-sans font-bold uppercase tracking-[0.25em] text-white">
                  {certificate.position}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-3 items-end text-left w-full gap-2 md:gap-4 shrink-0 font-mono">
              {/* Left: Metadata */}
              <div className="flex flex-col gap-3 md:gap-5 text-[8px] md:text-xs text-[#666666] pb-1">
                <div>
                  <p className="font-bold uppercase tracking-wider mb-1 text-[#888888]">
                    Certificate ID
                  </p>
                  <p className="font-semibold text-[#111111] break-all">
                    {certificate.certificateId}
                  </p>
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider mb-1 text-[#888888]">
                    Issued On
                  </p>
                  <p className="font-semibold text-[#111111]">
                    {formatDate(certificate.issuedAt)}
                  </p>
                </div>
              </div>

              {/* Center: QR Code */}
              <div className="flex flex-col items-center justify-end pb-1">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
                    verificationURL
                  )}`}
                  alt="Verification QR Code"
                  className="w-16 h-16 md:w-24 md:h-24 shadow-sm border border-[#e5e7eb] p-1 bg-white"
                />
                <p className="mt-3 text-[7px] md:text-[10px] uppercase tracking-[0.2em] text-[#666666] font-bold">
                  Scan to Verify
                </p>
              </div>

              {/* Right: Signature */}
              <div className="flex flex-col items-center justify-end text-center pb-1">
                {certificate.signatureImage ? (
                  <img
                    src={certificate.signatureImage}
                    alt="Coordinator Signature"
                    className="max-h-12 md:max-h-20 object-contain mb-3 mix-blend-multiply"
                  />
                ) : (
                  <div className="h-12 md:h-20 mb-3"></div> /* Spacer */
                )}

                <div className="w-full border-t-[2px] border-[#d1d5db] pt-2 md:pt-3">
                  <p className="font-bold text-[9px] md:text-sm text-[#111111] line-clamp-1 uppercase tracking-wide">
                    {certificate.coordinatorName}
                  </p>
                  <p className="text-[7px] md:text-[10px] text-[#888888] uppercase tracking-widest mt-1">
                    Coordinator
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyCertificate;