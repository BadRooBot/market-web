import React, { useState } from 'react';
import Head from 'next/head';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    // For this example, we'll just simulate a successful submission
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <div className='dark:bg-neutral-900 text-black dark:text-white'>
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Contact Us - Crochet & Macrame Creations</title>
        <meta name="description" content="Get in touch with us about our handmade crochet bags and macrame items." />
      </Head>

      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border dark:bg-black border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border dark:bg-black border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-black"
              />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 dark:bg-black border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Send Message
            </button>
          </form>
          {submitStatus === 'success' && (
            <p className="mt-4 text-green-600">Thank you for your message. We&apos;ll get back to you soon!</p>
          )}
          {submitStatus === 'error' && (
            <p className="mt-4 text-red-600">There was an error sending your message. Please try again later.</p>
          )}
        </div>
        <div>
          {/* <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-2"><strong>Address:</strong> 123 Craft Street, Artisan City, AC 12345</p>
          <p className="mb-2"><strong>Email:</strong> info@crochetandmacrame.com</p>
          <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
          <p className="mb-4"><strong>Hours:</strong> Monday-Friday, 9am-5pm</p>
           */}
          <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/7anddesigner" className="text-blue-500 hover:text-blue-600">Facebook</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactPage;