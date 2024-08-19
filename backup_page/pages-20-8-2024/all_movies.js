import { loadProductSuccess, productCount, saveOneProductdata, saveSelectedUaserData } from "../slices/dbSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {API_URL} from'@/myenv'
import Image from "next/image";
import Link from "next/link";


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
let _productCount;

export default function AllProduct() {
  const dispatch = useDispatch();
  const db = useSelector(state => state.db);

  const saveData = (dbDatatosave) => {
    dispatch(loadProductSuccess({ dbDatatosave }));
  };

  const AllProductData = async () => {
    let AllProductList = [];
    const getMoves = await fetch(
      API_URL+'/Moves_posts',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    AllProductList = await getMoves.json();
    console.log('All')
    AllProductList.forEach((x) => {
      if (!products.some((product) => product.product_id === x.product_id)) {
        products = [...products, x]; // Spread the existing array and add the new movie
      }
    });
    saveData(products);
    dispatch(productCount(_productCount));
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
      _productCount=count
      console.log("testx",( db.countOfProduct!==count))

      if (count !== db.countOfProduct) {
        AllProductData();
      }else{
        console.log(db)
        
        const databaseVideo=db.currentProduct?.dbDatatosave
        await  databaseVideo.forEach((x) => {
         
          if (!products.some((product) => product.product_id === x.product_id)) {
            products = [...products, x]; // Spread the existing array and add the new movie
          }
         });
         saveData(products);
         }
        
    
        }
  };

  const saveSelectedvideo = (UserData) => {
    dispatch(saveOneProductdata(UserData));
  };

  useEffect(() => {
    try{
      getCount();

      const databaseVideo=db.currentProduct?.dbDatatosave
  if(databaseVideo!==undefined){
    databaseVideo.forEach((x) => {
     if (!products.some((product) => product.product_id === x.product_id)) {
      products = [...products, x]; // Spread the existing array and add the new movie
    }
   });
   saveData(products);
  }
    }catch(e){
      console.log('error in get count')
    }
    }, []);



    //UI    //////////////////////
  return (
    <>
      <div style={{ backgroundColor: '#1e2129' }}>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-9 rounded-lg">
            {products.map((product) => (
              <Link
                key={product.product_id}
                onClick={() => saveSelectedvideo(product)}
                href={`/info/${product.product_id}`}
                className="group rounded-lg"
                style={{ backgroundColor: '#343a40' }}
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative pt-[100%]">
                <span
                    className={`
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
