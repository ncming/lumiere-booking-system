const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How we collect, use, and protect your data',
    updated: 'Last updated: 1 January 2025',
    sections: [
      {
        heading: '1. Information We Collect',
        body: `MITU Maison collects personal information that you voluntarily provide when you interact with our website, boutiques, or client services. This includes your name, email address, postal address, telephone number, and payment information when you place an order. We may also collect browsing data, device information, and cookies to improve your experience.`,
      },
      {
        heading: '2. How We Use Your Information',
        body: `We use your personal data to process orders and deliver products, manage your account, send you communications about products and services you have expressed interest in, and improve our services. We may personalise your experience based on your purchase history and browsing behaviour on our website.`,
      },
      {
        heading: '3. Data Sharing',
        body: `We do not sell your personal data to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements. We may also disclose your information when required by law.`,
      },
      {
        heading: '4. Data Retention',
        body: `We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, including for the purpose of satisfying any legal, accounting, or reporting requirements. Order data is retained for seven years in accordance with Vietnamese commercial law.`,
      },
      {
        heading: '5. Your Rights',
        body: `You have the right to access, correct, or delete your personal data at any time. You may also object to or restrict processing of your data, or request data portability. To exercise these rights, please contact our Client Relations team at privacy@mitumaison.com.`,
      },
    ],
  },
  legal: {
    title: 'Legal Mentions',
    subtitle: 'Terms of use and legal information',
    updated: 'Last updated: 1 January 2025',
    sections: [
      {
        heading: 'Publisher',
        body: `This website is published by MITU Maison Co., Ltd., a company registered in Vietnam under business registration number 0123456789, with registered office at 24 Hai Bà Trưng, Hoàn Kiếm, Hà Nội, Vietnam.`,
      },
      {
        heading: 'Intellectual Property',
        body: `All content on this website, including but not limited to text, images, graphics, logos, and software, is the exclusive property of MITU Maison or its licensors and is protected by applicable intellectual property laws. Reproduction, modification, or distribution of any content without express written consent is strictly prohibited.`,
      },
      {
        heading: 'Limitation of Liability',
        body: `MITU Maison makes every effort to ensure that the information on this website is accurate and up to date. However, we make no representations or warranties, express or implied, as to the accuracy, completeness, or timeliness of the information. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website.`,
      },
      {
        heading: 'Governing Law',
        body: `These terms are governed by the laws of the Socialist Republic of Vietnam. Any disputes arising in connection with the use of this website shall be subject to the exclusive jurisdiction of the courts of Hà Nội, Vietnam.`,
      },
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    subtitle: 'How we use cookies and similar technologies',
    updated: 'Last updated: 1 January 2025',
    sections: [
      {
        heading: 'What Are Cookies?',
        body: `Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your experience. We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period).`,
      },
      {
        heading: 'Essential Cookies',
        body: `These cookies are necessary for the website to function properly and cannot be disabled. They enable core features such as your shopping bag, wishlist, and user session management. Without these cookies, essential services cannot be provided.`,
      },
      {
        heading: 'Analytics Cookies',
        body: `We use analytics cookies to understand how visitors interact with our website. This data helps us improve our website's performance and content. Analytics data is aggregated and anonymised where possible. You may opt out of analytics tracking at any time.`,
      },
      {
        heading: 'Marketing & Personalisation Cookies',
        body: `With your consent, we use marketing cookies to deliver personalised content and relevant advertisements based on your interests. These cookies may be set by our advertising partners. You can manage your preferences in our cookie settings below.`,
      },
      {
        heading: 'Managing Your Preferences',
        body: `You can control cookie settings through your browser preferences. Please note that disabling certain cookies may affect your ability to use some features of our website. You may update your cookie preferences at any time by clearing your browser cookies and revisiting this page.`,
      },
    ],
  },
  accessibility: {
    title: 'Accessibility',
    subtitle: 'Our commitment to an inclusive digital experience',
    updated: 'Last updated: 1 January 2025',
    sections: [
      {
        heading: 'Our Commitment',
        body: `MITU Maison is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards to our website and digital communications.`,
      },
      {
        heading: 'Standards',
        body: `We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. Our website is designed to be usable with assistive technologies, including screen readers, keyboard navigation, and high-contrast modes.`,
      },
      {
        heading: 'Features',
        body: `Our website includes: keyboard-navigable menus and controls; ARIA labels and roles for all interactive elements; sufficient colour contrast ratios; scalable text that responds to browser font size preferences; alternative text for all informative images; and no content that flashes more than three times per second.`,
      },
      {
        heading: 'Known Limitations',
        body: `While we strive to adhere to best practices, some older content may not yet meet all accessibility standards. We are working continuously to resolve any known issues. Some third-party content embedded on our pages may not fully conform to our accessibility standards.`,
      },
      {
        heading: 'Feedback & Contact',
        body: `If you experience any difficulty accessing content on our website, or if you have suggestions for improvement, please contact our Client Relations team at accessibility@mitumaison.com or call 0339 708 788. We aim to respond to all accessibility enquiries within 2 business days.`,
      },
    ],
  },
};

