import { deleteAll, loadProductSuccess, productCount, saveOneProductdata, saveSelectedUaserData } from "../slices/dbSlice";
import { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {API_URL} from'@/myenv'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import Head from 'next/head';

var products = [
  // {
  //   product_id: 1,
  //   product_name: 'BadRooBot',
  //   product_price: 10.20,
  //   product_bio: 'test bio',
  //   imageurl: 'https://scontent.fcai19-1.fna.fbcdn.net/v/t39.30808-6/451110840_3830816397151466_6680009169378606729_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Z8SAoA_MYygQ7kNvgFiURXx&_nc_ht=scontent.fcai19-1.fna&oh=00_AYD1G3nkgGFi48a0TGCmtWMHzSHHWKiSr4PPn05Ky3beoQ&oe=66BEB05A',
  //   additionalImages: [
  //     'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
  //     'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
  //     'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
  //   ],
  //   release_time: "8/5/2000",
  //   product_colors:['Black', 'Tan'],
  //   tag: ['best' ,'macrame','some thing']
  // }
];
let _productCount;

const ProductPage = () => {
  const dispatch = useDispatch();
  const db = useSelector(state => state.db);
  const [pageNumber, setPageNumber] = useState(1);
  const [productLimit, setProductLimit] = useState(0);
  const [codeForCollections, setCodeForCollections] = useState(100);
  const [codeForSort, setCodeForSort] = useState(1);
  const router = useRouter();

  var { pg,page } = router.query;
  pg=pg??1

  const saveData = (dbDatatosave) => {
    dispatch(loadProductSuccess({ dbDatatosave }));
  };

  const AllProductData = async (coll,sort,) => {
    let AllProductList = [];
    const getMoves = await fetch(
      API_URL+'/user/handle/get-products',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },body: JSON.stringify({
          limit:((pg-1)*10),filter:coll+sort
        }),
      }
    );
    AllProductList = await getMoves.json();
    // //console.log('All',AllProductList)
    await AllProductList.forEach((x) => {
      if (!products.some((product) => product.product_id === x.product_id)) {
        products = [...products, x]; // Spread the existing array and add the new movie
      }
    });
    _productCount=products.length;
    saveData(products);
    dispatch(productCount(_productCount));
    // //console.log('All end')

  };
  
  const getCount = async () => {
    const countOfAllMoves = await fetch(
      API_URL+'/user/handle/get-product-count',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),

        },
       
      }
      ).catch((e)=>{});

    if (countOfAllMoves?.status === 200) {
      const count = await countOfAllMoves.json();
      _productCount=count
      // //console.log("testx",( db.countOfProduct!==count))

      if (count !== db.countOfProduct) {
        AllProductData(100,1);
      }else{
        // //console.log(db)
        
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
      //console.log('error in get count')
    }
    }, []);


  const collections = [
    { name: 'All', href: '', current: true },
    { name: 'Bags', href: '/search/bags?sort=latest-desc' },
    { name: 'macrame', href: '/search/drinkware?sort=latest-desc' },
   
  ];
