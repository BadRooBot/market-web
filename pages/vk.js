import { useState } from 'react';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('video', selectedFile);
      try {
        const name=document.getElementById('inputName').value;
        const bio=document.getElementById('inBio').value;
        console.log('name',name)
        // const response = await fetch('http://localhost:5000/upload', {
        //   method: 'POST',
        //   body: formData,
        // });

        // if (response.ok) {
        //   const data=await response.json()
        //   // File uploaded successfully
        //   console.log('File uploaded!',data);
        //   const bodyJSON={'name':name, 'videoUrl':'', 'bio':bio,'imageUrl':'', 'release_time':'','tag':['']};
        //   fetch('http://localhost:5000/addMoves',{
        //     method:'POST',
        //     body:bodyJSON
        //   })
        // } else {
        //   // Handle error response
        //   console.error('Upload failed!');
        // }
      } catch (error) {
        // Handle fetch error
        console.error('Upload failed!', error);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 className='mb-16'>Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-6">


              <div >
                <label htmlFor="inFile" className="block text-sm font-medium leading-6 text-gray-400">
                  select File
                </label>
                <div className="mt-2">
        <input type="file" name='inFile' id='inFile' accept="video/*" onChange={handleFileChange} className='text-gray-200 rounded-lg me-1 ms-1 bg-black'/>
                 
                </div>
              </div>
              <div >
                <label htmlFor="inputName" className="block text-sm font-medium leading-6 text-gray-400">
                Movie Name
                </label>
                <div className="mt-2">
        <input type="text" id='inputName' name='inputName'className='text-gray-200 rounded-lg me-1 ms-1 bg-black'/>
                 
                </div>
              </div>
              <div >
                <label htmlFor="inBio" className="block text-sm font-medium leading-6 text-gray-400">
                Description of the movie
                </label>
                <div className="mt-2">
        <input type="text" id='inBio' name='inBio' className='text-gray-200 rounded-lg me-1 ms-1 bg-black'/>
                 
                </div>
              </div>
              <div >
                <label htmlFor="Release_time" className="block text-sm font-medium leading-6 text-gray-400">
                Release Time
                </label>
                <div className="mt-2">
        <input type="text" id='inRelease_time' name='inRelease_time'className='text-gray-200 rounded-lg me-1 ms-1 bg-black' />
                 
                </div>
              </div>
              <div >
                <label htmlFor="inTags" className="block text-sm font-medium leading-6 text-gray-400">
                Tags
                </label>
                <div className="mt-2">
        <input type="month" id='inTags' name='inTags' className='text-gray-200 rounded-lg me-1 ms-1 bg-black'/>
                 
                </div>
              </div>
        <button type="submit">Upload</button>
      </form>
      </div>
    </div>
  );
};

export default UploadPage;
