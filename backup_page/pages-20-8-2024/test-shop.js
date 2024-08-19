'use client';
import Image from 'next/image';
import NextLink from 'next/link';

// AppBar import is commented out as it's not used in this component
// import AppBar from '../components/app-bar';
var products = [
  {
    product_id: 1,
    product_name: 'BadRooBot',
    product_price: 10.20,
    product_bio: 'test bio',
    imageurl: 'https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/451110840_3830816397151466_6680009169378606729_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Z8SAoA_MYygQ7kNvgFiURXx&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD1G3nkgGFi48a0TGCmtWMHzSHHWKiSr4PPn05Ky3beoQ&oe=66BEB05A',
    additionalImages: [
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    ],
    release_time: "8/5/2000",
    product_colors:['Black', 'Tan'],
    tag: ['best']
  },
  {
    product_id:2,
    product_name:'Earthen Bottle',
    product_price:500,
    product_bio:'test bio',
    imageurl:'https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/450562413_3824153297817776_8781446470164757575_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hxL2HoQBa3kQ7kNvgHKlXYP&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD7PblhxyrdGYQ0zHez8JOH3WDm4ki348YF1zDB4fo2qQ&oe=66BE8897',
    release_time:"8/5/2000",
    additionalImages: [
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    ],
    product_colors:['Black', 'Tan'],

    tag: ['best']
  
  }
  ,{
    product_id:4,
    product_name:'KING',
    product_price:500,
    product_bio:'test bio',
    imageurl:'https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/450562413_3824153297817776_8781446470164757575_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hxL2HoQBa3kQ7kNvgHKlXYP&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD7PblhxyrdGYQ0zHez8JOH3WDm4ki348YF1zDB4fo2qQ&oe=66BE8897',
    release_time:"8/5/2000",
    additionalImages: [
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    ],
    product_colors:['Black', 'Tan'],

    tag:['best']
  
  }

];
export default function Example() {
  
  return (
<div className='mx-auto max-w-7xl py-6 px-4'>
<div className='grid grid-cols-1 gap-x-2 gap-y-10 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8'>
                  {products.map((book) => (
              <div className='card card-compact w-96 bg-base-100 shadow-xl' >
              <figure>
                <Image
                  src={book.imageSrc}
                  alt={book.name}
                  width={384}
                  height={140}
                />
              </figure>
              <div className='card-body'>
                <div className='text-sm text-slate-500'>
                  {' '}
                </div>
                <h2 className='card-title'>{book.name}</h2>
                <p className='font-medium text-slate-500'>
                  {book.name}
                </p>
                <div className=' justify-end'>
                  <button className='btn' >
                    ${100}
                  </button>
                  <NextLink href={`/book/${book.id}`} className='btn btn-info'>
                    View Details
                  </NextLink>
                </div>
              </div>
            </div>
            ))}
          </div>
          </div>


  );
}