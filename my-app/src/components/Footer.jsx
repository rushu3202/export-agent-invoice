import { Mail, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <div className="mb-4">
            <h3 className="text-white font-bold text-lg mb-2">EXPORTAGENT LTD</h3>
            <p className="text-sm text-gray-400">Registered in England and Wales</p>
            <p className="text-sm text-gray-400">Company No: {import.meta.env.VITE_COMPANY_NUMBER || 'TBC'}</p>
            <p className="text-sm text-gray-400">Registered Address: {import.meta.env.VITE_REGISTERED_ADDRESS || 'TBC'}</p>
            {import.meta.env.VITE_VAT_NUMBER && (
              <p className="text-sm text-gray-400">VAT: {import.meta.env.VITE_VAT_NUMBER}</p>
            )}
          </div>

          <div className="flex items-center justify-center gap-6 mb-6">
            <a
              href="https://linkedin.com/company/exportagent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/exportagent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@exportagent.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} ExportAgent Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
