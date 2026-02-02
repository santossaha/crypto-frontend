import React from 'react'
import Link from 'next/link'
import HeroSection from '../components/hero/HeroSection'

const page = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        title="Privacy Policy" 
        subtitle="We are committed to protecting your privacy and ensuring you have a positive experience on our website"
      >
        <ul className="flex items-center justify-center gap-2 text-sm">
          <li>
            <Link 
              href="/" 
              className="text-violet-200 hover:text-white hover:underline font-semibold"
            >
              Home
            </Link>
          </li>
          <li className="text-violet-200 font-semibold">/</li>
          <li className="text-white font-bold">Privacy Policy</li>
        </ul>
      </HeroSection>

      {/* Main Content */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Introduction</h3>
                <p>This Privacy Policy explains how we collect, use, disclose, and otherwise process personal information in connection with our websites, mobile applications, and other services that link to this Privacy Policy (collectively, the "Services"). Please read this policy carefully to understand our privacy practices.</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Information We Collect</h3>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide directly</li>
                  <li><strong>Device Information:</strong> IP address, browser type, and device identifiers</li>
                  <li><strong>Usage Information:</strong> Pages visited, time spent, and interactions with our Services</li>
                  <li><strong>Cookies:</strong> Data stored on your device to improve user experience</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. How We Use Your Information</h3>
                <p>We use the information we collect for purposes including:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Providing, maintaining, and improving our Services</li>
                  <li>Communicating with you about updates and changes</li>
                  <li>Personalizing your experience</li>
                  <li>Analyzing trends and improving our Services</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Information Sharing</h3>
                <p>We do not sell, rent, or share your personal information with third parties except in the following circumstances:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>With service providers who assist us in operating our Services</li>
                  <li>When required by law or legal process</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Data Security</h3>
                <p>We implement appropriate technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h3>
                <p>Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. Contact us to exercise these rights.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Cookies and Tracking Technologies</h3>
                <p>We use cookies and similar tracking technologies to track activity on our Services and hold certain information. You can instruct your browser to refuse cookies, but some parts of our Services may not function properly without them.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time. The date of the last revision will be indicated at the bottom of this page. Your continued use of our Services after changes indicates your acceptance of the updated Privacy Policy.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">9. Contact Us</h3>
                <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
                <p className="mt-2"><strong>Email:</strong> privacy@example.com<br/><strong>Address:</strong> [Your Company Address]</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page