const changeProdcut=async (coll,sort) =>{
  
  products=[]
  //console.log('sort = c',(coll+sort))
  dispatch(deleteAll)
AllProductData(coll,sort,pageNumber)
}

  const sortOptions = [
    { name: 'Last ', href: '/user/handle/get-products', current: true },
    { name: 'Price: Low to high', href: '/user/handle/get-products',current: false},
    { name: 'Price: High to low', href: '/user/handle/get-products' ,current: false},
  ];

  const paginationPages = Array.from({ length:(products.length/10)+1 }, (_, i) => i + 1);
  const indexOfLastItem = pg * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-teal-600 dark:selection:text-white">
      <Head>
        <title>Market</title>
        <meta name="description" content="Market our handmade crochet bags and macrame items." />
      </Head>
    <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4  md:flex-row dark:text-white ">
      {/* Collections */}
      <div className="order-first w-full flex-none md:max-w-[125px]">
        <nav>
          <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">Collections</h3>
          <ul className="hidden md:block">
            {collections.map((item,i) => (
              <li key={item.name} className="mt-2 flex text-black dark:text-white">
               
                  <button onClick={()=>{
                      router.push({
                        pathname: router.pathname,
                        query: { ...router.query, pg:1 },
                      });
                      pg=1;
                    setCodeForCollections((i+1)*100);
                    changeProdcut((i+1)*100,codeForSort);
                  }}  className="w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100">
                      <p className={(i+1)*100==codeForCollections?"w-full text-sm underline underline-offset-4":"w-full text-sm "}>{item.name}</p>
                  </button>
              </li>
            ))}
          </ul>
          <div className="relative md:hidden">
            <div className="flex w-full items-center justify-between rounded  px-4 ">
            <select
              required
              id="by_Collections"
                    name="by_Collections"
                    
                onChange={(e) => {
                  router.push({
                    pathname: router.pathname,
                    query: { ...router.query, pg:1 },
                  });
                  pg=1;
                  changeProdcut((e.target.selectedIndex+1)*100,codeForSort)}}
                className="w-full p-1 border rounded border-black/30  bg-neutral-900 text-white text-center dark:border-white/30"
              >
                <option  value="All" >All</option>
                <option  value="Bags" >Bags</option>
                <option value="Macrame">Macrame</option>
                {/* Add more countries here */}
              </select>

            </div>
          </div>
        </nav>
      </div>

      {/* Product Grid */}
   
      <div className="order-last min-h-screen w-full md:order-none">
      {currentItems.length>0? <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {currentItems.map((product,i) => (
          <li className="aspect-square transition-opacity animate-fadeIn" key={product.product_id}>
            <Link key={product.product_id}
                onClick={() => saveSelectedvideo(product)}
                href={`/info/${product.product_id}`} className="relative inline-block h-full w-full">
              <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                <Image
                  alt={product.product_name}
                  src={product.imageurl}
                  fill
                  objectFit="fill"//"contain"
                  className="transition duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
                  <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                    <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{product.product_name}</h3>
                    <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                      {product.product_price}
                      <span className="ml-1 inline ">EGP</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
          ))}
          {/* Add more product items here */}
        </ul>
        :                   
          <h1 className="text-3xl text-center  text-neutral-900 dark:text-white animate-bounce">🏐</h1>
}
      </div>
      
      {/* Sort Options */}
      <div className="order-none flex-none md:order-last md:w-[125px]">
        <nav>
          <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">Sort by</h3>
          <ul className="hidden md:block">
            {sortOptions.map((option,i) => (
              <li key={option.name} className="mt-2 flex text-sm text-black dark:text-white">
                  <button onClick={()=>{ 
                    setCodeForSort(i+1)
                    changeProdcut(codeForCollections,i+1)}
                    } className="w-full hover:underline hover:underline-offset-4">
                
                  <p className={codeForSort==i+1 ?"w-full underline underline-offset-4":"w-full "}>{option.name}</p>
                
                    
                  </button>
                
              </li>
            ))}
          </ul>
          <div className="relative md:hidden">
            <div className="flex w-full items-center justify-between rounded   px-4 text-sm ">
            <select
              required
              id="sort_by"
                    name="sort_by"
                    
                onChange={(e) => {changeProdcut(codeForCollections,e.target.selectedIndex+1)}}
                className="w-full p-1 border rounded border-black/30  bg-neutral-900 text-white text-center dark:border-white/30"
              >

                <option  value="Last" >Last</option>
                <option  value="Price: Low to high" >Price: Low to high</option>
                <option value="Price: High to low">Price: High to low </option>
                {/* Add more countries here */}
              </select>
              {/* <div>Latest arrivals</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg> */}
            </div>
          </div>
        </nav>
      </div>
       
    </div>
     {/* Pagination */}
  <div className="flex justify-center pt-6">
  <div className="join">
    {paginationPages.map((_page,i) => (
      <button onClick={async(e) =>{
        router.push({
          pathname: router.pathname,
          query: { ...router.query, pg:_page },
        });
        pg=_page;
        AllProductData(codeForCollections,codeForSort)

         }}
        key={_page}
        className={`dark:bg-gray-800 text-neutral-200 bg-neutral-600  pt-2 pb-2 pl-5 pr-5 mb-4 ml-2 rounded-md`}
      >
        {_page}
      </button>
    ))}
  </div>
  </div>
</div>

  );
};

export default ProductPage;


export async function getServerSideProps({ params ,query }) {
  return {
    props: {
      initialPage: query.pg || 1,
    },
  };
}