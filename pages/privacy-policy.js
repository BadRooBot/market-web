import React from 'react';
import Head from 'next/head';

const PrivacyPolicyPage = () => {
  return (
    <div className='bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900  dark:selection:bg-teal-600 dark:selection:text-white dark:text-white'>

    <div className="container mx-auto px-4 py-8">
      {/* <Head>
        <title>Privacy Policy - Crochet & Macrame Creations</title>
        <meta name="description" content="Our privacy policy explaining how we collect, use, and protect your personal information." />
      </Head> */}

      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <p className="mb-4">
        At Crochet & Macrame Creations, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or make a purchase.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect the following types of personal information:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Name</li>
        <li>Email address</li>
        <li>Shipping and billing address</li>
        <li>Phone number</li>
        <li>Payment information (we do not store full credit card numbers)</li>
        <li>Order history</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your personal information to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Process and fulfill your orders</li>
        <li>Communicate with you about your order or account</li>
        <li>Send you marketing communications (if you&apos;ve opted in)</li>
        <li>Improve our website and customer service</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">3. Data Protection</h2>
      <p className="mb-4">
        We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">4. Cookies</h2>
      <p className="mb-4">
        We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and site interaction.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">5. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party service providers to help us operate our business and the website or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
      <p className="mb-4">
        You have the right to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Access the personal information we hold about you</li>
        <li>Request correction of any inaccurate information</li>
        <li>Request deletion of your personal information</li>
        <li>Object to processing of your personal information</li>
        <li>Request restriction of processing your personal information</li>
        <li>Request transfer of your personal information</li>
        <li>Withdraw consent at any time, where we rely on consent to process your personal data</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">7. Changes to This Policy</h2>
      <p className="mb-4">
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &#34;Last updated&#34; date.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">8. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us at:
      </p>
      <p>
        El Sherif Group<br />
        [Email]<br />
      </p>

      <p className="mt-8 text-sm italic">
        Last updated: 19/8/2024
      </p>
    </div>
    </div>



  );
};

export default PrivacyPolicyPage;