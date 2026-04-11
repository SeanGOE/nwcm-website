"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideos = exports.fetchSermonsFromYouTube = exports.getEvents = exports.sermons = exports.events = void 0;
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Load environment variables (currently only YouTube API key)
dotenv_1.default.config();
// YouTube API Configuration
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';
const CHANNEL_ID = 'UCCwFCo6kWkNaeIHdeP_XOGw';
// Example: Array of events with various dates
exports.events = [];
exports.sermons = [];
const router = express_1.default.Router();
const getEvents = (_req, res) => {
    try {
        const filePath = path_1.default.join(__dirname, "events", "events.json");
        const data = fs_1.default.readFileSync(filePath, "utf-8");
        const events = JSON.parse(data);
        res.send(events);
    }
    catch (error) {
        console.error("Error reading events.json:", error);
        res.status(500).send({ error: "Failed to load events" });
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBQzFCLG9EQUE0QjtBQUM1Qiw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBRXhCLDhEQUE4RDtBQUM5RCxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBMEJoQiw0QkFBNEI7QUFDNUIsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLElBQUksRUFBRSxDQUFDO0FBQzFELE1BQU0sVUFBVSxHQUFHLDBCQUEwQixDQUFDO0FBRTlDLDhDQUE4QztBQUNuQyxRQUFBLE1BQU0sR0FBWSxFQUU1QixDQUFDO0FBRVMsUUFBQSxPQUFPLEdBQWEsRUFFOUIsQ0FBQztBQUVGLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFekIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxJQUFpQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUN0RSxJQUFJLENBQUM7UUFDSCxNQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDL0QsTUFBTSxJQUFJLEdBQUcsWUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtB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