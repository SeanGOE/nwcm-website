import express, { Express } from "express";
import { getEvents, getVideos } from './routes';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

const port: number = 8088;
const app: Express = express();

// Enable CORS for development
app.use(cors());
app.use(bodyParser.json());

// API routes
app.get('/api/events', getEvents);
app.get('/api/videos', getVideos);

// Production: serve static files and handle all routes
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  app.use(express.static(buildPath));
  
  app.get('*', (_req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(port, () => console.log(`Server listening on ${port}`));