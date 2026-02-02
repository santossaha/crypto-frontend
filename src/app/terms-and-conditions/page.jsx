import React from 'react'
import Link from 'next/link'
import HeroSection from '../components/hero/HeroSection'

const page = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection 
        title="Terms and Conditions" 
        subtitle="Please read our terms and conditions carefully before using our platform"
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
          <li className="text-white font-bold">Terms and Conditions</li>
        </ul>
      </HeroSection>

      {/* Main Content */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Agreement to Terms</h3>
                <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Use License</h3>
                <p>Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Modifying or copying the materials</li>
                  <li>Using the materials for any commercial purpose or for any public display</li>
                  <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                  <li>Removing any copyright or other proprietary notations from the materials</li>
                  <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Disclaimer</h3>
                <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Limitations</h3>
                <p>In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Accuracy of Materials</h3>
                <p>The materials appearing on our website could include technical, typographical, or photographic errors. Our company does not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Links</h3>
                <p>We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">7. Modifications</h3>
                <p>We may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">8. Governing Law</h3>
                <p>These terms and conditions are governed by and construed in accordance with the laws of [Your Country/State], and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page