import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#cfcccc] text-gray-800 py-8 px-4 border-t border-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left: Harvard Signature */}
        <div className="flex items-center space-x-4">
          <Image
            src="/assets/bulletein.png" // Ensure this path points to the Veritas shield image
            alt="bulletinX"
            width={80}
            height={80}
          />
          <span className="text-4xl font-bold">BulleteinX</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex flex-col md:flex-row gap-5 text-m md:items-center md:justify-center">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/newsletter" className="hover:underline">
            Newsletter
          </Link>
          <Link href="/sign-in" className="hover:underline">
            Are you admin?Login
          </Link>

        </div>

        {/* Right: Social Media Icons */}
        <div className="flex space-x-7">
          <a href="#" aria-label="Facebook">
            <svg
              className="w-7 h-7 text-gray-700 hover:text-gray-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Facebook SVG Path */}
              <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12H17l-.5 3h-2v7c4.8-.8 8.5-4.9 8.5-9.9z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg
              className="w-7 h-7 text-gray-700 hover:text-gray-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Twitter SVG Path */}
              <path d="M22 5.8c-.8.4-1.6.6-2.5.8.9-.5 1.6-1.4 2-2.4-.9.5-1.8.9-2.8 1.1A4.5 4.5 0 0 0 16.5 4c-2.5 0-4.4 2.3-3.8 4.7-3.8-.2-7.1-2-9.3-4.7C2.3 5.6 3 8 5 9.3c-.7 0-1.5-.2-2.1-.6v.1c0 2.3 1.7 4.3 4 4.7-.8.2-1.6.2-2.3.1.7 2 2.5 3.5 4.8 3.5C8 18 5.5 18.7 3 18.3c2.3 1.5 5 2.4 8 2.4 9.6 0 14.9-8.2 14.6-15.5.9-.6 1.6-1.4 2.2-2.3z" />
            </svg>
          </a>
          <a href="#" aria-label="LinkedIn">
            <svg
              className="w-7 h-7 text-gray-700 hover:text-gray-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* LinkedIn SVG Path */}
              <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.08 1 2.5 1 5 2.12 5 3.5zM.54 8h3.92V24H.54V8zM8.1 8h3.75v2.2h.05c.52-1 1.8-2.2 3.7-2.2 3.9 0 4.62 2.6 4.62 6v9.8h-3.92v-8.7c0-2.1-.03-4.7-2.87-4.7-2.87 0-3.31 2.2-3.31 4.5v8.9H8.1V8z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom: Legal Notice */}
      <div className="mt-6 text-center text-xs text-gray-700">
        © 2025 The President and Fellows of bulletinX
      </div>
    </footer>
  );
}
