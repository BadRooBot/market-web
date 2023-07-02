
import { saveOneUserdata, saveOneVideodata } from "@/slices/dbSlice";
import { loginSuccess } from "@/slices/userSlice";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {API_URL} from'@/myenv'
import Link from "next/link";
import Image from "next/image";

var proMovies = [
  {
    "name": "A B O S H E R Ix F",
    "videourl": "https://vk.com/video_ext.php?oid=-220957447&id=456239101&hash=c7631ed2d84cc0ad&__ref=vk.android&api_hash=1688092869d43768e898d75f177b_HAYDKOBXGI2DGMQ",
    "bio": "Land Zombie is a 2023 American horror film directed by George A. Romero and starring Simon Pegg, Nick Frost, and Emma Stone. The film follows a group of survivors who try to escape from a zombie-infested city that has been quarantined by the military. The film is a sequel to the 2004 film Shaun of the Dead and the third installment in Romero's Living Dead series. The film combines elements of comedy, satire, and social commentary, as it explores themes such as consumerism, media manipulation, and human nature in the face of a zombie apocalypse. The film received critical acclaim for its witty script, clever homages to previous zombie films, and its balance of horror and humor. The film was also a commercial success, grossing over $300 million worldwide and becoming one of the highest-grossing zombie films of all time.",
    "imageurl": "https://th.bing.com/th/id/OIP.7Z4AZIQW34k4LhHea-YJFgHaMQ?pid=ImgDet&rs=1",
    "release_time": "3232-02-23",
    "moves_id": 20,
    
    "tag": [
    "new"
    ],
    
    "publisher_id": null
    },
    {
      "name": "No marcy",
      "videourl": "https://vk.com/video_ext.php?oid=-220957447&id=456239103&hash=030dc9e309657da2&__ref=vk.android&api_hash=1688120557d730b799495074c6c5_HAYDKOBXGI2DGMQ",
      "bio": "Land Zombie is a 2023 American horror film directed by George A. Romero and starring Simon Pegg, Nick Frost, and Emma Stone. The film follows a group of survivors who try to escape from a zombie-infested city that has been quarantined by the military. The film is a sequel to the 2004 film Shaun of the Dead and the third installment in Romero's Living Dead series. The film combines elements of comedy, satire, and social commentary, as it explores themes such as consumerism, media manipulation, and human nature in the face of a zombie apocalypse. The film received critical acclaim for its witty script, clever homages to previous zombie films, and its balance of horror and humor. The film was also a commercial success, grossing over $300 million worldwide and becoming one of the highest-grossing zombie films of all time.",
      "imageurl": "https://cdn.max-c.com/heybox/dailynews/img/5eba1b13e8efc5b0d0425cf72e2fec2b.png?imageMogr2/format/jpg",
      "release_time": "2000-05-08",
      "moves_id": 21,
      
      "tag": [
      "new"
      ],
      
      "publisher_id": null
      },  
      {
        "name": "Ant-Man and the Wasp: Quantumania 2023",
        "videourl": "https://vk.com/video_ext.php?oid=-220957447&id=456239111&hash=6125cb94afca417b&__ref=vk.android&api_hash=1688225005c20514804e72553137_HAYDKOBXGI2DGMQ",
        "bio": "Land Zombie is a 2023 American horror film directed by George A. Romero and starring Simon Pegg, Nick Frost, and Emma Stone. The film follows a group of survivors who try to escape from a zombie-infested city that has been quarantined by the military. The film is a sequel to the 2004 film Shaun of the Dead and the third installment in Romero's Living Dead series. The film combines elements of comedy, satire, and social commentary, as it explores themes such as consumerism, media manipulation, and human nature in the face of a zombie apocalypse. The film received critical acclaim for its witty script, clever homages to previous zombie films, and its balance of horror and humor. The film was also a commercial success, grossing over $300 million worldwide and becoming one of the highest-grossing zombie films of all time.",
        "imageurl": "https://src.pcsoft.com.cn/d/file/article/rjjc/syjc/2018-01-12/ae1af02ba65919b0b10d946c31459651.jpg",
        "release_time": "2013-03-03",
        "moves_id": 26,
        
        "tag": [
        "new"
        ],
        "publisher_id": "42767fdb-adb3-4eaa-b5ac-b595ca33e624"
        }
     
    
  // More products...
]


const UserProfile = ({ userId }) => {
  const [name, setname] = useState(null);
  const [url, seturl] = useState('https://src.pcsoft.com.cn/d/file/article/rjjc/syjc/2018-01-12/ae1af02ba65919b0b10d946c31459651.jpg');

  const dispatch = useDispatch();
  const StData = userId?.split('user=');
  const myData = useSelector((state) => state.user);
  const myDbData = useSelector((state) => state.db);
  let _userID;

  const saveSelectedvideo = (UserData) => {
    dispatch(saveOneVideodata(UserData));
  };
  const [products, setProducts] = useState([]);

  const getMyPosts = async (id) => {
    try {
      console.log(id);
      const response = await fetch(API_URL+'/user-movies-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json', // Add this line

        },
        body: JSON.stringify({ id: id }),
      });
      const result = await response.json();
      const newProducts = result.filter((x) => !products.some((p) => p.moves_id === x.moves_id));
      setProducts((prevProducts) => [...proMovies, ...newProducts]);
      console.log('result: ', result);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  
  const status='Enjoy your time, life is short'

  function getUserData() {
    if (StData[1] === 'me') {
      seturl(myData.currentUser.jsonData.image_url);
      setname(myData.currentUser?.jsonData.username);
      _userID = myData.currentUser?.jsonData.id;
    } else {
      if (myData.currentUser === null) {
        const jsonData = JSON.parse(decodeURIComponent(StData[1]));
        dispatch(loginSuccess({ jsonData }));
        dispatch(saveOneUserdata(jsonData));
        seturl(jsonData.image_url);
        setname(jsonData.username);
        _userID = jsonData.id;
      } else {
        if (myDbData.selectedUser !== null) {
          seturl(myDbData.selectedUser.image_url);
          setname(myDbData.selectedUser.username);
          _userID = myData.selectedUser?.id;
        }
      }
    }
  }
  useEffect(() => {
    try {
      getUserData();
      getMyPosts(_userID);
    } catch (e) {
      console.log('error in get count users', e);
    }
  }, []);

  return (
    <Suspense fallback={<h2>loading..</h2>}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8  sm:mx-auto sm:w-full sm:max-w-sm">
        <Image className="rounded-full  w-60 "  width={5000} height={4000} src={url} />

        <h4 className="font-bold text-3xl  mt-6  text-center">{name}</h4>
        <h4 className="text-xl  mt-2 text-center">{status}</h4>

        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
        >
          Follow {name}
        </button>
      </div>
      <div style={{ backgroundColor: '#1e2129' }}>
        <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
          <h2 className="font-bold font-mono  mb-7 text-2xl text-gray-200">Videos {name} Shared</h2>

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
                   width={2000} height={2000}
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
    </Suspense>
  );
};

export default UserProfile;

export async function getServerSideProps({ params }) {
  return {
    props: {
      userId: params.userId,
    },
  };
}
