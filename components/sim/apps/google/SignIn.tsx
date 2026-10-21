"use client";

import { useEffect, useRef, useState } from "react";
import { GIcon } from "./icons";
import { meOf } from "./model";
import { Avatar, FONT, TEXT_FONT, useG } from "./ui";

/** The four-color Google "G". */
function GLogo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Field({ label, type = "text", onEnter, autoFocus = true }: { label: string; type?: string; onEnter: (v: string) => void; autoFocus?: boolean }) {
  const [v, setV] = useState("");
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (autoFocus) ref.current?.focus(); }, [autoFocus]);
  return (
    <>
      <label className="relative block">
        <span className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#444746]">{label}</span>
        <input
          ref={ref}
          aria-label={label}
          type={type === "password" && !show ? "password" : type === "password" ? "text" : type}
          autoComplete="off"
          value={v}
          onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Enter" && v.trim()) onEnter(v); }}
          className="h-14 w-full rounded border border-[#747775] px-4 text-[16px] text-[#1f1f1f] outline-none focus:border-2 focus:border-[#0b57d0]"
          data-submit={v}
        />
      </label>
      {type === "password" && (
        <label className="mt-3 flex items-center gap-3 text-[14px] text-[#1f1f1f]">
          <input type="checkbox" aria-label="Show password" checked={show} onChange={(e) => setShow(e.target.checked)} className="h-[18px] w-[18px] accent-[#0b57d0]" />
          Show password
        </label>
      )}
      <NextRow onNext={() => { if (v.trim()) onEnter(v); }} />
    </>
  );
}

function NextRow({ onNext, left }: { onNext: () => void; left?: React.ReactNode }) {
  return (
    <div className="mt-8 flex items-center justify-between">
      <span>{left}</span>
      <button type="button" onClick={onNext} className="h-10 rounded-full bg-[#0b57d0] px-6 text-[14px] font-medium text-white hover:bg-[#0842a0]" style={{ fontFamily: FONT }}>
        Next
      </button>
    </div>
  );
}

