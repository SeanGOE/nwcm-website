import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import express from "express";
import axios from "axios";
import dotenv from 'dotenv';

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
  {
    title: "Sunday Service",
    month: "Dec",
    day: "22",
    year: "2025",
    time: "10:00 AM - 11:30 AM",
    location: "Main Sanctuary",
    description: "Join us for our weekly Sunday service where we gather to worship, pray, and hear a message from the Bible."
  },
  {
    title: "Youth Group",
    month: "Dec",
    day: "23",
    year: "2025",
    time: "6:00 PM - 8:00 PM",
    location: "Youth Center",
    description: "Weekly gathering for teens with games, worship, and Bible study."
  },
  {
    title: "Christmas Eve Service",
    month: "Dec",
    day: "24",
    year: "2025",
    time: "7:00 PM - 9:00 PM",
    location: "Main Sanctuary",
    description: "Special Christmas Eve candlelight service celebrating the birth of Jesus."
  },
  {
    title: "Christmas Day Service",
    month: "Dec",
    day: "25",
    year: "2025",
    time: "10:00 AM - 11:00 AM",
    location: "Main Sanctuary",
    description: "Christmas morning worship service."
  },
  {
    title: "Prayer Meeting",
    month: "Dec",
    day: "26",
    year: "2025",
    time: "7:00 PM - 8:00 PM",
    location: "Prayer Room",
    description: "Weekly prayer meeting - all are welcome."
  },
  {
    title: "Sunday Service",
    month: "Dec",
    day: "29",
    year: "2025",
    time: "10:00 AM - 11:30 AM",
    location: "Main Sanctuary",
    description: "Join us for our weekly Sunday service."
  },
  {
    title: "New Year's Eve Service",
    month: "Dec",
    day: "31",
    year: "2025",
    time: "9:00 PM - 12:30 AM",
    location: "Main Sanctuary",
    description: "Ring in the new year with worship, prayer, and fellowship."
  },
  {
    title: "New Year's Day Service",
    month: "Jan",
    day: "1",
    year: "2026",
    time: "11:00 AM - 12:00 PM",
    location: "Main Sanctuary",
    description: "Start the new year in worship and prayer."
  },
  {
    title: "Sunday Service",
    month: "Jan",
    day: "5",
    year: "2026",
    time: "10:00 AM - 11:30 AM",
    location: "Main Sanctuary",
    description: "Join us for our weekly Sunday service."
  },
  {
    title: "Bible Study",
    month: "Jan",
    day: "8",
    year: "2026",
    time: "7:00 PM - 8:30 PM",
    location: "Fellowship Hall",
    description: "Midweek Bible study - diving deep into God's Word."
  },
  {
    title: "Sunday Service",
    month: "Jan",
    day: "25",
    year: "2026",
    time: "10:00 AM - 11:30 AM",
    location: "Main Sanctuary",
    description: "This is test."
  },
];

export let sermons: Sermon[] = [
  
];

const router = express.Router();

/** Handles GET requests to retrieve all events */
export const getEvents = (_req: SafeRequest, res: SafeResponse): void => {
    res.send(events);
    return;
}

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