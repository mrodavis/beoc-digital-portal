export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-display font-bold text-white text-lg mb-4">
              About BEOC
            </h3>
            <p className="text-sm leading-relaxed">
              Brooklyn Educational Opportunity Center is dedicated to providing 
              accessible, high-quality digital skills training to empower learners 
              for success in the modern workplace.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-white text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/learning-paths/ms-office" className="hover:text-white transition-colors">
                  Microsoft Office 2019
                </a>
              </li>
              <li>
                <a href="/learning-paths/certification" className="hover:text-white transition-colors">
                  Certification Prep
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-white text-lg mb-4">
              Support
            </h3>
            <p className="text-sm leading-relaxed">
              For technical support or questions about the platform, 
              please contact your program coordinator.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} Brooklyn Educational Opportunity Center. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
