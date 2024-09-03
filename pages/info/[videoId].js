import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { saveOneProductdata } from "@/slices/dbSlice";
import { addToCart } from '@/slices/cartSlice';
import NameInputDialog from '@/components/Dialog_enter_color';
import Head from 'next/head';

const relatedProducts = [
  {
    product_id: 7,
    product_name: 'Sea bag ',
    product_price: 800.00,
    product_bio: ' bag details 🦋👜♡خيط كليم سوبر ♡مقاس صغير ومتاح تنفيذها باي مقاس ♡تنفع للبحر ♡وكمان خروج',
    imageurl: 'https://i.imgur.com/CSE96WK.jpeg',
    additional_images: [
      "https://i.imgur.com/fbpTJMz.jpeg",
      "https://i.imgur.com/nWUoKxC.jpeg",
      "https://i.imgur.com/GG9q9b7.jpeg",
      "https://i.imgur.com/GFSo2B8.jpeg",
      "https://i.imgur.com/BvJ2Eds.jpeg",
      "https://i.imgur.com/E9VxRjI.jpeg"
    ],
    release_time: "8/5/2024",
    product_colors:['When confirming the order, the colors will be chosen'],
    tag: ['bag']
  },
  {
    product_id: 9,
    product_name: 'seashell bag ',
    product_price: 800.00,
    product_bio: 'bag details  👜💚♡الديزاين من خيط الخيش عالي الجوده  👜♡ مدعمه من الداخل  و متبطنة وبسوسته من جوا  وعميقه جدا ونفس والوقت خفيفه♡ مقاس 35*30*5♡تحتوي على حزام جلد قابل للتعديل بحيث يمكن أن تكون الحقيبة إما حقيبة كتف أو حقيبة كروس أو محمولة باليد.',
    imageurl: 'https://i.imgur.com/gQV3ae0.jpeg',
    additional_images:[
      "https://i.imgur.com/ud65oVB.jpeg",
      "https://i.imgur.com/r4eavcW.jpeg",
      "https://i.imgur.com/ZWn88TM.jpeg",
      "https://i.imgur.com/3l3cFvj.jpeg",
      "https://i.imgur.com/koGViFC.jpeg"
    ],
    release_time: "8/5/2024",
    product_colors:['When confirming the order, the colors will be chosen'],
    tag: ['bag']
  },{
    product_id: 10,
    product_name: 'sunflower ',
    product_price: 800.00,
    product_bio: ' bag details  تصميم حصري ومميز ♡الديزاين من خيط السلسه عالي الجوده  👜♡ يد كروس من الخيط  😉😍♡ مدعمه من الداخل  و متبطنة وبسوسته من جوا  وعميقه جدا وطبعا خفيفه♡ مقاس 18*23*6',
    imageurl: 'https://i.imgur.com/l7b2wVU.jpeg',
    additional_images: [
      "https://i.imgur.com/9U33XYU.jpeg",
      "https://i.imgur.com/d7Jii33.jpeg",
      "https://i.imgur.com/SMHAlN9.jpeg",
      "https://i.imgur.com/cuyauln.jpeg",
      "https://i.imgur.com/sfE9uoJ.jpeg",
      "https://i.imgur.com/khpuKqH.jpeg",
      "https://i.imgur.com/6skWUI2.jpeg",
      "https://i.imgur.com/puW0rkG.jpeg"
    ],
    release_time: "8/5/2024",
    product_colors:['When confirming the order, the colors will be chosen'],
    tag: ['bag']
  }
];

