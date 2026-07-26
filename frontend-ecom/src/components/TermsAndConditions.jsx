import { useEffect } from "react";
import { FaShieldAlt, FaBolt } from "react-icons/fa";

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

const TermsAndConditions = () => {
    useEffect(() => {
        document.title = "Terms & Conditions — Zappit / Om Steel";
    }, []);

    const lastUpdated = "25 July 2025";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a1a]">

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 py-14 px-6 text-center">
                <div className="flex justify-center mb-3">
                    <FaShieldAlt size={34} className="text-white/80" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Terms & Conditions</h1>
                <p className="text-indigo-200 text-sm">Last Updated: {lastUpdated}</p>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-14">

                <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/40 rounded-xl p-5 mb-10 text-sm text-indigo-800 dark:text-indigo-300">
                    <strong>Please read these Terms & Conditions carefully</strong> before using our website or placing an order. By accessing or purchasing from <strong>zappit.india@gmail.com</strong>, you agree to be bound by these terms.
                </div>

                <Section id="business" title="1. Business Information">
                    <p>This website is operated by <strong>Om Steel</strong> (marketed under the brand name <strong>Zappit</strong>), a retail business selling stainless steel household products.</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li><strong>Business Name:</strong> Om Steel</li>
                        <li><strong>Brand Name:</strong> Zappit</li>
                        <li><strong>Address:</strong> Chikhali Akurdi Rd, Sambhajinagar, Chinchwad, Pimpri-Chinchwad, Maharashtra 411019, India</li>
                        <li><strong>Email:</strong> zappit.india@gmail.com</li>
                        <li><strong>Country of Operation:</strong> India</li>
                        <li><strong>Currency:</strong> Indian Rupee (INR ₹)</li>
                    </ul>
                </Section>

                <Section id="products" title="2. Products & Services">
                    <p>We sell stainless steel and household items including but not limited to cookware, tiffin boxes, water bottles, steel glasses, storage containers, pressure cookers, and related household products.</p>
                    <p>All product descriptions, images, and prices are subject to change without prior notice. We make every effort to display product details accurately, but minor variations may exist.</p>
                    <p>Products are sold subject to availability. In case of stock unavailability after an order is placed, we will notify you and process a full refund.</p>
                </Section>

                <Section id="ordering" title="3. Order Placement & Acceptance">
                    <p>By placing an order on our platform, you confirm that:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>You are at least 18 years of age or are placing the order under parental supervision.</li>
                        <li>The information provided (name, address, contact details) is accurate and complete.</li>
                        <li>You authorize us to charge the stated amount to your chosen payment method.</li>
                    </ul>
                    <p>An order confirmation email will be sent to your registered email address after successful payment. This email constitutes our acceptance of your order.</p>
                </Section>

                <Section id="pricing" title="4. Pricing & Taxes">
                    <p>All prices displayed on this website are in <strong>Indian Rupees (INR)</strong> and are inclusive of applicable GST unless stated otherwise.</p>
                    <p>We reserve the right to modify prices at any time. However, orders that have already been confirmed and paid for will not be affected by price changes.</p>
                </Section>

                <Section id="payment" title="5. Payment Terms">
                    <p>We accept payments through <strong>Razorpay</strong>, which supports the following methods:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>UPI (GPay, PhonePe, Paytm, etc.)</li>
                        <li>Credit Cards (Visa, Mastercard, RuPay)</li>
                        <li>Debit Cards</li>
                        <li>Net Banking</li>
                        <li>EMI (on eligible cards)</li>
                        <li>Wallets</li>
                    </ul>
                    <p>Payments are processed securely via Razorpay. We do not store or access your card or UPI credentials at any point. All transactions are encrypted and PCI-DSS compliant.</p>
                    <p>In case of a failed transaction, the amount will be refunded to your original payment method within <strong>5–7 business days</strong>.</p>
                </Section>

                <Section id="shipping" title="6. Shipping Policy">
                    <p>We currently deliver across <strong>India</strong>. Delivery timelines are estimated as follows:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li><strong>Standard Delivery:</strong> 5–8 business days</li>
                        <li><strong>Express Delivery:</strong> 2–3 business days (where available)</li>
                    </ul>
                    <p>Shipping charges, if applicable, will be displayed at checkout before payment. Orders above a threshold amount may qualify for free delivery as indicated on the website.</p>
                    <p>We are not responsible for delays caused by courier partners, natural disasters, or circumstances beyond our control. We will make reasonable efforts to inform you of any significant delays.</p>
                    <p>A tracking number will be shared via email once your order is dispatched.</p>
                </Section>

                <Section id="refund" title="7. Refund & Cancellation Policy">
                    <p><strong>Cancellations:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>Orders can be cancelled within <strong>24 hours</strong> of placement by contacting us at zappit.india@gmail.com.</li>
                        <li>Orders that have already been dispatched cannot be cancelled.</li>
                    </ul>

                    <p className="mt-3"><strong>Returns & Replacements:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>We accept return or replacement requests within <strong>7 days</strong> of delivery, only for:</li>
                        <ul className="list-circle pl-5 mt-1 space-y-1">
                            <li>Defective or damaged products</li>
                            <li>Wrong item delivered</li>
                        </ul>
                        <li>Items must be unused, in original packaging, with all accessories included.</li>
                        <li>Cosmetic damage caused by the customer is not eligible for return.</li>
                    </ul>

                    <p className="mt-3"><strong>Refunds:</strong></p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li>Refunds are processed within <strong>5–7 business days</strong> of receiving and verifying the returned item.</li>
                        <li>Refunds are credited back to the original payment method used during the purchase.</li>
                        <li>For UPI/wallet payments, refunds are typically credited within 2–3 business days.</li>
                        <li>For card payments, it may take up to 7 business days depending on your bank.</li>
                    </ul>

                    <p className="mt-3">To initiate a return or refund, email us at <strong>zappit.india@gmail.com</strong> with your order ID, photos of the product, and a description of the issue.</p>
                </Section>

                <Section id="liability" title="8. Limitation of Liability">
                    <p>Om Steel / Zappit shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website, including but not limited to loss of revenue, data, or business opportunities.</p>
                    <p>Our total liability for any claim shall not exceed the amount paid by the customer for the specific product in question.</p>
                </Section>

                <Section id="ip" title="9. Intellectual Property">
                    <p>All content on this website including text, images, logos, and product descriptions is the property of Om Steel / Zappit. Unauthorized reproduction or use of any content is strictly prohibited.</p>
                </Section>

                <Section id="governing" title="10. Governing Law & Jurisdiction">
                    <p>These Terms & Conditions are governed by the laws of <strong>India</strong>. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in <strong>Pune, Maharashtra, India</strong>.</p>
                </Section>

                <Section id="changes" title="11. Changes to These Terms">
                    <p>We reserve the right to modify these Terms & Conditions at any time. Changes will be effective immediately upon posting to this page. Continued use of our website after changes constitutes acceptance of the revised terms.</p>
                </Section>

                <Section id="contact-legal" title="12. Contact for Legal Queries">
                    <p>For any questions regarding these terms, please contact us:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                        <li><strong>Email:</strong> zappit.india@gmail.com</li>
                        <li><strong>Address:</strong> Om Steel, Chikhali Akurdi Rd, Pimpri-Chinchwad, Maharashtra 411019</li>
                    </ul>
                </Section>

                {/* Bottom Razorpay note */}
                <div className="mt-8 p-5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40 rounded-xl text-sm text-emerald-800 dark:text-emerald-300">
                    <div className="flex items-center gap-2 font-semibold mb-1">
                        <FaBolt size={14} />
                        Payment Security
                    </div>
                    All payments are processed by <strong>Razorpay</strong> — India's leading secure payment gateway. We never store your payment credentials. Transactions are protected by 256-bit SSL encryption.
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
