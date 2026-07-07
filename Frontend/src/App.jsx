import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { adminService } from "./services/adminService";
import { setLogin, setLogout, setAuthResolved } from "./context/authSlice";
import GlobalMessage from "./components/common/GlobalMessage";

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-[#2ec5d4] font-jetbrains">
    <div className="animate-pulse font-bold tracking-widest uppercase">
      Initializing Module...
    </div>
  </div>
);

function App({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAuthResolved(false));
    const fetchProfile = async () => {
      try {
        const response = await adminService.getCurrentAdmin();
        // Assuming response or response.data contains the user payload
        dispatch(setLogin(response.data || response)); 
      } catch (error) {
        dispatch(setLogout());
      } finally {
        dispatch(setAuthResolved(true));
      }
    };

    if (localStorage.getItem("trueLogin") === "true") {
      fetchProfile();
    } else {
      // Allow initial API call anyway for strict session verification,
      // or just assume not logged in to save API calls.
      // We will assume not logged in to mimic Resume Saathi.
      dispatch(setAuthResolved(true));
    }
  }, [dispatch]);

  return (
    <>
      <GlobalMessage />
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </>
  );
}

export default App;
