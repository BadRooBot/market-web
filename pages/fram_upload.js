import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
import ShowDialog from '@/components/dialog'
import { API_URL } from '@/myenv'

const FrameUpload = () => {
  const [apiUrl, setApiUrl] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef(null);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const userId = useSelector(state => state.user).currentUser?.jsonData.id;
  const [tags, setTags] = useState("");
  const [loadinge, setloading] = useState(false); // Initialize loadinge as false

  const ds = async () => {
    console.log('ds')
   
    const dataUrl = await fetch(API_URL+"/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'name': 'Dark Lotus', 'bio': 'M A H M O U D   S H E R I F' })
    });
    const jsonD = await dataUrl.json();
    console.log("de ", jsonD);
    setApiUrl(jsonD);
    console.log('apiUrl   ',apiUrl)
    
  };

  const handleFormSubmit = (e) => {
     e.preventDefault();
    setloading(true)
    console.log('in form submit');
    setSubmissionStatus("submitting");
    setMessage("Uploading... Please wait.");
    const formData = new FormData(e.target);

    fetch(apiUrl["upload_url"], {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.ok) {
          const nameVideo = formRef.current.elements.inputName.value;
          const bio = formRef.current.elements.inBio.value;
          const image = formRef.current.elements.inImage.value;
          const Release_time = formRef.current.elements.inRelease_time.value;
          const tags = formRef.current.elements.inTags.value;
          console.log('name', tags + nameVideo + bio + image + Release_time);
          const response2 = await fetch(API_URL + '/addMoves', {
            method: 'POST', headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'name': nameVideo, 'bio': bio, 'imageUrl': image, 'release_time': Release_time, 'tag': [tags], 'publisherID': userId
              , 'owner_id': apiUrl['owner_id'], 'video_id': apiUrl['video_id']
            }),
          });

          setSubmissionStatus("success");
          setMessage("Upload successful!");
          setloading(false); // Reset loading state

        } else {
          setSubmissionStatus("error");
          setMessage("Upload failed. Please try again.");
          setloading(false); // Reset loading state
        }
      })
      .catch((error) => {
        setSubmissionStatus("error");
        setMessage("Upload failed. Please try again.");
        setloading(false); // Reset loading state
      });
  };

  const handleTagsChange = (event) => {
    const inputValue = event.target.value;
    const modifiedValue = inputValue.replace(/,\s*$/, '');
    setTags(modifiedValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      const inputValue = event.target.value;
      const modifiedValue = inputValue.trim();
      if (modifiedValue !== '') {
        setTags(tags + (tags === '' ? '' : ','));
        event.target.value = '';
      }
    }
  };
  let [color, setColor] = useState("#0065d1");

  const handleColorChange= (event) =>{
    setColor(event.target.value)
    console.log(event.target.value)
    }
 
 
 
 
 
    return (
    <>

<>
    {userId!==undefined?(    
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-1 lg:px-8">
          
      <BarLoader
      cssOverride={override}
      loading={loadinge??false}
        color={color}
        width={'100%'}
      />
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      
        {/* Show message based on submissionStatus */}
        {submissionStatus !== "" ?(
          <p className="mb-16 text-4xl text-center font-bold text-blue-600">{message}</p>
        ):      <h1 className='mb-16 text-4xl text-center font-bold text-blue-600'>Upload Video</h1>

        }
        <form   ref={formRef} // Attach the form reference to the form element
        id="uploadForm"
         action={apiUrl["upload_url"]}
         method="post"
        encType="multipart/form-data"
        onSubmit={handleFormSubmit}
       className="space-y-3">
             
       <div>
          <input type="file" name="video" accept="video/*" className='text-gray-200 rounded-lg me-1 ms-1 bg-black flex w-full' />
        </div>

              <div >
                <label htmlFor="inputName" className="block text-sm font-medium leading-6 text-gray-400">
                Movie Name
                </label>
                <div className="mt-2">
        <input type="text" id='inputName' name='inputName'className='text-gray-200 rounded-lg me-1 ms-1 bg-black flex w-full'/>
                 
                </div>
              </div>
              <div >
                <label htmlFor="inImage" className="block text-sm font-medium leading-6 text-gray-400">
                The link of the movie image
                                </label>
                <div className="mt-2">
        <input type="text" id='inImage' name='inImage' className='text-gray-200 rounded-lg me-1 ms-1 bg-black flex w-full'/>
                 
                </div>
              </div>
              <div >
                <label htmlFor="inBio" className="block text-sm font-medium leading-6 text-gray-400">
                Description of the movie
                </label>
                <div className="mt-2">
        <input type="text" id='inBio' name='inBio' className='text-gray-200 rounded-lg me-1 ms-1 bg-black flex w-full'/>
                 
                </div>
              </div>
              <div >
                <label htmlFor="Release_time" className="block text-sm font-medium leading-6 text-gray-400">
                Release Time
                </label>
                <div className="mt-2">
        <input type="date" id='inRelease_time' name='inRelease_time'className='text-gray-200 rounded-lg me-1 ms-1 bg-black flex w-full' />
                 
                </div>
              </div>
              <div >
                <label htmlFor="inTags" className="block text-sm font-medium leading-6 text-gray-400">
                Tags
                </label>
                <div className="mt-2">
                  <h4 className='text-slate-500'>
                  Please click space after each tag
                  </h4>
                <input
          type="text"
          id="inTags"
          name="inTags"
          className="text-gray-200 rounded-lg me-1 ms-1 bg-black flex w-full"
          value={tags}
          onChange={handleTagsChange}
          onKeyPress={handleKeyPress}
        />

                 
                </div>
              </div>

              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                 onClick={ds}>
                  Upload
                </button>
                      </form>
             

      </div>
      <input type='color' onChange={handleColorChange}/>
    </div>
    ):
    <ShowDialog title="Error!!" text="You cannot download videos before logging in, click OK to go login" />
    }
    </>
    </>
  );
};

export default FrameUpload;
