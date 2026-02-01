import React, { Component, JSX } from 'react';
import "./css/Global.css";
import "./css/SermonPage.css";

type SermonsProps = {
    renderTopBar: () => JSX.Element;
    renderBottomMenu: () => JSX.Element;
};

type SermonsState = {
  sermons: Sermon[]
};

type Sermon = {
    title: string;
    date: string;
    speaker: string;
    videoId: string; // YouTube video ID
    thumbnail?: string;
    series?: string;
};

export class SermonsPage extends Component<SermonsProps, SermonsState> {
  constructor(props: SermonsProps) {
    super(props);
    this.state = {
      sermons: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchVideos();
  };

  fetchVideos = () => {
    fetch('/api/videos')
      .then((res) => this.doFetchVideosResp(res))
      .catch((error) => console.error('Error fetching videos: ', error));
  };

  doFetchVideosResp = (res: Response) => {
    if (res.status === 200) {
      res.json().then((data) => this.doFetchVideosJson(data))
        .catch((error) => console.error('Error parsing videos JSON: ', error));
    } else {
      console.error('Failed to fetch videos: ', res.statusText);
    }
  };

  doFetchVideosJson = (data: unknown) => {
    const sermons = this.doParseVideos(data);
    this.setState({ sermons: sermons });
  };

  doParseVideos = (data: unknown) => {
    if (!Array.isArray(data)) {
      throw new Error('Invalid videos format');
    }

    const list: Sermon[] = [];
    for (const video of data) {
      if (video == null || typeof video !== 'object' || !video.title || video.date == null || video.speaker == null || video.videoId == null) {
        throw new Error('Invalid video object');
      }
      list.push({
        title: video.title,
        date: video.date,
        speaker: video.speaker,
        videoId: video.videoId,
        thumbnail: video.thumbnail,
        series: video.series
      });
    }
    return list;
  }

  render = (): JSX.Element => {
    return <div className="sermons_page">
        {this.props.renderTopBar()}
        
        <div className="hero-section">
            <img className="hero-img" src="img/PASTOR_SERMON.JPG" alt="Pastor preaching"></img>
            <div className="hero-overlay">
                <h1>Sermons</h1>
                <p>Watch our past messages</p>
            </div>
        </div>

        <div className="sermons-container">
            <div className="sermons-intro">
                <h2>Recent Messages</h2>
                <p>Catch up on messages you may have missed or revisit your favorites. All sermons are available on our YouTube channel.</p>
            </div>

            <div className="sermons-grid">
                {this.state.sermons.map((sermon, index) => (
                    <div key={index} className="sermon-card">
                        <a 
                            href={`https://www.youtube.com/watch?v=${sermon.videoId}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="sermon-thumbnail-link"
                        >
                            <div className="sermon-thumbnail">
                                <img 
                                    src={`https://img.youtube.com/vi/${sermon.videoId}/maxresdefault.jpg`}
                                    alt={sermon.title}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${sermon.videoId}/mqdefault.jpg`;
                                    }}
                                />
                                <div className="play-overlay">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="30px" height="30px">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                            </div>
                        </a>
                        <div className="sermon-info">
                            {sermon.series && <span className="sermon-series">{sermon.series}</span>}
                            <h3>{sermon.title}</h3>
                            <p className="sermon-speaker">{sermon.speaker}</p>
                            <p className="sermon-date">{sermon.date}</p>
                            <a 
                                href={`https://www.youtube.com/watch?v=${sermon.videoId}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="watch-button"
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="subscribe-section">
                <div className="subscribe-content">
                    <h2>Never Miss a Message</h2>
                    <p>Subscribe to our YouTube channel to get notified of new sermons</p>
                    <a 
                        href="https://www.youtube.com/@networkcmusa" 
                        target="_blank" 
                        rel="noreferrer"
                        className="subscribe-button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="1.2em" fill="currentColor">
                            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                        </svg>
                        Subscribe on YouTube
                    </a>
                </div>
            </div>
        </div>

        {this.props.renderBottomMenu()}
    </div>;
  }
}
