import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Shield, Fingerprint } from "lucide-react";

export function SignInForm({ onSubmit, onForgot, onSSO, loading, error, email, setEmail }: any) {
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Welcome back.</h1>
        <p className="text-sm text-slate-400 font-medium">Sign in to your ONIT workspace.</p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(email, password); }} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Work Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Password</label>
          </div>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors"
            />
            <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500/50" />
              <span className="text-xs text-slate-400 font-medium group-hover:text-slate-300">Remember me</span>
            </label>
            <button type="button" onClick={onForgot} className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">
              Forgot password?
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading || !email || !password}
          className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 rounded-lg transition-colors flex justify-center items-center gap-2"
        >
          {loading ? "Authenticating..." : "SIGN IN"}
        </button>
      </form>

      <div className="mt-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-slate-800"></div>
          <div className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Or continue with</div>
          <div className="flex-1 h-px bg-slate-800"></div>
        </div>

        <div className="flex flex-col gap-3">
          <SocialButton icon={<MsIcon />} label="Continue with Microsoft" />
          <SocialButton icon={<GoogleIcon />} label="Continue with Google" />
          <button 
            onClick={onSSO}
            className="w-full bg-transparent hover:bg-slate-900 border border-slate-800 text-slate-300 text-sm font-bold py-3 rounded-lg transition-colors"
          >
            Sign in with SSO
          </button>
        </div>
      </div>

      <div className="mt-12 text-center text-sm font-medium text-slate-500">
        Don't have access yet? <a href="#" className="text-indigo-400 hover:text-indigo-300 font-bold ml-1">REQUEST A DEMO →</a>
      </div>
    </div>
  );
}

export function SSOForm({ onBack, onSubmit, loading, error, defaultEmail = "" }: any) {
  const [domain, setDomain] = useState(defaultEmail.split('@')[1] || "");

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="text-xs font-bold text-slate-500 hover:text-slate-300 mb-8 flex items-center gap-1">
        ← Back to Sign In
      </button>

      <div className="mb-10">
        <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Enterprise SSO</h1>
        <p className="text-sm text-slate-400 font-medium">Enter your company domain to sign in via SSO.</p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(domain); }} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Company Domain</label>
          <input
            type="text"
            value={domain}
            onChange={e => setDomain(e.target.value)}
            placeholder="company.com"
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !domain}
          className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 rounded-lg transition-colors flex justify-center items-center gap-2"
        >
          {loading ? "Locating Provider..." : "CONTINUE"}
        </button>
      </form>
    </div>
  );
}

export function ForgotPasswordForm({ onBack, onSubmit, loading, error, success }: any) {
  const [email, setEmail] = useState("");

  if (success) {
    return (
      <div className="animate-in fade-in zoom-in-95 duration-300 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <Shield size={24} className="text-emerald-400" />
        </div>
        <h1 className="text-2xl font-black text-white tracking-tighter mb-3">Check your inbox.</h1>
        <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">
          If an ONIT account exists for this email, password reset instructions have been sent.
        </p>
        <button onClick={onBack} className="w-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold py-3.5 rounded-lg transition-colors">
          RETURN TO SIGN IN
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <button onClick={onBack} className="text-xs font-bold text-slate-500 hover:text-slate-300 mb-8 flex items-center gap-1">
        ← Back to Sign In
      </button>

      <div className="mb-10">
        <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Reset your password</h1>
        <p className="text-sm text-slate-400 font-medium">Enter your work email and we'll send instructions to reset your ONIT password.</p>
      </div>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(email); }} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Work Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition-colors"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !email}
          className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 rounded-lg transition-colors flex justify-center items-center gap-2"
        >
          {loading ? "Sending..." : "SEND RESET LINK"}
        </button>
      </form>
    </div>
  );
}

export function MFAForm({ onSubmit, loading, error, onBack }: any) {
  const [code, setCode] = useState("");

  return (
    <div className="animate-in fade-in zoom-in-95 duration-300 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6">
        <Fingerprint size={28} className="text-indigo-400" />
      </div>
      
      <h1 className="text-2xl font-black text-white tracking-tighter mb-2">Verify your identity</h1>
      <p className="text-sm text-slate-400 font-medium mb-8">Enter the 6-digit verification code from your authenticator.</p>

      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-400 text-left">
          {error}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(code); }} className="flex flex-col gap-6">
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0,6))}
          placeholder="000000"
          className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg px-4 py-4 text-3xl tracking-[0.5em] text-center text-white placeholder:text-slate-700 outline-none transition-colors font-mono"
        />

        <div className="flex flex-col gap-3">
          <button 
            type="submit" 
            disabled={loading || code.length !== 6}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white text-sm font-bold py-3.5 rounded-lg transition-colors flex justify-center items-center"
          >
            {loading ? "Verifying..." : "VERIFY"}
          </button>
          
          <button type="button" onClick={onBack} className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors py-2">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Helpers

function SocialButton({ icon, label }: { icon: any; label: string }) {
  return (
    <button className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-sm font-bold py-3 rounded-lg transition-colors">
      <div className="w-5 h-5 flex items-center justify-center">{icon}</div>
      {label}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function MsIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}
