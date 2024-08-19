import { useState } from 'react';
import { useSelector } from 'react-redux';
import { BarLoader } from 'react-spinners';
import ShowDialog from '@/components/dialog'
import {API_URL} from'@/myenv'
import { useRouter } from 'next/navigation';

const UploadPage = () => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  let [color, setColor] = useState("#0065d1");
  const userId= useSelector(state=>state.user).currentUser?.jsonData.id;
  console.log(userId)
  const [selectedFile, setSelectedFile] = useState(null);
  const [showIframe, setShowIframe] = useState(false);
  const [myHtml, setMyHtml] = useState('<h2>ggggggggg</h2>');
  const [tags, setTags] = useState([]);
  const [loadinge, setloading] = useState(null);

  const handleTagsChange = (event) => {
    const inputValue = event.target.value;
    const modifiedValue = inputValue.replace(/,\s*$/, ''); // Remove trailing comma and whitespace
    setTags(modifiedValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === ' ') {
      event.preventDefault(); // Prevent the default behavior of the Enter key
      const inputValue = event.target.value;
      const modifiedValue = inputValue.trim(); // Remove leading and trailing whitespace
      if (modifiedValue !== '') {
        setTags(tags + (tags === '' ? '' : ', ') );
        event.target.value = ''; // Clear the input field
      }
    }
  };

  const handleColorChange= (event) =>{
  setColor(event.target.value)
  console.log(event.target.value)
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleFrame=(event)=>{
    console.log('handleFrame')
    document.getElementById('uploadForm').addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent the default form submission behavior
      console.log('uploadForm   submit')

      document.getElementById('progressContainer').style.display = 'block';
  
      let progress = 0;
      const progressBar = document.getElementById('progressBar');
      const interval = setInterval(function () {
        progress += 5; // Simulated progress
        progressBar.style.width = progress + '%';
  
        if (progress >= 100) {
          clearInterval(interval);
          console.log('video add to VK done')
           
          // After the progress bar reaches 100%, redirect to the new page
          window.location.href = 'https://badroobot.netlify.app/fram_upload';
        } 
      }, 600); // Adjust the interval as needed
      
    });
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true)
    
    if (true) {
      console.log('file selected')
      try {
        const nameVideo=document.getElementById('inputName').value;
        const bio=document.getElementById('inBio').value;
        const image=document.getElementById('inImage').value;
        const Release_time=document.getElementById('inRelease_time').value;
        const tags=document.getElementById('inTags').value;
        console.log('name',tags+nameVideo+bio+image+Release_time)
        const response = await fetch(API_URL+'/upload', {
          method: 'POST', headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'name':nameVideo,'bio':bio,'imageUrl':image,'release_time':Release_time,'tag':tags,'publisherID':userId}),
        });
         
      if (response.ok) {
        const htmlContent = await response.text();
        setMyHtml(htmlContent);
        setShowIframe(!showIframe);
        setloading(false)
      } else {
        // Handle error response
        console.error('Upload failed!');
        setloading(false)
      }
      } catch (error) {
        // Handle fetch error
        setloading(false)
        console.error('Upload failed!', error);
      }
    }
  };

  return (
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
      <h1 className='mb-16 text-4xl text-center font-bold text-blue-600'>Upload Video</h1>
      {!showIframe && ( <form onSubmit={handleSubmit} className="space-y-3">
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
                >
                  Upload
                </button>
                      </form>)}
                      {showIframe && (
              <iframe
  title="HTML Frame"
  onLoad={() => {
    console.log('handleFrame');
    const MyTime = setInterval(function () {
    document.addEventListener('DOMContentLoaded', function () {
    console.log('bodyy',document.body)
    document.body.addEventListener('submit', function (e) {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa')

    if (e.target.id === 'uploadForm') {
      e.preventDefault();
      // Your form handling code here
        console.log('ggggggggggggggggggggggggggggggggggggg')
    }
  });
});

    
    }, 200);
  }}
  srcDoc={myHtml} // Set the HTML content as the srcDoc
  style={{ width: '100%', height: '400px' }}
></iframe>

            )}

      </div>
      <input type='color' onChange={handleColorChange}/>
    </div>
    ):
    <ShowDialog title="Error!!" text="You cannot download videos before logging in, click OK to go login" />
    }
    </>
  );
};

export default UploadPage;
