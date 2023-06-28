'use client';

import {  loadVideoSuccess, moviesCount, saveSelectedUaserData } from "@/slices/dbSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


var products = [
  {
    moves_id:22,
    name:'BadRooBot',
    videourl:"https://anakilla015.wistia.com/medias/2y4dfwj5qu",
    bio:'https://th.bing.com/th/id/OIG.O4ssHYW3anBQBlxYH.R5?pid=ImgGnhttps://th.bing.com/th/id/OIG.O4ssHYW3anBQBlxYH.R5?pid=ImgGn',
    imageurl:'https://th.bing.com/th/id/OIG.O4ssHYW3anBQBlxYH.R5?pid=ImgGn',
    release_time:"8/5/2000",
    tag:['best']

  },
  {
    moves_id: 1,
    name: 'John Wick: Chapter 4',
    videourl: '#',
    bio: '$48',
    imageurl: 'https://img.sflix.to/xxrz/250x400/224/1e/9e/1e9efbf118acd1e7661d144868dc5ef5/1e9efbf118acd1e7661d144868dc5ef5.jpg',
    release_time: '25/11/2023',
    tag:['best']

  },
  {
    moves_id: 2,
    name: 'The Little Mermaid',
    videourl: '#',
    bio: '$35',
    imageurl: 'https://img.sflix.to/xxrz/250x400/224/fc/7d/fc7de6b957d0dfb5f3b719c812093766/fc7de6b957d0dfb5f3b719c812093766.jpg',
    release_time: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    tag:['best']

  },
  {
    moves_id: 3,
    name: 'Focus Paper Refill',
    videourl: '#',
    bio: '$89',
    imageurl: 'https://images.thedirect.com/media/article_full/the-little-mermaid-every-song-in-live-action-remake-ranked-worst-to-best.jpg',
    release_time: 'Person using a pen to cross a task off a productivity paper card.',
    tag:['best']

  },
  {
    moves_id: 4,
    name: 'Machined Mechanical Pencil',
    videourl: '#',
    bio: '$35',
    imageurl: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    release_time: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    tag:['best']

  },
  {
    moves_id: 5,
    name: 'Earthen Bottle',
    videourl: '#',
    bio: '$48',
    imageurl: 'https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg',
    release_time: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    tag:['best']

  },
  {
    moves_id: 6,
    name: 'Nomad Tumbler',
    videourl: '#',
    bio: '$35',
    imageurl: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    release_time: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    tag:['best']

  },
  {
    moves_id: 7,
    name: 'Focus Paper Refill',
    videourl: '#',
    bio: '$89',
    imageurl: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    release_time: 'Person using a pen to cross a task off a productivity paper card.',
    tag:['best']

  },
  {
    moves_id: 8,
    name: 'Machined Mechanical Pencil',
    videourl: '#',
    bio: '$35',
    imageurl: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    release_time: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    tag:['best']

  },
  // More products...
]
let AllMoviesList=[{}];
let videosCount=0;
let oldCount;



export default  function AllMovies() {

  const dispatch = useDispatch();
  const db = useSelector(state=>state.db);
  
  const saveData=(dbDatatosave)=>{///////////////////////////save data in db
    dispatch(loadVideoSuccess({dbDatatosave}))
  }

  const AllMoviesData=async()=>{///////////////////////// get All movies form datavase pg
    console.log('moves',videosCount)
    AllMoviesList.clear;
    const getMoves = await fetch(
      'http://localhost:5000/Moves_posts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    AllMoviesList=await getMoves.json();
    AllMoviesList.map((x)=>{
      if(!products.includes(x)){
        products = [...products, x]; // Spread the existing array and add the new movie
      }
    })
    saveData(products)
    dispatch(moviesCount(videosCount))
        
  };


  const getCount=async()=>{/////////////////////////////  get count from database pg
    const countOfAllMoves = await fetch(
      'http://localhost:5000/get-count',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'tableName':'Moves'
        }),
      }
    );
  
    console.log('status',countOfAllMoves.status)
    const count=await countOfAllMoves.json()
    console.log('body',count)
    videosCount=count;
    
    if(count==oldCount){
      AllMoviesList=[{}]
      AllMoviesList.clear
     await AllMoviesData()
    }
  }
  
  const saveSelectedvideo=(UserData)=>{
    dispatch(saveSelectedUaserData(UserData))
  }

  useEffect(() => {
    oldCount=db.countOfMovies
        console.log('onload',oldCount)
        
        getCount() 
  },[false] );

  return (
    <>
    <div  style={{backgroundColor:'#1e2129'}}>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-9 rounded-lg">
          {products.map((product) => (
            <a key={product.id} onClick={function fOnClick(){
              saveSelectedvideo(product)
            }} href={`/watch/${product.moves_id}`} className="group rounded-lg"  style={{backgroundColor:'#343a40'}} >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageurl}
                  alt={product.name}
                  className="h-72  w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4  text-white text-center text-lg  font-medium mr-auto pb-6" >{product.name}</h3>
             
            </a>
          ))}
        </div>
      </div>
    </div>
     </>
  )
}
