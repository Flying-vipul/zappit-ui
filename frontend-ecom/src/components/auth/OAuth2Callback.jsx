import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

/**
 * OAuth2Callback — the landing page after Google OAuth2 succeeds.
 *
 * The Spring Boot backend redirects here with:
 *   /oauth2/callback?token=<jwt>&username=<name>&id=<id>&roles=<roles>&profileImage=<url>
 *
 * This component reads those params, saves auth state to Redux + localStorage,
 * and navigates to the home page — exactly like a normal login.
 */
const OAuth2Callback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hasRun = useRef(false); // prevent double-run in React StrictMode

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const params = new URLSearchParams(window.location.search);
        const token       = params.get("token");
        const username    = params.get("username");
        const id          = params.get("id");
        const rolesRaw    = params.get("roles");
        const profileImage = params.get("profileImage");

        if (!token || !username) {
            toast.error("Google login failed. Please try again.");
            navigate("/login", { replace: true });
            return;
        }

        const roles = rolesRaw ? rolesRaw.split(",") : ["ROLE_USER"];

        // Build the same auth object that normal login produces
        const authData = {
            token,
            username,
            id: id ? parseInt(id) : null,
            roles,
            profileImage: profileImage || null,
        };

        // Persist to localStorage (same key used by the rest of the app)
        localStorage.setItem("auth", JSON.stringify(authData));

        // Update Redux state
        dispatch({ type: "LOGIN_USER", payload: authData });

        toast.success(`Welcome, ${username}! 🎉`);
        navigate("/", { replace: true });
    }, [dispatch, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-[#0a0a1a] dark:to-[#1a1040]">
            <div className="flex flex-col items-center gap-4">
                {/* Spinning Google-coloured loader */}
                <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
                <p className="text-slate-600 dark:text-gray-300 text-lg font-semibold animate-pulse">
                    Signing you in with Google…
                </p>
                <p className="text-slate-400 dark:text-gray-500 text-sm">
                    You will be redirected automatically.
                </p>
            </div>
        </div>
    );
};

export default OAuth2Callback;
