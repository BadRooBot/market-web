import fs from 'fs';
import { VK } from 'vk-io';
import VKApi from 'node-vkapi';
import { IncomingForm } from 'formidable';
import { calculateSizeAdjustValues } from 'next/dist/server/font-utils';

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb' // Set desired value here
      }
  }
}


export default async function vk2(req, res) {
    req.connection.serverMaxPayload='10mb';
  const vkapi = new VKApi({
    app: {
      id: 51665639,
      secret: '4qoo1wUXpVbk7AHrB94n'
    },
    auth: {
      login: '+201005266301', // String
      pass: 'w3p:26-UgyMP8UQ', // String
      phone: '+201005266301' // String
    },
    token: 'vk1.a.irDhD22WSZpQhF-jKBN2T1oqL8VaMzn-B3tBj9UaRFW1LqfKlI_5m3IhHNJxyH8OKc4lgMQqio5BoIDTpzEOgh17iIM0-Q0GvO84HRjwlkohgMjXR5bKQlnrySS9_Xmm7kXx-4vBNdcYtNRCP7uiXmHUUMePIH6AM0NienNKPQ0h-MWphgDwokK_cwUPnm8iaMwZ2giWQfpphQF26lVzpQ' // String
  });

  const mytoken = vkapi.options.token;
  const vk = new VK({
    token: mytoken
  });


  const { file } = req.body;    // Use the videoFile variable to upload the file to VK
    try {
      const form =new IncomingForm();
      form.on('file',async function(filed,file){
        console.log('file recived')
       
  
      })
      form.parse(req)
      const uploadResponse = await vk.upload.video({
        name: 'Test',
        group_id: '220957447',
        source: {
          values: {
            value: file,
            filename: 'myTestVideo.mp4'
          }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }
