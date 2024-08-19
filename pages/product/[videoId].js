import { saveOneProductdata } from "@/slices/dbSlice";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from '@/myenv'
import Link from "next/link";
import Image from "next/image";

export default function SearchVideo({ videoId }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getSearchResult(videoId);
  }, [videoId]);

  const getSearchResult = async (id) => {
    try {
      console.log('id', id);

      const response = await fetch(`${API_URL}/user/handle/get-products-from-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_name: id }),
      });

      const result = await response.json();
      setProducts(result);
      console.log('result', result);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const saveSelectedvideo = (UserData) => {
    dispatch(saveOneProductdata(UserData));
  };

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
      <div className="order-last min-h-screen w-full md:order-none">
      {products.length>0?
        <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {products.map((product) => (
           
            <li key={product.product_id} className="aspect-square transition-opacity animate-fadeIn">
              <Link
                onClick={() => saveSelectedvideo(product)}
                href={`/info/${product.product_id}`}
                className="relative inline-block h-full w-full"
              >
                <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                  <Image
                    alt={product.product_name}
                    src={product.imageurl}
                    layout="fill"
                    objectFit="fill"
                    className="transition duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
                    <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                      <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{product.product_name}</h3>
                      <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                        {product.product_price}
                        <span className="ml-1 inline hidden @[275px]/label:inline">EGP</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        : <h1 className="text-3xl text-center  text-neutral-900 dark:text-white animate-bounce">🏐</h1>}
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      videoId: params.videoId,
    },
  };
}