'use client';
import { Suspense } from "react";
import {  useSelector } from "react-redux";



const products = [
  {
    id: 1,
    name: 'John Wick: Chapter 4',
    href: '#',
    price: '$48',
    imageSrc: 'https://img.sflix.to/xxrz/250x400/224/1e/9e/1e9efbf118acd1e7661d144868dc5ef5/1e9efbf118acd1e7661d144868dc5ef5.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'The Little Mermaid',
    href: '#',
    price: '$35',
    imageSrc: 'https://img.sflix.to/xxrz/250x400/224/fc/7d/fc7de6b957d0dfb5f3b719c812093766/fc7de6b957d0dfb5f3b719c812093766.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://images.thedirect.com/media/article_full/the-little-mermaid-every-song-in-live-action-remake-ranked-worst-to-best.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 6,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 7,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 8,
    name: 'Machined Mechanical Pencil',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]

 const UserProfile = ({userId}) => {
  const myData = useSelector(state=>state.db);

  const url = myData.currentUser?.image_url;
  const name= myData.currentUser?.username;
  console.log(url)
  console.log(name)
  return  <Suspense fallback={<h2>loading..</h2>}>
  
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  sm:mx-auto sm:w-full sm:max-w-sm">
    <img className=" rounded-full  w-60" src={url}/>
    <h4 className=" font-bold text-3xl  mt-6  text-center" >{name}</h4>
    <h4 className=" text-xl  mt-2 text-center" >{'Enjoy life is short'}</h4>

    <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  
                  mt-4  "  
                >
                  Follow {name}
                </button>

    </div>
    <div  style={{backgroundColor:'#1e2129'}}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-9 rounded-lg">
          {products.map((product) => (
            <a key={product.id} href={`/watch/${product.id}`} className="group rounded-lg"  style={{backgroundColor:'#343a40'}} >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-72  w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4  text-white text-center text-lg  font-medium mr-auto pb-6" >{product.name}</h3>
             
            </a>
          ))}
        </div>
      </div>
    </div>

  
  </Suspense>

}

export  default UserProfile


export async function getServerSideProps({ params }) {


  return {
    props: {
      userId:params?.userId.replace('user=', '') || null,
    },
  };
}

