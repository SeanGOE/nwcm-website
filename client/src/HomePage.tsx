import React, { Component, JSX } from 'react';
import "./css/Global.css";
import "./css/HomePage.css"

type HomeProps = {
    renderTopBar: () => JSX.Element;
    renderBottomMenu: () => JSX.Element;
};

type HomeState = {
    currentImg: number;
    nextImg: number;
    swipe: boolean;
};


/** Top-level component that performs login and navigation. */
export class HomePage extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      currentImg: 0,
      nextImg: 1,
      swipe: false
    };
  }

    componentDidMount = (): void => {
        window.scrollTo(0, 0);
        
        const sundayHeading = document.querySelector('.sundays-content');
        const beliefsHeading = document.querySelector('.beliefs-content');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible'); // Add the 'visible' class
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the element is visible
        );



        if (sundayHeading) {
            observer.observe(sundayHeading);
        }

        if (beliefsHeading) {
            observer.observe(beliefsHeading);
        }
    
        this.imgInterval = setInterval(() => {
        this.setState({ swipe: true });
        setTimeout(() => {
            this.setState(prev => ({
                currentImg: (prev.currentImg + 1) % 4,
                nextImg: (prev.currentImg + 2) % 4,
                swipe: false
            }));
        }, 0);
        }, 3000);
    }

    componentWillUnmount() {
      clearInterval(this.imgInterval);
    }

    imgInterval: NodeJS.Timeout | undefined;

    render = (): JSX.Element => {
        const images = ["img/IMG_1101.JPG", "img/GROUP_PHOTO_SMILE.JPG", "img/WORSHIP_GROUP.JPG", "img/MOTHERS_DAY.JPG"];
        return <div className="home_page">
            <div className="main-photo">
                {this.props.renderTopBar()}
                <div className="overall-container">
                    <div className ="swipe-container">
                        <img src={images[this.state.currentImg]}/>
                        <img src={images[(this.state.nextImg)]}/>
                        
                        <div className="goal">
                    </div>
                    <p className="quote">"Connecting People to<br></br>God and to One-Another"<br></br>- Matthew 22:37-40</p>
                </div>
                </div>
                <div className="socials">
                    <ul className="wrapper">
                    <a href="https://www.facebook.com/groups/NetWorkChristianMinistries/" target="_blank" rel="noreferrer">
                        <li className="icon facebook">
                        <span className="tooltip">Facebook</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1.2em" viewBox="0 0 320 512">
                            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                        </svg>
                        </li>
                        </a>
                        <a href="https://www.youtube.com/@networkcmusa" target="_blank" rel="noreferrer">
                        <li className="icon youtube">
                        <span className="tooltip">YouTube</span>
                        <svg className="youtube" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"  height="1.2em">
                            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                        </svg>
                        </li>
                        </a>
                        <a href="https://www.instagram.com/networkcmusa/" target="_blank" rel="noreferrer">
                            <li className="icon instagram">
                            <span className="tooltip">Instagram</span>
                            <svg viewBox="0 0 16 16" className="bi bi-instagram" fill="currentColor" height="1.2em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                            </svg>
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
            <div className="home-info-section">
                <div className="home-info-img">
                    <img src="img/IMG_1379.JPG" alt="icon" />
                    <img src="img/IMG_1030.JPG" alt="icon" />
                </div>
                <div className="home-info-content">
                    <h1>Welcome to <br></br>Network Christian Ministries!</h1>
                    <p>For over 30 years, Network Christian Ministries has been committed to declaring the gospel, developing disciples, demonstrating mercy, and deploying leaders for the good of our city and beyond. Whether you’ve been part of the community for years, are new to the area, or are simply exploring faith, we invite you to continue this journey of renewal with us as we grow deeper in Christ together.</p>
                </div>
            </div>
            {/* <div className="sundays">
                <div className="sundays-content">
                    <h1>Sundays</h1>
                    <p>Join us for Sunday Service at 10:00 AM</p>
                    <p>Location: <a href="https://maps.app.goo.gl/eGr4cpGSASAzue368" target="_blank" rel="noreferrer">Shoreline Elks Lodge</a></p>
                    <p>We would love to have you join us!</p>
                </div>
                <img src="img/IMG_1379.JPG" alt="icon" />
            </div>
            <div className="beliefs">
                <img src="img/IMG_1030.JPG" alt="icon" />
                <div className="beliefs-content">
                    <h1>Beliefs</h1>
                    <p>We are a Christian Community whose vision is to:</p>
                    <ul>
                        <li>Honor God in all we do</li>
                        <li>Serve mankind by being an extension of God's love to all</li>
                        <li>Build a cross-cultural, multi-generational and Godly community under the leadership of Jesus Christ.</li>
                    </ul>
                </div>
            </div> */}
            {this.props.renderBottomMenu()}
      </div>;
    }

}