/** accounts.google.com: Choose an account, email, password, and 2-Step Verification. */
export function SignInPage() {
  const g = useG();
  const { doc } = g;
  const me = meOf(doc);
  const step = String(doc.flags?.signin ?? "email");
  const err = doc.flags?.signinError ? String(doc.flags.signinError) : "";
  const to = doc.homeApp ? `Google ${doc.homeApp === "docs" ? "Docs" : doc.homeApp === "sheets" ? "Sheets" : "Slides"}` : "Google Drive";
  const send = (target: string, value: string) => g.onCommit({ kind: "type", target, value });

  let title = "Sign in";
  let sub: React.ReactNode = <>to continue to {to}</>;
  let body: React.ReactNode = null;
  if (step === "chooser") {
    title = "Choose an account";
    body = (
      <ul className="-mx-2" aria-label="Accounts">
        <li>
          <button type="button" aria-label={`${me.name} ${me.email} Signed out`} onClick={() => g.cmd("g.signin.step", "password")} className="flex w-full items-center gap-3 border-b border-[#e0e0e0] px-2 py-3 text-left hover:bg-[#f1f3f4]">
            <Avatar person={me} size={28} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-medium">{me.name}</span>
              <span className="block truncate text-[12px] text-[#444746]">{me.email}</span>
            </span>
            <span className="text-[12px] text-[#444746]">Signed out</span>
          </button>
        </li>
        <li>
          <button type="button" onClick={() => g.cmd("g.signin.step", "email")} className="flex w-full items-center gap-3 px-2 py-3 text-left text-[14px] font-medium hover:bg-[#f1f3f4]">
            <span className="flex h-7 w-7 items-center justify-center"><GIcon name="person" size={22} /></span>
            Use another account
          </button>
        </li>
      </ul>
    );
  } else if (step === "email") {
    body = (
      <>
        <Field key="email" label="Email or phone" onEnter={(v) => send("signin:email", v.trim())} />
        <button type="button" onClick={() => g.cmd("g.toast", "Forgot email? asks for your recovery phone number or email")} className="mt-2 text-[14px] font-medium text-[#0b57d0]">Forgot email?</button>
        <p className="mt-8 text-[14px] text-[#444746]">Not your computer? Use a private browsing window to sign in.</p>
      </>
    );
  } else if (step === "password") {
    title = `Hi ${me.name.split(" ")[0]}`;
    sub = (
      <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#747775] py-1 pl-1 pr-3 text-[14px]">
        <Avatar person={me} size={20} /> {me.email}
      </span>
    );
    body = <Field key="password" label="Enter your password" type="password" onEnter={(v) => send("signin:password", v)} />;
  } else if (step === "2sv") {
    title = "2-Step Verification";
    sub = <>To help keep your account safe, Google wants to make sure it&apos;s really you trying to sign in</>;
    body = (
      <div className="text-[14px] text-[#1f1f1f]">
        <div className="mb-4 flex items-center gap-3 rounded-lg bg-[#f1f3f4] p-3">
          <GIcon name="phone" size={28} color="#0b57d0" />
          <span><b>Check your phone</b><br />Google sent a notification to your phone. Tap <b>Yes</b> on the notification to verify it&apos;s you.</span>
        </div>
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => g.cmd("g.signin.step", "code")} className="font-medium text-[#0b57d0]">Try another way</button>
          <button type="button" onClick={() => g.cmd("g.toast", "A new notification was sent to your phone")} className="font-medium text-[#0b57d0]">Resend it</button>
        </div>
        {/* The practice phone: the prompt that appears on a signed-in phone. */}
        <div className="mx-auto mt-6 w-[230px] rounded-[26px] border-[6px] border-[#202124] bg-white p-4 text-center shadow-lg" role="dialog" aria-label="Your phone">
          <div className="mb-1 text-[11px] text-[#5f6368]">Your phone</div>
          <div className="mb-1 flex justify-center"><GIcon name="shield" size={26} color="#1a73e8" /></div>
          <div className="mb-1 text-[15px] font-medium">Are you trying to sign in?</div>
          <div className="mb-3 text-[11px] text-[#444746]">{me.email}<br />Windows · Chrome · New York, NY</div>
          <div className="flex gap-2">
            <button type="button" aria-label="No, it's not me" onClick={() => g.cmd("g.2sv", "No")} className="flex-1 rounded-full border border-[#747775] py-1.5 text-[12px] font-medium text-[#0b57d0]">No, it&apos;s not me</button>
            <button type="button" aria-label="Yes" onClick={() => g.cmd("g.2sv", "Yes")} className="flex-1 rounded-full bg-[#0b57d0] py-1.5 text-[12px] font-medium text-white">Yes</button>
          </div>
        </div>
      </div>
    );
  } else if (step === "code") {
    title = "2-Step Verification";
    sub = <>Enter one of your 8-digit backup codes or a code from your authenticator app</>;
    body = <Field key="code" label="Enter code" onEnter={(v) => send("signin:code", v.trim())} />;
  }

  return (
    <div className="flex h-full items-center justify-center overflow-auto bg-[#f0f4f9] p-4" style={{ fontFamily: TEXT_FONT }}>
      <div className="flex w-full max-w-[1040px] flex-col gap-8 rounded-[28px] bg-white p-9 md:flex-row" role="main" aria-label="Google sign-in">
        <div className="md:w-1/2">
          <GLogo size={44} />
          <h1 className="mt-6 text-[36px] leading-[44px] text-[#1f1f1f]" style={{ fontFamily: FONT }}>{title}</h1>
          <div className="mt-3 text-[16px] text-[#1f1f1f]">{sub}</div>
        </div>
        <div className="md:w-1/2 md:pt-16">
          {err && (
            <p role="alert" className="mb-4 flex items-center gap-2 text-[13px] text-[#b3261e]">
              <GIcon name="info" size={18} color="#b3261e" /> {err}
            </p>
          )}
          {body}
        </div>
      </div>
    </div>
  );
}
