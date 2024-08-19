 import fs from 'fs';
// import { VK } from 'vk-io';
// import VKApi from 'node-vkapi';
// import { IncomingForm } from 'formidable';

// export const config = {
//   api: {
//     bodyParser: false,

//     bodyParser: {
//       sizeLimit: '10mb' // تعيين الحجم المحدد هنا
//     }
//   }
// };

// export default async function vk2(req, res) {
//   try {
//     const form = new IncomingForm();
    
//     form.parse(req, async (err, fields, files) => {
//       res.send('ssssssssss')
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: err.message });
//       }

//       const vkapi = new VKApi({
//         app: {
//           id: 51665639,
//           secret: '4qoo1wUXpVbk7AHrB94n'
//         },
//         auth: {
//           login: '+201005266301', // String
//           pass: 'w3p:26-UgyMP8UQ', // String
//           phone: '+201005266301' // String
//         },
//         token: 'vk1.a.irDhD22WSZpQhF-jKBN2T1oqL8VaMzn-B3tBj9UaRFW1LqfKlI_5m3IhHNJxyH8OKc4lgMQqio5BoIDTpzEOgh17iIM0-Q0GvO84HRjwlkohgMjXR5bKQlnrySS9_Xmm7kXx-4vBNdcYtNRCP7uiXmHUUMePIH6AM0NienNKPQ0h-MWphgDwokK_cwUPnm8iaMwZ2giWQfpphQF26lVzpQ' // String
//       });

//       const mytoken = vkapi.options.token;
//       const vk = new VK({
//         token: mytoken
//       });

//       const videoFile = files.file.path;

//       try {
//         const response = await vk.upload.video({
//           name: 'videosss2',
//           group_id: '220957447',
//           source: videoFile
//         });

//         console.log(response);
//         res.status(200).json({ success: true });
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: error.message });
//       } finally {
//         await fs.unlink(videoFile); // حذف الملف المؤقت بعد التحميل
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error });
//   }
// }

// pages/api/upload.js

import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error('Error parsing form data:', err);
      res.status(500).json({ message: 'Server Error' });
      return;
    }

    // Access the uploaded video file using files.video
    const videoFile = files.video;

    // Process or save the video file as needed
    // For example, you can save the file using the fs module

    res.status(200).json({ message: 'Video uploaded successfully' });
  });
}
