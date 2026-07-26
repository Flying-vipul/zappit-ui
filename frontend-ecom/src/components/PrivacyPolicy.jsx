import { useEffect } from "react";
import { FaLock } from "react-icons/fa";

const Section = ({ id, title, children }) => (
    <section id={id} className="mb-10 scroll-mt-24">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
            {title}
        </h2>
        <div className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed space-y-3">
            {children}
        </div>
    </section>
);

const PrivacyPolicy = () => {
    useEffect(() => {
        document.title = "Privacy Policy — Zappit / Om Steel";
    }, []);

    const lastUpdated = "25 July 2025";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a1a]">

            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-14 px-6 text-center">
                <div className="flex justify-center mb-3">
                    <FaLock size={34} className="text-white/80" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Privacy Policy</h1>
                <p className="text-emerald-200 text-sm">Last Updated: {lastUpdated}</p>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-14">

                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40 rounded-xl p-5 mb-10 text-sm text-emerald-800 dark:text-emerald-300">
                    At <strong>Om Steel / Zappit</strong>, we are committed to protecting your personal data and respecting your privacy.
                    This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data.
                </div>

                <Section id="who-we-are" title="1. Who We Are">
                    <p>This Privacy Policy applies to the website and e-commerce platform operated by:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li><strong>Business Name:</strong> Om Steel</li>
                        <li><strong>Brand:</strong> Zappit</li>
                        <li><strong>Address:</strong> Chikhali Akurdi Rd, Pimpri-Chinchwad, Maharashtra 411019, India</li>
                        <li><strong>Email:</strong> zappit.india@gmail.com</li>
                    </ul>
                </Section>

                <Section id="data-collected" title="2. Information We Collect">
                    <p>We collect the following categories of personal information:</p>

                    <p className="font-semibold mt-3">A. Information You Provide Directly:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                        <li>Full name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Delivery address (street, city, state, PIN code)</li>
                        <li>Order history and preferences</li>
                        <li>Messages sent through the Contact form</li>
                    </ul>

                    <p className="font-semibold mt-3">B. Information Collected Automatically:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-1">
                        <li>IP address and browser type</li>
                        <li>Pages visited and time spent on site</li>
                        <li>Device type (mobile/desktop)</li>
                        <li>Referring website or source</li>
                    </ul>

                    <p className="font-semibold mt-3">C. Payment Information:</p>
                    <p>We do <strong>not</strong> store payment card numbers, UPI IDs, or any sensitive financial credentials. All payment data is handled exclusively by <strong>Razorpay</strong>, our payment gateway partner, which is PCI-DSS Level 1 certified.</p>
                </Section>

                <Section id="how-used" title="3. How We Use Your Information">
                    <p>We use your data for the following purposes:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li><strong>Order Fulfillment:</strong> Process, confirm, package, and deliver your orders.</li>
                        <li><strong>Communication:</strong> Send order confirmations, shipping updates, and support responses via email.</li>
                        <li><strong>Account Management:</strong> Maintain your account, address book, and order history.</li>
                        <li><strong>Customer Support:</strong> Respond to your queries, complaints, or return/refund requests.</li>
                        <li><strong>Legal Compliance:</strong> Maintain records as required under Indian law (GST, Consumer Protection Act).</li>
                        <li><strong>Fraud Prevention:</strong> Detect and prevent unauthorized transactions or account misuse.</li>
                        <li><strong>Service Improvement:</strong> Analyze usage patterns to improve our website and product offerings.</li>
                    </ul>
                    <p>We do <strong>not</strong> sell, rent, or share your personal data with third parties for marketing purposes.</p>
                </Section>

                <Section id="sharing" title="4. Information Sharing & Third Parties">
                    <p>We share your data only with trusted partners who help us operate our business:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li><strong>Razorpay:</strong> For secure payment processing. <a href="https://razorpay.com/privacy/" className="text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">Razorpay Privacy Policy →</a></li>
                        <li><strong>Courier / Delivery Partners:</strong> Your name and delivery address are shared with our logistics partners solely to fulfill your order.</li>
                        <li><strong>Email Service:</strong> To send transactional emails such as order confirmations and password resets.</li>
                        <li><strong>Legal Authorities:</strong> We may disclose your data if required by law, court order, or government regulation.</li>
                    </ul>
                </Section>

                <Section id="cookies" title="5. Cookies & Tracking">
                    <p>We use essential cookies to:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>Maintain your login session</li>
                        <li>Remember items in your cart</li>
                        <li>Improve website performance</li>
                    </ul>
                    <p>We do not use advertising or tracking cookies. You may disable cookies through your browser settings, though some website features may not function correctly without them.</p>
                </Section>

                <Section id="data-retention" title="6. Data Retention">
                    <p>We retain your personal data for as long as necessary to:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>Fulfill your orders and provide customer service</li>
                        <li>Comply with legal and regulatory obligations (typically 7 years for financial records under Indian law)</li>
                        <li>Resolve disputes and enforce agreements</li>
                    </ul>
                    <p>You may request deletion of your account and personal data by emailing us at zappit.india@gmail.com. We will process your request within 30 days, subject to legal retention requirements.</p>
                </Section>

                <Section id="security" title="7. Data Security">
                    <p>We implement appropriate technical and organizational measures to protect your data, including:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>SSL/TLS encryption for all data transmitted between your browser and our servers</li>
                        <li>Hashed and salted passwords — we never store passwords in plain text</li>
                        <li>JWT-based secure authentication tokens</li>
                        <li>Access controls — only authorized personnel can access customer data</li>
                        <li>Razorpay's PCI-DSS Level 1 compliance for payment data</li>
                    </ul>
                    <p>Despite our efforts, no internet transmission is 100% secure. We encourage you to use strong passwords and not share your account credentials.</p>
                </Section>

                <Section id="rights" title="8. Your Rights">
                    <p>Under applicable Indian law (IT Act 2000, DPDP Act 2023), you have the following rights:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li><strong>Access:</strong> Request a copy of your personal data we hold.</li>
                        <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations).</li>
                        <li><strong>Withdraw Consent:</strong> Opt out of non-essential communications at any time.</li>
                        <li><strong>Grievance Redressal:</strong> Lodge a complaint with our Grievance Officer.</li>
                    </ul>
                    <p>To exercise any of these rights, contact us at: <strong>zappit.india@gmail.com</strong></p>
                </Section>

                <Section id="children" title="9. Children's Privacy">
                    <p>Our website and services are not directed at children under the age of 18. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected data from a minor, please contact us immediately.</p>
                </Section>

                <Section id="links" title="10. Third-Party Links">
                    <p>Our website may contain links to third-party websites (e.g., Razorpay, courier tracking). We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
                </Section>

                <Section id="changes-policy" title="11. Changes to This Policy">
                    <p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify users of significant changes by updating the "Last Updated" date at the top of this page.</p>
                    <p>Continued use of our website after changes constitutes your acceptance of the revised policy.</p>
                </Section>

                <Section id="grievance" title="12. Grievance Officer">
                    <p>In accordance with the Information Technology Act, 2000 and applicable rules, our Grievance Officer can be contacted at:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li><strong>Name:</strong> Om Steel Management</li>
                        <li><strong>Email:</strong> zappit.india@gmail.com</li>
                        <li><strong>Address:</strong> Chikhali Akurdi Rd, Pimpri-Chinchwad, Maharashtra 411019</li>
                        <li><strong>Response Time:</strong> Within 30 days of receiving your complaint</li>
                    </ul>
                </Section>

                {/* Bottom note */}
                <div className="mt-8 p-5 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40 rounded-xl text-sm text-indigo-800 dark:text-indigo-300">
                    <strong>Questions about your privacy?</strong><br />
                    Write to us anytime at <a href="mailto:zappit.india@gmail.com" className="underline font-semibold">zappit.india@gmail.com</a> — we will respond within 2 business days.
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
