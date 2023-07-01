import { loadVideoSuccess, moviesCount, saveOneVideodata, saveSelectedUaserData } from "@/slices/dbSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {API_URL} from'@/myenv'
import Image from "next/image";
import Link from "next/link";


var products = [
  {
    moves_id:5,
    name:'BadRooBot',
    videourl:"https://anakilla015.wistia.com/medias/2y4dfwj5qu",
    bio:'https://th.bing.com/th/id/OIG.O4ssHYW3anBQBlxYH.R5?pid=ImgGnhttps://th.bing.com/th/id/OIG.O4ssHYW3anBQBlxYH.R5?pid=ImgGn',
    imageurl:'https://th.bing.com/th/id/OIG.O4ssHYW3anBQBlxYH.R5?pid=ImgGn',
    release_time:"8/5/2000",
    tag:['best']

  },
  {
    moves_id: 6,
    name: 'John Wick: Chapter 4',
    videourl: '#',
    bio: '$48',
    imageurl: 'https://img.sflix.to/xxrz/250x400/224/1e/9e/1e9efbf118acd1e7661d144868dc5ef5/1e9efbf118acd1e7661d144868dc5ef5.jpg',
    release_time: '25/11/2023',
    tag:['best']

  },
  {
    moves_id: 7,
    name: 'The Little Mermaid',
    videourl: '#',
    bio: '$35',
    imageurl: 'https://img.sflix.to/xxrz/250x400/224/fc/7d/fc7de6b957d0dfb5f3b719c812093766/fc7de6b957d0dfb5f3b719c812093766.jpg',
    release_time: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    tag:['best']

  },
  {
    moves_id: 8,
    name: 'Focus Paper Refill',
    videourl: '#',
    bio: '$89',
    imageurl: 'https://images.thedirect.com/media/article_full/the-little-mermaid-every-song-in-live-action-remake-ranked-worst-to-best.jpg',
    release_time: 'Person using a pen to cross a task off a productivity paper card.',
    tag:['best']

  },
  {
    moves_id: 9,
    name: 'fast x',
    videourl: 'https://vk.com/video_ext.php?oid=685619563&id=456239172&hash=cfe8769d4b6aa58d&hd=2',
    bio: `Fast X is a 2023 American action film directed by Louis Leterrier from a screenplay written by Dan Mazeau and Justin Lin, who also co-wrote the story with Zach Dean. It is the sequel to F9 (2021), the tenth main installment, and the eleventh installment overall in the Fast & Furious franchise¹.

    Source: Conversation with Bing, 6/2/2023
    (1) Fast X - Wikipedia. https://en.wikipedia.org/wiki/Fast_X.
    (2) Fast X (2023) - IMDb. https://www.imdb.com/title/tt5433140/.
    (3) Fast X - Rotten Tomatoes. https://www.rottentomatoes.com/m/fast_x.`,
    imageurl: 'https://th.bing.com/th/id/OIP._2jGGZEKwr54Q4dubKz97wHaLu?pid=ImgDet&rs=1',
    release_time: 'May 12, 2023',
    tag:['best']

  },
  {
    moves_id: 10,
    name: 'Earthen Bottle',
    videourl: '#',
    bio: '$48',
    imageurl: 'https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg',
    release_time: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    tag:['best']

  },
  {
    moves_id: 11,
    name: 'Nomad Tumbler',
    videourl: '#',
    bio: '$35',
    imageurl: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    release_time: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    tag:['best']

  },
  {
    moves_id: 12,
    name: 'Focus Paper Refill',
    videourl: '#',
    bio: '$89',
    imageurl: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    release_time: 'Person using a pen to cross a task off a productivity paper card.',
    tag:['best']

  },
  {
    moves_id: 13,
    name: 'Machined Mechanical Pencil',
    videourl: '#',
    bio: '$35',
    imageurl: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    release_time: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    tag:['best']

  },
  // More products...
]
let videosCount=0;

export default function AllMovies() {
  const dispatch = useDispatch();
  const db = useSelector(state => state.db);

  const saveData = (dbDatatosave) => {
    dispatch(loadVideoSuccess({ dbDatatosave }));
  };

  const AllMoviesData = async () => {
    let AllMoviesList = [];
    const getMoves = await fetch(
      API_URL+'/Moves_posts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    AllMoviesList = await getMoves.json();
    console.log('All')
    AllMoviesList.forEach((x) => {
      if (!products.some((product) => product.moves_id === x.moves_id)) {
        products.push(x); // Add the new movie to products
      }
    });
    saveData(products);
    dispatch(moviesCount(videosCount));
    console.log('All end')

  };

  const getCount = async () => {
    const countOfAllMoves = await fetch(
      API_URL+'/get-count',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableName: 'Moves',
        }),
      }
      ).catch((e)=>{console.log('error in movies page')});

    if (countOfAllMoves?.status === 200) {
      const count = await countOfAllMoves.json();
      videosCount=count
      console.log("testx",( db.countOfMovies!==count))

      if (count !== db.countOfMovies) {
        AllMoviesData();
      }else{
        console.log(db)
        
        const databaseVideo=db.currentVideo?.dbDatatosave
        await  databaseVideo.forEach((x) => {
         
           if (!products.some((product) => product.moves_id === x.moves_id)) {
             products.push(x); // Add the new movie to products
           }
         });
         saveData(products);
         }
        
    }
  };

  const saveSelectedvideo = (UserData) => {
    dispatch(saveOneVideodata(UserData));
  };

  useEffect(() => {
    try{
      getCount();

    }catch(e){
      console.log('error in get count')
    }
    }, []);

  return (
    <>
      <div style={{ backgroundColor: '#1e2129' }}>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
  );
}
