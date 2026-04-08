import Link from "next/link";
import Image from "next/image";

const offices = [
  {
    name: "Headquarters",
    address: "717 Texas Avenue Suite 1200, Houston, Texas 77002",
  },
  {
    name: "Business Development and Ohio River Valley Acquisitions",
    address: "201 E. Fifth Street Suite 1900, Cincinnati, OH 45202",
  },
];

export default function Footer() {
  return (
    <footer className="bg-aprium-purple px-6 py-12 text-white lg:px-10" style={{ borderTop: "2px solid #F7941D" }}>
      <div className="mx-auto max-w-7xl">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/">
            <Image
              src="/aprium_logo.png"
              alt="Aprium Energy"
              width={140}
              height={42}
              className="brightness-0 invert"
            />
          </Link>
        </div>

        {/* Office addresses */}
        <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
          {offices.map((office) => (
            <div key={office.name}>
              <p className="text-sm font-semibold text-aprium-orange">
                {office.name}
              </p>
              <p className="mt-1 text-sm text-white/80">{office.address}</p>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-white/20 pt-6">
          <p className="text-sm text-white/60">
            &copy; 2025 Aprium Energy. All rights reserved. |{" "}
            <Link
              href="https://www.aprium.ai"
              className="underline hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.aprium.ai
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
