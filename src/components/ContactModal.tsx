"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [closing, setClosing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setSubmitted(false);
      setSubmitError("");
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (submitted) {
      timerRef.current = setTimeout(handleClose, 3000);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [submitted, handleClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const website = (form.elements.namedItem("website") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const company = (form.elements.namedItem("company") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    if (!name || !company || !email || !EMAIL_REGEX.test(email)) return;

    setSubmitError("");
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          inquiryType: "General Inquiry",
          message,
          website,
        }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or email us directly at drew@aprium.ai");
    } finally {
      setSending(false);
    }
  };

  const animClass = closing
    ? "opacity-0 scale-95"
    : "opacity-100 scale-100";

  const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-aprium-orange focus:ring-1 focus:ring-aprium-orange";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
        closing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative mx-4 w-full max-w-lg rounded-xl bg-white p-8 shadow-2xl transition-all duration-200 ease-out ${animClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Close"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image src="/aprium_logo.png" alt="Aprium Energy" width={140} height={42} />
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-aprium-purple/10">
              <svg className="h-7 w-7 text-aprium-purple" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-aprium-purple">Thanks! We&rsquo;ll be in touch soon.</p>
          </div>
        ) : (
          <>
            <h2 className="mb-1 text-center text-xl font-bold text-aprium-purple">Get In Touch</h2>
            <p className="mb-6 text-center text-sm text-gray-500">Tell us about your project and we&rsquo;ll get back to you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* SECURITY: honeypot field — do not remove */}
              <div style={{ position: "absolute", opacity: 0, height: 0, width: 0, zIndex: -1 }}>
                <input tabIndex={-1} autoComplete="off" name="website" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="modal-name" className="mb-1 block text-xs font-medium text-gray-700">Name *</label>
                  <input id="modal-name" name="name" type="text" required maxLength={100} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="modal-company" className="mb-1 block text-xs font-medium text-gray-700">Company *</label>
                  <input id="modal-company" name="company" type="text" required maxLength={100} className={inputClass} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="modal-email" className="mb-1 block text-xs font-medium text-gray-700">Email *</label>
                  <input id="modal-email" name="email" type="email" required maxLength={254} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="modal-phone" className="mb-1 block text-xs font-medium text-gray-700">Phone</label>
                  <input id="modal-phone" name="phone" type="tel" maxLength={20} className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="modal-message" className="mb-1 block text-xs font-medium text-gray-700">Message</label>
                <textarea id="modal-message" name="message" rows={4} maxLength={2000} placeholder="Tell us about your power requirements..." className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-aprium-orange focus:ring-1 focus:ring-aprium-orange" />
              </div>

              {submitError && (
                <p className="text-sm text-red-600">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-aprium-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
                {!sending && (
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
