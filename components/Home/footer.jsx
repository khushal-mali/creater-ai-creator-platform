import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function Footer() {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Content Feed", href: "/feed" },
      { name: "Analytics", href: "/analytics" },
      { name: "Pricing", href: "/pricing" },
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Help Center", href: "/help" },
      { name: "Tutorials", href: "/tutorials" },
      { name: "API Docs", href: "/docs" },
      { name: "Community", href: "/community" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press Kit", href: "/press" },
      { name: "Contact", href: "/contact" },
      { name: "Partners", href: "/partners" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR", href: "/gdpr" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="relative z-10 border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-black">
                <span className="bg-linear-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  CreatorPlatform
                </span>
              </h3>
              <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                Empowering creators worldwide with AI-powered tools to create,
                publish, and grow their content business.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-purple-400" />
                <span>hello@creatorplatform.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-purple-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-purple-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-gray-800 to-gray-900 transition-all duration-300 hover:scale-110 hover:from-purple-500 hover:to-blue-500"
                >
                  <social.icon className="h-5 w-5 text-gray-400 transition-colors group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {/* Product Links */}
            <div>
              <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-purple-400"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-purple-400"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-purple-400"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-purple-400"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="text-center lg:text-left">
              <h4 className="mb-2 text-lg font-bold text-white">
                Stay Updated
              </h4>
              <p className="text-sm text-gray-400">
                Get the latest creator tips and platform updates delivered to
                your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-full border border-gray-700 bg-gray-900/50 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
              />
              <button className="rounded-full bg-linear-to-r from-purple-500 to-blue-500 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-black/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 sm:flex-row">
            <p>
              © {new Date().getFullYear()} CreatorPlatform. All rights reserved.
            </p>
            <p>
              Made with <span className="text-red-500">❤️</span> by{" "}
              <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text font-semibold text-transparent">
                Khushal Mali
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
