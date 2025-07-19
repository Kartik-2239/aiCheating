
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { ipcMain } from 'electron'
// import { createWorker } from 'tesseract.js';
import { desktopCapturer } from 'electron';
import { createUserContent, GoogleGenAI, Type, createPartFromUri } from "@google/genai";
import prompt from './prompts.js';

export function ansHandler(key){
  try{
      ipcMain.handle('get-answer',async (event,model_name)=>{
      const {screen} = require('electron')
      const {width, height} = screen.getPrimaryDisplay().size
      const sources = await desktopCapturer.getSources({ 
        types: ['screen'],
        thumbnailSize: {width, height}
      });
      const screenshot = await sources[0]
      const pngBuffer = await screenshot.thumbnail.toPNG() 
      const imgData = Buffer.from(pngBuffer).toString('base64')
      
      // const screenshotsDir = path.join(app.getPath('userData'), 'screenshots')
      // if (!fs.existsSync(screenshotsDir)) {
      //   fs.mkdirSync(screenshotsDir, { recursive: true })
      // }

      // const filePath = path.join(screenshotsDir, 'ss.png')
      // fs.writeFileSync(filePath, pngBuffer)

      // const worker = await createWorker('eng')
      // const ret = await worker.recognize(pngBuffer)
      
      // await worker.terminate()
 
      // fs.writeFileSync('./assets/text.txt',ret.data.text.replace('\n',' '))
      //"${ret.data.text}"

      
      if (model_name === 'gemini'){
        try{
          if (key == ''){
            key = 'invalid'
          }
        const ai = new GoogleGenAI({ apiKey: key }); //''
        async function main() {
          // const image = await ai.files.upload({
          //   file: filePath,
          // });
          const part = createPartFromUri({
            mimeType: 'image/png',
            data: pngBuffer
          })

          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite-preview-06-17",
          
            contents:[
              createUserContent([{
              text: prompt()
              },
              {
              inlineData: {
                  mimeType: 'image/png',
                  data: imgData,
                },
              }
              ])
            ]
              ,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    theCode: {
                      type: Type.STRING,
                    },
                    question: {
                      type: Type.STRING,
                    },
                  },
                  propertyOrdering: ["theCode", "question"],
                },
              },
            },
          });
          return response.text

        }
        let answer = await main()
        answer = JSON.parse(answer)
        return [answer[0].theCode, answer[0].question]
      }catch (error){
        let errorMsg = 'Unknown error';
        try {
          errorMsg = JSON.parse(error.message)?.error?.message || error.message;
        } catch {
          errorMsg = error.message ;
        }
        return ['encountered an error', errorMsg];
      }
      }
    })
  }
  catch{
    return ['no code','no pointers']
  }
}
