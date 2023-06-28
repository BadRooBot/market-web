import { loadVideoSuccess } from "@/slices/dbSlice";
import { saveSelectedUaserData, usersCount } from "@/slices/dbSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const people = [
    {
      id:'dsdsdsdccccccccccddddddd',
      username: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      image_url:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      id:'dsdsdsdccccccccccddddddd',
      username: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      image_url:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      id:'dsdsdsdccccccccccddddddd',
      username: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      image_url:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
    {
      id:'dsdsdsdccccccccccddddddd',
      username: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      role: 'Front-end Developer',
      image_url:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      id:'dsdsdsdccccccccccddddddd',
      username: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      role: 'Designer',
      image_url:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      id:'dsdsdsdccccccccccddddddd',
      username: 'Tom Cook',
      email: 'tom.cook@example.com',
      role: 'Director of Product',
      image_url:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
    },
  ]
 
 
  let UsersCount=0;

 
  export default  function Example() {
    const dispatch = useDispatch();
    const db = useSelector(state => state.db);
  
    const saveData = (dbDatatosaveusers) => {
      dispatch(loadVideoSuccess({ dbDatatosaveusers }));
    };
  
    const AllUsersData = async () => {
      let AllUsersList = [];
      const getUsersdata = await fetch(
        'http://localhost:5000/get-All-user',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      AllUsersList = await getUsersdata.json();
      console.log('All')
      AllUsersList.forEach((x) => {
        if (!people.some((product) => product.id === x.id)) {
          people.push(x); // Add the new movie to products
        }
      });
      saveData(people);
      dispatch(usersCount(UsersCount));
      console.log('All end')
  
    };
  
    const getCount = async () => {
      const countOfAlluser = await fetch(
        'http://localhost:5000/get-count',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tableName: 'users',
          }),
        }
      );
  
      if (countOfAlluser.status === 200) {
        const count = await countOfAlluser.json();
        UsersCount=count
        console.log("testx",( db.countOfUsers!==count))
  
        if (count === db.countOfUsers) {
          AllUsersData();
        }else{
          const databaseVideo=db.currentVideo?.dbDatatosaveusers
         await  databaseVideo.forEach((x) => {
          
            if (!people.some((product) => product.id === x.id)) {
              people.push(x); // Add the new movie to products
            }
          });
          saveData(people);
        }
      }
    };
  
  
    useEffect(() => {
      getCount();
    }, []);   
    
    const saveSelected=(UserData)=>{
      dispatch(saveSelectedUaserData(UserData))
    }
    return (
< >
<ul role="list" className=" divide-purple-600 mx-auto max-w-2xl px-4 py-1 sm:px-6 sm:py-2 lg:max-w-7xl lg:px-8" >
        {people.map((person) => (
          
 <a key={person.email} href={`/user/${person.email}`} onClick={ 
  function fOnClick(){
    saveSelected(person)
  }
}  className="group"> 
   
      <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.image_url} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-100">{person.username}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-400">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
          </li>
          </a>
        ))}
      </ul>

</>    )
  }
  