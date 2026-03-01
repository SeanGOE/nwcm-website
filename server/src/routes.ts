import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import express from "express";
import axios from "axios";
import dotenv from 'dotenv';
import fs from "fs";
import path from "path";

// Load environment variables (currently only YouTube API key)
dotenv.config();

// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

/** Event type definition */
export type Event = {
  title: string;
  month: string; // Month of the event, e.g. "Nov"
  day: string; // Day of the month, e.g. "7"
  year: string; // Year of the event, e.g. "2024"
  time?: string; // optional, e.g. "10:00 AM - 11:30 AM"
  location?: string;
  description?: string;
};

type Sermon = {
    title: string;
    date: string;
    speaker: string;
    videoId: string; // YouTube video ID
    thumbnail?: string;
    series?: string;
};

// YouTube API Configuration
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const CHANNEL_ID = 'UCCwFCo6kWkNaeIHdeP_XOGw';

// Example: Array of events with various dates
export let events: Event[] = [
  
];

export let sermons: Sermon[] = [
  
];

const router = express.Router();

export const getEvents = (_req: SafeRequest, res: SafeResponse): void => {
  try {
    const filePath = path.join(__dirname, "events", "events.json");
    const data = fs.readFileSync(filePath, "utf-8");
    const events: Event[] = JSON.parse(data);
    res.send(events);
  } catch (error) {
    console.error("Error reading events.json:", error);
    res.status(500).send({ error: "Failed to load events" });
  }
};

/** Fetch sermons from YouTube channel */
export const fetchSermonsFromYouTube = async (): Promise<Sermon[]> => {
  try {
    if (!YOUTUBE_API_KEY) {
      console.error('YouTube API key not found in .env');
      return [];
    }

    const channelResp = await axios.get(
      'https://www.googleapis.com/youtube/v3/channels',
      {
        params: {
          part: 'contentDetails',
          id: CHANNEL_ID,
          key: YOUTUBE_API_KEY,
        },
      }
    );

    if (!channelResp.data.items || channelResp.data.items.length == 0) {
      console.error('Channel not found');
      return [];
    }

    const uploadsPlaylistId = channelResp.data.items[0].contentDetails.relatedPlaylists.uploads;

    const playlistResp = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems`,
      {
        params: {
          part: 'snippet',
          playlistId: uploadsPlaylistId,
          maxResults: 20, // More just to filter, can change if u want
          key: YOUTUBE_API_KEY,
        }
      }
    );

    // Filter for "Sunday Service" and get first 6 vids
    const sundayServiceVideos = playlistResp.data.items
      .filter((item: any) => {
        const title = item.snippet.title;
        return title.toLowerCase().startsWith('sunday service');
      })
      .slice(0, 6)
      .map((item: any) => {
        const publishedDate = new Date(item.snippet.publishedAt);
        return {
          title: item.snippet.title,
          date: publishedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          speaker: "Pastor Dino",
          videoId: item.snippet.resourceId.videoId,
          thumbnail: item.snippet.thumbnails?.maxres?.url || 
                     item.snippet.thumbnails?.high?.url ||
                     item.snippet.thumbnails?.medium?.url,
          series: "Sunday Service"
        };
      });

      console.log(`Fetched ${sundayServiceVideos.length} Sunday Service videos from YouTube`);
      return sundayServiceVideos;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Youtube API Error: ', error.response?.data || error.message);
    } else {
      console.error('Error fetching YouTube videos', error);
    }
    return [];
  }
}

export const getVideos = async (_req: SafeRequest, res: SafeResponse): Promise<void> => {
  try {
    // If sermons alr. cached, return them
    if (sermons.length > 0) {
      res.send(sermons);
      return;
    }

    // Otherwise fetch
    sermons = await fetchSermonsFromYouTube();
    res.send(sermons);
  } catch (error) {
    console.error('Error in getVideos() function', error);
    res.status(500).send({ error: 'Failed to fetch videos' });
  }
};

// Optional: Periodically refresh sermons (every hour)
setInterval(async () => {
  try {
    const newSermons = await fetchSermonsFromYouTube();
    if (newSermons.length > 0) {
      sermons = newSermons;
      console.log('Sermons cache refreshed at', new Date().toISOString());
    }
  } catch (error) {
    console.error('Error refreshing sermons cache:', error);
  }
}, 60 * 60 * 1000); // 1 hour

// Initialize sermons cache on startup
fetchSermonsFromYouTube().then((initialSermons) => {
  sermons = initialSermons;
  console.log('Initial sermons loaded:', sermons.length);
});


export default router;