import { useSelector } from "react-redux";
import { Suspense } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";


const Watch = ({videoId}) => {
  const video = useSelector(state=>state.db);
  const imageurl = video.selectedVideo?.imageurl;
   const name = video.selectedVideo?.name;
  const videourl = video.selectedVideo?.videourl;
  const bio = video.selectedVideo?.bio;
  const release_time = video.selectedVideo?.release_time;
  
  return (
    <Suspense fallback={<h2>loading..</h2>}>
  
      <div
  className="m-2 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
  <Image
    className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
    src={imageurl}
    alt="" />
  <div className="flex flex-col justify-start p-6">
    <h5
      className="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
      {name}
    </h5>
    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
      {bio}
    </p>
    <p className="text-xs text-neutral-500 dark:text-neutral-300">
      {release_time}
    </p>
  </div>
  
</div>

      {/* <ReactPlayer className=" m-7" url='https://vk.com/video_ext.php?oid=-22781583&id=456253339&hash=13a8d88e727024be&hd=2' width={'88%'}   controls={true} /> */}
      <iframe className="w-5/6 m-7 " height={'500px'} src={videourl}  allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowFullScreen></iframe>

        
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