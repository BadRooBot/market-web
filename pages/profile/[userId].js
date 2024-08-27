import { deleteAllOrder,saveMyOrder,saveMyProduct } from "@/slices/orderSlice";
import { deleteAllItemCar } from "@/slices/cartSlice";
import { saveOneUserdata, saveOneProductdata } from "@/slices/dbSlice";
import { loginSuccess } from "@/slices/userSlice";
import { Suspense, useEffect, useState ,Fragment} from "react";
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from "react-redux";
import {API_URL,BEARER_TOKEN,APPNAME} from'@/myenv';
import Link from "next/link";
import Image from "next/image";
import Head from 'next/head';

var product_info = [
]


const MyProfile = ({ userId }) => {
  const [name, setname] = useState('Dark Lotus');
  const [url, seturl] = useState('https://src.pcsoft.com.cn/d/file/article/rjjc/syjc/2018-01-12/ae1af02ba65919b0b10d946c31459651.jpg');
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [badyText, setBadyText] = useState("Please wait, we're processing your Profile...");

  const dispatch = useDispatch();
  const StData = userId?.split('user=');
  const myData = useSelector((state) => state.user);
  const myDbData = useSelector((state) => state.db);
  const myOrder_db = useSelector((state) => state.order);
  
  
  let _userID;
  //console.log('ssssss------  ',StData)
  const saveSelectedvideo = (UserData) => {
    dispatch(saveOneProductdata(UserData));
  };

  const getMyOrder = async (id) => {
    setIsOpen(true)
    try {
      //console.log(id);
      const response = await fetch(API_URL+'/user/handle/get-all-order-for-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
                'Authorization': `Bearer ${BEARER_TOKEN}` ,// Add this line
                // Accept: 'application/json', // Add this line
        },
        body: JSON.stringify({ 'userId': id }),
      });
      const result = await response.json();
      // const newProducts = result.filter((x) => !products.some((p) => p.moves_id === x.moves_id));
      setProducts(result);
      dispatch(saveMyOrder(result))
      var allIds=[];
      for (let index = 0; index < result.length; index++) {
        for (let x = 0; x < result[index].product_id.length; x++) {
            allIds.push(result[index].product_id[x]);
        }
      }
      await AllProductData(allIds)

    } catch (error) {
      //console.log('Error: ', error);
    }
  };

  const AllProductData = async (ids) => {
    let AllProductList = [];
    const getMoves = await fetch(
      API_URL+'/user/handle/get-products-from-ids',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },body: JSON.stringify({
          "productIds":ids
        }),
      }
    );
    AllProductList = await getMoves.json();
    // product_info.push(AllProductList)
   dispatch(saveMyProduct(AllProductList))
   setTimeout(() => {
    window.location.href = '/profile/user=me';
    }, 5000);
  };
  
  const status='Enjoy your time, life is short'

 async  function getUserData()  {
    if (StData[1] === 'me'||StData[0] ==="success=true&") {
      seturl(myData.currentUser.jsonData.user_imageurl);
      setname(myData.currentUser.jsonData.user_name);
      _userID = myData.currentUser.jsonData.user_id;
      setProducts(myOrder_db.myOrder)
      product_info= myOrder_db.myProduct;
      //console.log('info',myOrder_db)
      if(StData[0] ==="success=true&"){
        getMyOrder(_userID)
        dispatch(deleteAllOrder());
        dispatch(deleteAllItemCar());
        const jsonData =await JSON.parse(decodeURIComponent(StData[1]));
        dispatch(loginSuccess({ jsonData }));
        dispatch(saveOneUserdata(jsonData));
       
      }
    } else {
      
      if (myData.currentUser === null) {
        const jsonData = JSON.parse(decodeURIComponent(StData[1]));
        dispatch(loginSuccess({ jsonData }));
        dispatch(saveOneUserdata(jsonData));
        seturl(jsonData.user_imageurl);
        setname(jsonData.user_name);
        _userID = jsonData.user_id;
        getMyOrder(_userID)

      } else {
        if (myDbData.selectedUser !== null) {
          seturl(myDbData.selectedUser.user_imageurl);
          setname(myDbData.selectedUser.user_name);
          _userID = myData.selectedUser?.user_id;
        }
      }
    }
  }

  const handleCardSelect = (id,index) => {
    setSelectedCard(id);
    const data = product_info.filter((item,i) => products[index].product_id.includes(item.product_id));
    setFilteredData(data)
    //console.log('Selected card:', data);
  };

  useEffect(() => {
    try {
      // getMyPosts(_userID);
  getUserData();

    } catch (e) {
      //console.log('error in get count users', e);
    }
  }, []);

  
  const OptionButton = ({ id,cardData, isSelected, onSelect, icon }) => (
    <button
      onClick={async () =>{
        
        //console.log('id=',filteredData) ; onSelect(id)
        }
        }
      className={`min-w-[250px] items-center  justify-center p-4 border rounded-lg transition-colors ${
        isSelected ? 'border-blue-500  ' : 'border-black dark:border-gray-200 hover:bg-slate-500'
      }`}
    >
      <h2 className="text-lg font-semibold justify-between  flex items-center">
        Order : {id}   
        <h3 className="text-lg font-semibold  justify-between"> total {cardData.total}</h3>
        </h2>
        <h2 className="text-lg font-semibold  flex items-center">
        status : {cardData.order_status}
        </h2>
    </button>
  );
  return (
    <div className="dark:bg-black pb-8">

    <Suspense   fallback={<h2>loading..</h2>}>
        
      <Head>
        <title>Profile | {APPNAME}</title>
        <meta name="description" content="user Profile our handmade crochet bags and macrame items." />
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  sm:mx-auto sm:w-full sm:max-w-sm  ">
        
      <Image className="rounded-full   w-48 h-48  flex-none" alt="prof"  key={'key_img'} width={500} height={500} src={url} />
        <h4 className="font-bold text-3xl  mt-6 text-neutral-800 dark:text-white text-center">{name}</h4>
        <h4 className="text-xl  mt-2 text-center text-neutral-900 dark:text-white">{status}</h4>
      </div>
      <div className="">
        <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8 mb-8">
          <h2 className="font-bold font-mono  mb-7 text-2xl text-neutral-500 dark:text-gray-200">Your Old Orders</h2>   
            <div className="flex  items-center justify-between rounded  px-4 ">
            <select
            key={'order_data_Key'}
              required
              id="order_data"
                    name="order_data"
                    
                onChange={(e) => {
                  
                  handleCardSelect(e.target.value,e.target.selectedIndex)
                }}
                className="w-full p-1 border rounded border-black/30  bg-neutral-900 text-white text-center dark:border-white/30 "
              >
                          {products!=[]&& products?.map((card,x) => (
            <>
                      <option key={card.order_id}  value={card.order_id} >
                        
                         {`#${card.order_id}  total: ${card.total}  ${card.order_status}`}
                      </option>
              </>
          ))}

               
                {/* Add more countries here */}
              </select>

          </div>       
          {selectedCard &&
              <div className="order-last min-h-screen  md:order-none mt-4">
              <ul className="grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {
                filteredData?.map((product,i) => (
                  <li className="aspect-square transition-opacity animate-fadeIn" key={product.product_id}>
                  <Link key={product.product_id}
                      onClick={() => saveSelectedvideo(product)}
                      href={`/info/${product.product_id}`} className="relative inline-block h-full w-full">
                    <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
                      <Image
                        alt={product.product_name}
                        src={product.imageurl}
                        layout="fill"
                        objectFit="fill"//"contain"
                        className="transition duration-300 ease-in-out group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 ">
                        <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
                          <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{product.product_name}</h3>
                          <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                            {product.product_price}
                            <span className="ml-1  hidden ">EGP</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
                ))}
                {/* Add more product items here */}
              </ul>
            </div>
                    }         
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(true)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral-50 dark:bg-neutral-900 text-black  dark:text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-black  dark:text-white"
                  >
                    Processing Profile
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-black  dark:text-white">
                      {badyText}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <div className="w-12 h-12 border-t-4 border-indigo-600 rounded-full animate-spin"></div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Suspense>
    </div>
  );
};

export default MyProfile;

export async function getServerSideProps({ params }) {
  return {
    props: {
      userId: params.userId,
    },
  };
}
