import { Suspense } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {  saveOneProductdata } from "@/slices/dbSlice";
import { addToCart } from '@/slices/cartSlice';
import CartSidebar from '@/components/CartSidebar';

var products = [
  {
    product_id:1,
    product_name:'BadRooBot',
    product_price:10.20,
    product_bio:'test bio',
    imageurl:'https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/451110840_3830816397151466_6680009169378606729_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Z8SAoA_MYygQ7kNvgFiURXx&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD1G3nkgGFi48a0TGCmtWMHzSHHWKiSr4PPn05Ky3beoQ&oe=66BEB05A',
    release_time:"8/5/2000",
    tag:['best']},{
    product_id:3,
    product_name:'black lotus',
    product_price:10.20,
    product_bio:'test bio',
    imageurl:'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    release_time:"8/5/2000",
    tag:['best'],}
    ,{
    product_id:2,
    product_name:'Earthen Bottle',
    product_price:500,
    product_bio:'test bio',
    imageurl:'https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/450562413_3824153297817776_8781446470164757575_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hxL2HoQBa3kQ7kNvgHKlXYP&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD7PblhxyrdGYQ0zHez8JOH3WDm4ki348YF1zDB4fo2qQ&oe=66BE8897',
    release_time:"8/5/2000",
    tag:['best']
  
  }
  ,{
    product_id:4,
    product_name:'KING',
    product_price:500,
    product_bio:'test bio',
    imageurl:'https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/450562413_3824153297817776_8781446470164757575_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=hxL2HoQBa3kQ7kNvgHKlXYP&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD7PblhxyrdGYQ0zHez8JOH3WDm4ki348YF1zDB4fo2qQ&oe=66BE8897',
    release_time:"8/5/2000",
    tag:['best']
  
  }

];

const Watch = ({videoId}) => {
  const dispatch = useDispatch();

  const saveSelectedvideo = (UserData) => {

    dispatch(saveOneProductdata(UserData));
  };
  const video = useSelector(state=>state.db);
  const imageurl = video.selectedProduct?.imageurl;
   const name = video.selectedProduct?.product_name;
  const price = video.selectedProduct?.product_price;
  const bio = video.selectedProduct?.product_bio;
  const release_time = video.selectedProduct?.release_time;
  
  return (
    <Suspense fallback={<h2>loading..</h2>}>
  <CartSidebar/>
      <div
  className="m-2 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-black md:max-w-[50%] md:flex-row">
  <Image
  width={1000}
  height={1000}
    className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-[350px] md:rounded-none md:rounded-l-lg"
    src={imageurl}
    alt="" />
  <div className="flex flex-col justify-start p-6">
    <h5
      className="mb-2 text-xl text-center font-medium text-neutral-800 dark:text-neutral-50 flex flex-row">
      {name}  <h4 className="ml-5 w-auto rounded-lg border p-1 bg-blue-600   border-blue-400 text-center font-mono text-white ">{price} EGP</h4>
    </h5>
    <p className="mb-4 text-base text-neutral-600 dark:text-white">
      {bio}
    </p>
  
  </div>
  

  <button                 className="inline-block self-end mr-4 mb-4 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
 onClick={() => dispatch(addToCart(video.selectedProduct))}>
      Add to Cart
    </button>
  
              </div>
             
<section className="w-full px-4 py-8 ">
        <h2 className="text-2xl font-bold mb-4 text-left">Related Products</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4 ">
          {products.map((product) => (
            <Link                onClick={() => saveSelectedvideo(product)}
            href={`/info/${product.product_id}`}
key={product.id}>
              <div className="flex-none w-64  rounded-lg p-4  hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative pt-[100%]">
                <span className={`
                      absolute top-4 right-4 z-10 px-2 py-1 text-xs font-bold uppercase rounded-full
                      ${"NEW" === 'Best' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}
                    `}
                  >
                    {product.product_price } EGP
                  </span>
                  <Image
                  
                    src={product.imageurl}
                    alt={product.product_name}
                    fill
                  style={{ objectFit: 'cover' }}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-white text-center text-lg font-medium mr-auto pb-6">
                  {product.product_name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Suspense>
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


// <div className="m-7">
// <div className="justify-center " style={{position:'relative' }}>
            
//   <Image src={url} className="table-cell h-96 w-64 rounded-md"style={{position:'absolute'}}/>

//   <div  style={{position:'absolute',marginLeft:'270px' ,float:'left' }}>
//   <h5 className="text-2xl font-bold pb-4 ">Name: </h5>

//   <h5 className="text-2xl font-bold pb-4">Rate: </h5>
//   <h5 className="text-2xl font-bold pb-4">Time: </h5>
//   <h5 className="text-2xl font-bold pb-4">Contre: </h5>

//   </div>
//   <div style={{position:'absolute',marginLeft:'360px' ,float:'left' }}>
//   <h5 className="mt-2  h-10 text-base">{name}</h5>
//   <h5 className="mt-2  h-10 text-base">{name}</h5>
//   <h5 className="mt-2  h-10 text-base">{name}</h5>
//   <h5 className="mt-2  h-10 text-base">{name}</h5>



//   </div>
  
  
//   </div>  

// </div> 