import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className='bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900  dark:selection:bg-teal-600 dark:selection:text-white dark:text-white'>

    <div className="container mx-auto px-4 py-8">
     

      <h1 className="text-3xl font-bold mb-6">About Our Craft</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Welcome to our world of handcrafted beauty! We are passionate artisans dedicated to creating unique crochet bags and stunning macrame pieces. Our journey began in 2018 when we discovered the joy of transforming simple threads into works of art.
          </p>
          <p>
            Each item in our collection is lovingly made by hand, ensuring quality, uniqueness, and attention to detail that machine-made products simply can&apos;t match.
          </p>
        </div>
        <div>
        <Image 
            src="https://i.imgur.com/COuJjHa.jpeg" 
            alt="Our workshop" 
            width={300} 
            height={100} 
            layout="responsive"
            className="rounded-lg"
          />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Our Craft</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-2">Crochet Bags</h3>
            <p>
              Our crochet bags blend traditional techniques with modern design. We use high-quality, sustainable materials to create durable and stylish accessories that stand the test of time.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">Macrame Art</h3>
            <p>
              Our macrame pieces are inspired by nature and geometric patterns. From wall hangings to plant holders, each piece adds a touch of bohemian elegance to any space.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Meet the Artisans</h2>
        <p>
          Our team consists of skilled artisans who are passionate about their craft. Each member brings unique skills and creativity to our collection, ensuring a diverse range of styles and techniques.
        </p>
        {/* Add team member profiles here if desired */}
      </div>
    </div>


</div>

  );
};

export default AboutPage;