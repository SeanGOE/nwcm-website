"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideos = exports.fetchSermonsFromYouTube = exports.getEvents = exports.sermons = exports.events = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables (currently only YouTube API key)
dotenv_1.default.config();
// YouTube API Configuration
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const CHANNEL_ID = 'UCCwFCo6kWkNaeIHdeP_XOGw';
// Example: Array of events with various dates
exports.events = [
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
exports.sermons = [];
const router = express_1.default.Router();
/** Handles GET requests to retrieve all events */
const getEvents = (_req, res) => {
    res.send(exports.events);
    return;
};
exports.getEvents = getEvents;
/** Fetch sermons from YouTube channel */
const fetchSermonsFromYouTube = async () => {
    try {
        if (!YOUTUBE_API_KEY) {
            console.error('YouTube API key not found in .env');
            return [];
        }
        const channelResp = await axios_1.default.get('https://www.googleapis.com/youtube/v3/channels', {
            params: {
                part: 'contentDetails',
                id: CHANNEL_ID,
                key: YOUTUBE_API_KEY,
            },
        });
        if (!channelResp.data.items || channelResp.data.items.length == 0) {
            console.error('Channel not found');
            return [];
        }
        const uploadsPlaylistId = channelResp.data.items[0].contentDetails.relatedPlaylists.uploads;
        const playlistResp = await axios_1.default.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
            params: {
                part: 'snippet',
                playlistId: uploadsPlaylistId,
                maxResults: 20, // More just to filter, can change if u want
                key: YOUTUBE_API_KEY,
            }
        });
        // Filter for "Sunday Service" and get first 6 vids
        const sundayServiceVideos = playlistResp.data.items
            .filter((item) => {
            const title = item.snippet.title;
            return title.toLowerCase().startsWith('sunday service');
        })
            .slice(0, 6)
            .map((item) => {
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
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Youtube API Error: ', error.response?.data || error.message);
        }
        else {
            console.error('Error fetching YouTube videos', error);
        }
        return [];
    }
};
exports.fetchSermonsFromYouTube = fetchSermonsFromYouTube;
const getVideos = async (_req, res) => {
    try {
        // If sermons alr. cached, return them
        if (exports.sermons.length > 0) {
            res.send(exports.sermons);
            return;
        }
        // Otherwise fetch
        exports.sermons = await (0, exports.fetchSermonsFromYouTube)();
        res.send(exports.sermons);
    }
    catch (error) {
        console.error('Error in getVideos() function', error);
        res.status(500).send({ error: 'Failed to fetch videos' });
    }
};
exports.getVideos = getVideos;
// Optional: Periodically refresh sermons (every hour)
setInterval(async () => {
    try {
        const newSermons = await (0, exports.fetchSermonsFromYouTube)();
        if (newSermons.length > 0) {
            exports.sermons = newSermons;
            console.log('Sermons cache refreshed at', new Date().toISOString());
        }
    }
    catch (error) {
        console.error('Error refreshing sermons cache:', error);
    }
}, 60 * 60 * 1000); // 1 hour
// Initialize sermons cache on startup
(0, exports.fetchSermonsFromYouTube)().then((initialSermons) => {
    exports.sermons = initialSermons;
    console.log('Initial sermons loaded:', exports.sermons.length);
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBQzFCLG9EQUE0QjtBQUU1Qiw4REFBOEQ7QUFDOUQsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQTBCaEIsNEJBQTRCO0FBQzVCLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxJQUFJLEVBQUUsQ0FBQztBQUMxRCxNQUFNLFVBQVUsR0FBRywwQkFBMEIsQ0FBQztBQUU5Qyw4Q0FBOEM7QUFDbkMsUUFBQSxNQUFNLEdBQVk7SUFDM0I7UUFDRSxLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLEtBQUssRUFBRSxLQUFLO1FBQ1osR0FBRyxFQUFFLElBQUk7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixXQUFXLEVBQUUsNEdBQTRHO0tBQzFIO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsYUFBYTtRQUNwQixLQUFLLEVBQUUsS0FBSztRQUNaLEdBQUcsRUFBRSxJQUFJO1FBQ1QsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsbUJBQW1CO1FBQ3pCLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSxrRUFBa0U7S0FDaEY7SUFDRDtRQUNFLEtBQUssRUFBRSx1QkFBdUI7UUFDOUIsS0FBSyxFQUFFLEtBQUs7UUFDWixHQUFHLEVBQUUsSUFBSTtRQUNULElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLFdBQVcsRUFBRSwyRUFBMkU7S0FDekY7SUFDRDtRQUNFLEtBQUssRUFBRSx1QkFBdUI7UUFDOUIsS0FBSyxFQUFFLEtBQUs7UUFDWixHQUFHLEVBQUUsSUFBSTtRQUNULElBQUksRUFBRSxN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