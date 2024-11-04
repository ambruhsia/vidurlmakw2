import express from 'express';
import uniqid from 'uniqid';
import fs from 'fs';
import cors from 'cors';
import {GPTScript, RunEventType} from "@gptscript-ai/gptscript";
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(cors());
 
// app.use(express.static('stories'));
// const apiKey = process.env.OPENAI_API_KEY; 
//complete code not uploaded on github 


 



app.get('/test', (req, res) => {
  return res.json('Hello Worgggld!');
});

app.get('/create-story' , async (req,res)=>{
   const url = decodeURIComponent(req.query.url);
   const dir= uniqid();
   const path = './stories/'+dir;
   fs.mkdirSync(path, { recursive: true });

   console.log({
     url,
   });

   const opts = {
    input: `--url ${url} --dir ${path}`,
    disableCache: true,
  };
  

  try{ 
    console.log("about to run story.gpt");
    const run= await g.run('./story.gpt',opts); 
    console.log("awaiting results");
    run.on(RunEventType.Event, ev=>{
      if(ev.type === RunEventType.CallFinish && ev.output){
        console.log(ev.output);
      }
    });
    const result= await run.text();
    
  return res.json(result);
  } catch(e){
    console.error(e);
    return res.json('error');
  }

   return res.json("OK");

});
  
app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
  