const TABS = [
  { key: 'privacy', label: 'Privacy Policy' },
  { key: 'legal', label: 'Legal Mentions' },
  { key: 'cookies', label: 'Cookies' },
  { key: 'accessibility', label: 'Accessibility' },
];

const LegalPage = ({ type = 'privacy', setActiveTab }) => {
  const content = LEGAL_CONTENT[type] || LEGAL_CONTENT.privacy;

  return (
    <div style={{ minHeight: '80vh', backgroundColor: '#FFFFFF', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(40px, 7vw, 72px) 24px 0',
        borderBottom: '1px solid #EEEEEE',
      }}>
        <div style={{ fontSize: '9px', letterSpacing: '4px', color: '#757575', textTransform: 'uppercase', marginBottom: '12px' }}>
          Legal
        </div>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(24px, 3.5vw, 38px)',
          fontWeight: '400', letterSpacing: '3px', marginBottom: '24px',
        }}>
          {content.title}
        </h1>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '0', overflowX: 'auto',
          borderTop: '1px solid #EEEEEE',
          marginTop: '4px',
        }}>
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(`/${tab.key === 'legal' ? 'legal' : tab.key === 'privacy' ? 'privacy-policy' : tab.key === 'cookies' ? 'cookies' : 'accessibility'}`)}
              style={{
                padding: '14px clamp(12px, 2vw, 24px)',
                fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase',
                color: type === tab.key ? '#000' : '#BDBDBD',
                fontWeight: type === tab.key ? '600' : '400',
                background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                borderBottom: type === tab.key ? '2px solid #000' : '2px solid transparent',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={e => { if (type !== tab.key) e.currentTarget.style.color = '#757575'; }}
              onMouseOut={e => { if (type !== tab.key) e.currentTarget.style.color = '#BDBDBD'; }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(20px, 5vw, 40px)' }}>

        {/* Meta */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #EEEEEE',
          flexWrap: 'wrap', gap: '8px',
        }}>
          <div style={{ fontSize: '12px', color: '#757575', letterSpacing: '0.3px' }}>
            {content.subtitle}
          </div>
          <div style={{ fontSize: '9px', letterSpacing: '1px', color: '#BDBDBD', textTransform: 'uppercase' }}>
            {content.updated}
          </div>
        </div>

        {/* Sections */}
        {content.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '13px', fontWeight: '600', letterSpacing: '1px',
              textTransform: 'uppercase', color: '#000', marginBottom: '12px',
              fontFamily: '"Lato", "Helvetica Neue", sans-serif',
            }}>
              {section.heading}
            </h2>
            <p style={{
              fontSize: '12px', color: '#757575', lineHeight: 1.9,
              letterSpacing: '0.2px',
            }}>
              {section.body}
            </p>
          </div>
        ))}

        {/* Contact */}
        <div style={{
          backgroundColor: '#F9F9F9', padding: '24px',
          borderLeft: '2px solid #000', marginTop: '48px',
        }}>
          <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#000', marginBottom: '8px' }}>
            Questions?
          </div>
          <p style={{ fontSize: '11px', color: '#757575', lineHeight: 1.7, marginBottom: '16px' }}>
            If you have any questions about our legal policies, please contact our Client Relations team.
          </p>
          <button
            onClick={() => setActiveTab('/contact')}
            style={{
              padding: '10px 24px', backgroundColor: '#000', color: '#fff',
              border: 'none', fontSize: '9px', letterSpacing: '2px',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Contact Us →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
