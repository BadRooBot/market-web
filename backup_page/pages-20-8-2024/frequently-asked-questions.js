import React, { useState } from 'react';
import Head from 'next/head';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{question}</span>
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <p className="mt-2 text-gray-600 dark:text-gray-400">{answer}</p>}
    </div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "Are your products handmade?",
      answer: "Yes, all of our crochet bags and macrame items are handmade with care by our skilled artisans."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location. Domestic orders typically arrive within 5-10 business days"
    },
    {
      question: "Do you offer custom orders?",
      answer: "Yes, we do offer custom orders for both our crochet bags and macrame items. Please contact us with your specific requirements for a quote."
    },
    {
      question: "What materials do you use?",
      answer: "We use high-quality, sustainable materials for our products. Our crochet bags are typically made with cotton or wool yarn"
    },
    {
      question: "How do I care for my crochet bag?",
      answer: "Most of our crochet bags can be gently hand washed in cold water and laid flat to dry. Always check the care instructions that come with your specific item."
    },
    {
      question: "Can I return or exchange an item?",
      answer: "We accept returns and exchanges within 14 days of receipt for unused items in their original condition. Please see our Returns Policy for more details."
    },
    // {
    //   question: "Do you ship internationally?",
    //   answer: "Yes, we ship to most countries worldwide. Shipping costs and times may vary depending on the destination."
    // },
    {
      question: "How can I track my order?",
      answer: "Once your order has been shipped, you will receive an email with tracking information. You can use this to track your package's progress."
    },
    {
      question: "Are your products eco-friendly?",
      answer: "We strive to be as eco-friendly as possible. We use sustainable materials and minimize packaging waste. Our commitment to handmade products also reduces our carbon footprint."
    },
    {
      question: "Do you offer gift wrapping?",
      answer: "Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout."
    }
  ];

  return (
    <div className='bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900  dark:selection:bg-teal-600 dark:selection:text-white dark:text-white'>

    <div className="container mx-auto px-4 py-8">
      {/* <Head>
        <title>FAQ - Crochet & Macrame Creations</title>
        <meta name="description" content="Frequently asked questions about our handmade crochet bags and macrame items." />
      </Head> */}

      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>

      <p className="mt-8 text-gray-400">
        Can't find the answer you're looking for? Feel free to <a href="/contact" className="text-blue-600 hover:underline">contact us</a> for more information.
      </p>
    </div>
    </div>

  );
};

export default FAQPage;