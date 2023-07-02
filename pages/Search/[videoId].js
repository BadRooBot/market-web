import { saveOneVideodata } from "@/slices/dbSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {API_URL} from'@/myenv'
import Link from "next/link";
import Image from "next/image";

var products = [
    {
      moves_id:5,
      name:'BadRooBot',
      videourl:"https://anakilla015.wistia.com/medias/2y4dfwj5qu",
      bio:'https://th.bing.com/th/id/OIG.O4ssHYW3anBQBlxYH.R5?pid=ImgGnhttps://th.bing.com/th/id/OIG.O4ssHYW3anBQBlxYH.R5?pid=ImgGn',
      imageurl:'https://th.bing.com/th/id/OIG.O4ssHYW3anBQBlxYH.R5?pid=ImgGn',
      release_time:"8/5/2000",
      tag:['best']
  
    }
  ]


  

  const getSearchResult = async (id) => {
    try {
      console.log(id);
      const response = await fetch(API_URL+'/getOneMoves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: id }),
      });
      const result = await response.json();
      products=[]
      result.map((x)=>{
        if(!products.includes(x)){
          products = [...products, x]; // Spread the existing array and add the new movie
        }
      })
      console.log('result: ', result);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  

export default function SearchVideo({videoId}){
    const dispatch = useDispatch();

    getSearchResult(videoId);
    const saveSelectedvideo = (UserData) => {
        dispatch(saveOneVideodata(UserData));
      };


    return (
        <>
      <div style={{ backgroundColor: '#1e2129' }}>
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-14 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-9 rounded-lg">
            {products.map((product) => (
              <Link
                key={product.moves_id}
                onClick={() => saveSelectedvideo(product)}
                href={`/watch/${product.moves_id}`}
                className="group rounded-lg"
                style={{ backgroundColor: '#343a40' }}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <Image
                  width={400}
                  height={400}
                    src={product.imageurl}
                    alt={product.name}
                    className="h-72 w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-white text-center text-lg font-medium mr-auto pb-6">
                  {product.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>

    )
    
}



export async function getServerSideProps({ params }) {
  
    return {
      props: {
        videoId:params.videoId,
      },
    };
  }
  