const Watch = ({ videoId }) => {
  const dispatch = useDispatch();

  const saveSelectedvideo = (UserData) => {

    dispatch(saveOneProductdata(UserData));
  };
  const video = useSelector(state => state.db.selectedProduct);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('6 7/8');


  const images =video ? [video.imageurl, ...(video.additional_images || [])] : relatedProducts[0].additionalImages;// 
  //console.log(video)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [colorName, setColorName] = useState('');

  const handleDialogClose = (name) => {
    setIsDialogOpen(false);
    if (name) {
      setColorName(name);
      
      dispatch(addToCart({...video, color: name, size: selectedSize}));
    }
  };


  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-teal-600 dark:selection:text-white">
      <div className="mx-auto max-w-screen-2xl px-4">
        <Suspense fallback={<h2>Loading...</h2>}>
        <Head>
        <title>Product Info</title>
        <meta name="description" content=" our Product Info handmade crochet bags and macrame items." />
      </Head>
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
            <div className="flex-1 lg:w-1/2">
              <div className="h-full w-full basis-full lg:basis-4/6">
                <div className="relative aspect-square h-full max-h-[650px] w-full overflow-hidden">
                  <Image
                    alt={video?.product_name || "Product Image"}
                    src={images[currentImageIndex] || "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg"}
                    layout="fill"

                    priority
                    className="object-contain"
                  />
                  <div className="absolute bottom-[1%] flex w-full justify-center">
                    <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
                      <button onClick={handlePrevImage} aria-label="Previous product image" className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                        </svg>
                      </button>
                      <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                      <button onClick={handleNextImage} aria-label="Next product image" className="h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
                  {images.map((image, index) => (
                    <li key={index} className="h-20 w-20">
                      <button onClick={() => setCurrentImageIndex(index)} aria-label={`Select product image ${index + 1}`} className="h-full w-full">
                        <div className={`group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black ${index === currentImageIndex ? 'border-2 border-blue-600' : ''}`}>
                          
                          <Image
                            alt={`${video?.product_name || "Product"} - Image ${index + 1}`}
                            src={image}
                            width={80}
                            height={80}
                            objectFit="fill"
                            className="relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
                          />
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="basis-full lg:basis-2/6">
              <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
                <h1 className="mb-2 text-5xl font-medium">{video?.product_name}</h1>
                <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
                  <p>${video?.product_price}<span className="ml-1 inline">EGP</span></p>
                </div>
              </div>
                {/* <dl className="mb-8">
                  <dt className="mb-4 text-sm uppercase tracking-wide">Color</dt>
                  <dd className="flex flex-wrap gap-3">
                    {video?.product_colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900 ${
                          selectedColor === color
                            ? 'cursor-default ring-2 ring-blue-600'
                            : 'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </dd>
                </dl> */}
             
              <div className="prose mx-auto max-w-6xl  text-black prose-headings:mt-8 prose-headings:font-semibold prose-headings:tracking-wide prose-headings:text-black prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-black prose-a:underline hover:prose-a:text-neutral-300 prose-strong:text-black prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6 dark:text-white dark:prose-headings:text-white dark:prose-a:text-white dark:prose-strong:text-white mb-6 text-sm leading-tight dark:text-white/[60%]">
                {video?.product_bio}
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                setIsDialogOpen(true)
              }}>
                <button
                  type="submit"
                  aria-label="Add to cart"
                  className="relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
                >
                  <div className="absolute left-0 ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                    </svg>
                  </div>
                  Add To Cart
                </button>
              </form>
            </div>
          </div>
          <NameInputDialog isOpen={isDialogOpen} onClose={handleDialogClose} />
          <div className="py-8">
            <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
            <ul className="flex w-full gap-4 overflow-x-auto pt-1">
              {relatedProducts.map((product) => (
                <li key={product.product_id} className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
                  <Link   onClick={() => saveSelectedvideo(product)}
            href={`/info/${product.product_id}`}
key={product.id} className="relative h-full w-full">
                    <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                      <Image
                        alt={product.product_name}
                        src={product.imageurl}
                        layout="fill"
                        objectFit="cover"
                        className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                      />
                      <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
                        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                          <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{product.product_name}</h3>
                          <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                            {product.product_price.toFixed(2)} L.E
                            <span className="ml-1 inline">EGP</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Suspense>
      </div>      
    
    </div>
  );
};
export default Watch;

export async function getServerSideProps({ params }) {
  return {
    props: {
      videoId: params.videoId,
    },
  };
}