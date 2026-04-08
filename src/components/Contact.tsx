"use client";

import { useState, useEffect, useRef } from "react";

// SECURITY: email decoded at runtime to prevent harvesting
const E1 = "ZHJld0BhcHJpdW0uYWk=";
const E2 = "b25kcmVqQGFwcml1bS5haQ==";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(str: string): string {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

const offices = [
  {
    label: "Headquarters",
    address: "717 Texas Avenue Suite 1200, Houston, Texas 77002",
    phones: [
      { number: "281-433-2641", note: "Business Development and General Inquiries" },
      { number: "512-629-1242", note: "Land, Engineering, and Vendor Support" },
    ],
  },
  {
    label: "Business Development and Ohio River Valley Acquisitions",
    address: "201 E. Fifth Street Suite 1900, Cincinnati, OH 45202",
    phones: [
      { number: "312-479-3749", note: "" },
    ],
  },
];

const inquiryTypes = [
  "General Inquiry",
  "Power Development",
  "Water Infrastructure",
  "Partnership",
  "Investment",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const mailtoRef = useRef("");

  useEffect(() => {
    mailtoRef.current = `${atob(E1)},${atob(E2)}`;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = section.querySelectorAll(".fade-in-item");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // SECURITY: honeypot field — do not remove
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement).value;
    if (honeypot) {
      setSubmitted(true);
      return;
    }

    const name = sanitize((form.elements.namedItem("name") as HTMLInputElement).value);
    const company = sanitize((form.elements.namedItem("company") as HTMLInputElement).value);
    const email = sanitize((form.elements.namedItem("email") as HTMLInputElement).value);
    const phone = sanitize((form.elements.namedItem("phone") as HTMLInputElement).value);
    const inquiryType = (form.elements.namedItem("inquiryType") as HTMLSelectElement).value;
    const message = sanitize((form.elements.namedItem("message") as HTMLTextAreaElement).value);

    const newErrors: Record<string, boolean> = {};
    if (!name) newErrors.name = true;
    if (!company) newErrors.company = true;
    if (!email || !EMAIL_REGEX.test(email)) newErrors.email = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // TODO: replace with API route or form service (e.g. Resend, Formspree)
    const subject = encodeURIComponent("Aprium Energy \u2014 Website Inquiry");
    const body = encodeURIComponent(
      `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nInquiry Type: ${inquiryType}\n\nMessage:\n${message || "N/A"}`
    );

    window.location.href = `mailto:${mailtoRef.current}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full rounded-md border px-3 py-2 text-sm outline-none transition-colors focus:border-aprium-orange focus:ring-1 focus:ring-aprium-orange ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <section className="px-6 py-10 lg:px-10 lg:py-16" style={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
      <div className="mx-auto max-w-7xl" ref={sectionRef}>
        {/* Section header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-aprium-purple md:text-4xl">Get In Touch</h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-aprium-orange" />
          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-500 md:text-base">
            Ready to unlock power for your project? Let&rsquo;s talk.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left — office addresses */}
          <div className="fade-in-item translate-y-6 opacity-0 transition-all duration-500 ease-out">
            <div className="space-y-6">
              {offices.map((office) => (
                <div
                  key={office.label}
                  className="rounded-lg border-l-4 border-aprium-orange p-5"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.80)" }}
                >
                  <h3 className="text-sm font-bold text-aprium-purple">{office.label}</h3>
                  <p className="mt-2 text-sm text-aprium-purple/80">{office.address}</p>
                  <div className="mt-3 space-y-1">
                    {office.phones.map((phone) => (
                      <div key={phone.number} className="flex items-start gap-2">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-aprium-orange" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-aprium-black">{phone.number}</p>
                          {phone.note && <p className="text-xs text-gray-500">{phone.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — contact form */}
          <div className="fade-in-item translate-y-6 opacity-0 transition-all duration-500 ease-out" style={{ transitionDelay: "100ms" }}>
            {submitted ? (
              <div className="flex h-full items-center justify-center rounded-lg p-8" style={{ backgroundColor: "rgba(255, 255, 255, 0.80)" }}>
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-aprium-purple/10">
                    <svg className="h-7 w-7 text-aprium-purple" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-aprium-purple">Thanks! We&rsquo;ll be in touch soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 rounded-lg p-6" style={{ backgroundColor: "rgba(255, 255, 255, 0.80)" }}>
                {/* SECURITY: honeypot field — do not remove */}
                <div style={{ position: "absolute", opacity: 0, height: 0, width: 0, zIndex: -1 }}>
                  <input tabIndex={-1} autoComplete="off" name="website" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1 block text-xs font-medium text-gray-700">Name *</label>
                    <input id="contact-name" name="name" type="text" maxLength={100} className={inputClass("name")} />
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="mb-1 block text-xs font-medium text-gray-700">Company *</label>
                    <input id="contact-company" name="company" type="text" maxLength={100} className={inputClass("company")} />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className="mb-1 block text-xs font-medium text-gray-700">Email *</label>
                    <input id="contact-email" name="email" type="email" maxLength={254} className={inputClass("email")} />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="mb-1 block text-xs font-medium text-gray-700">Phone</label>
                    <input id="contact-phone" name="phone" type="tel" maxLength={20} className={inputClass("phone")} />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-inquiry" className="mb-1 block text-xs font-medium text-gray-700">Inquiry Type</label>
                  <select id="contact-inquiry" name="inquiryType" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-aprium-orange focus:ring-1 focus:ring-aprium-orange">
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1 block text-xs font-medium text-gray-700">Message</label>
                  <textarea id="contact-message" name="message" rows={4} maxLength={2000} placeholder="Tell us about your power requirements..." className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-aprium-orange focus:ring-1 focus:ring-aprium-orange" />
                </div>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-md bg-aprium-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
                  Send Message
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
