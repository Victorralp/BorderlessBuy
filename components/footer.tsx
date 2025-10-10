"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, Send, ChevronUp } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  return (
    <footer className="mt-20 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Grova</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Your everyday grocery shop for authentic international foods.
            </p>
            <div className="flex space-x-2">
              {[
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/shop", label: "Shop" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-600 hover:text-emerald-600 transition-colors inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Help</h4>
            <ul className="space-y-3">
              {[
                { href: "/faq", label: "FAQs" },
                { href: "/shipping", label: "Shipping" },
                { href: "/returns", label: "Returns" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-600 hover:text-emerald-600 transition-colors inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Stay Updated</h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Subscribe to get special offers and updates.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setEmail("")
                  toast({
                    title: "Subscribed!",
                    description: "You'll receive our next newsletter soon.",
                  })
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your email"
                  className="flex-1 text-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-gray-50"
                />
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                  aria-label="Subscribe"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <div className="pt-2 space-y-2">
                <p className="text-sm text-gray-600 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  info@grova.co.uk
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  +44 20 1234 5678
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8 mt-12 text-sm text-gray-500">
          <p className="mb-4 md:mb-0">© {currentYear} Grova. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="flex items-center hover:text-emerald-600 transition-colors"
            >
              <ChevronUp className="h-4 w-4 mr-1" />
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}