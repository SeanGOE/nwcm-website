import React, { Component, JSX } from 'react';
import "./css/Global.css";
import "./css/GivingPage.css";

type GiveProps ={
    renderTopBar: () => JSX.Element;
    renderBottomMenu: () => JSX.Element;
};

type GiveState = {};

export class GivingPage extends Component<GiveProps, GiveState> {
    constructor(props: GiveProps) {
        super(props);
    }

    componentDidMount(): void {
        window.scrollTo(0, 0);
    }

    render = (): JSX.Element => {
        const givingOptions = [
        {
            icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48px" height="48px">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            ),
            method: "Mail",
            title: "Give by Mail",
            description: "Send your check or money order to:",
            details: (
            <>
                <p><strong>Network Christian Ministries</strong></p>
                <p>P.O. Box 55241</p>
                <p>Shoreline, WA 98155</p>
            </>
            )
        },
        {
            icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48px" height="48px">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
            </svg>
            ),
            method: "Venmo",
            title: "Give via Venmo",
            description: "Send your gift through Venmo:",
            details: (
            <>
                <p><strong>@NetworkCM</strong></p>
                <a href="https://venmo.com/NetworkCM" target="_blank" rel="noreferrer" className="giving-link">
                Open Venmo
                </a>
            </>
            )
        },
        {
            icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48px" height="48px">
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5c-.55 0-1-.45-1-1v-5h16v5c0 .55-.45 1-1 1zm1-10H4V6h16v2z"/>
            </svg>
            ),
            method: "Zelle",
            title: "Give via Zelle",
            description: "Send your gift through Zelle:",
            details: (
            <>
                <p><strong>networkchristianministries@gmail.com</strong></p>
                <p className="giving-note">Use this email in your Zelle app</p>
            </>
            )
        },
        {
            icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48px" height="48px">
                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.028.15a.805.805 0 0 1-.794.68H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502zm-2.96-5.09c.762.868.983 1.81.752 3.285-.019.123-.04.24-.062.36-.735 3.773-3.089 5.446-6.956 5.446H8.957c-.63 0-1.174.414-1.354 1.002l-.014-.002-.93 5.894H3.121a.051.051 0 0 1-.05-.06l2.598-16.448A.95.95 0 0 1 6.607 2h5.976c2.316 0 3.973.49 4.524 1.388z"/>
            </svg>
            ),
            method: "PayPal",
            title: "Give via PayPal",
            description: "Make a secure online donation:",
            details: (
            <>
                <a 
                href="https://www.paypal.com/donate/?hosted_button_id=7PEKKBC2QUXCN" 
                target="_blank" 
                rel="noreferrer" 
                className="giving-button"
                >
                Donate with PayPal
                </a>
            </>
            )
        }
        ];

        return (
            <>
                <div className="giving_page">
                    {this.props.renderTopBar()}
                    
                    <div className="giving-hero">
                        <div className="giving-hero-overlay">
                            <h1>Give</h1>
                        </div>
                    </div>

                    <div className="giving-worship-section">
                        <div className="giving-worship-content">
                            <h2>Giving is an Act of Worship</h2>
                            <p>
                                God invites us to worship Him in all areas of our lives, including the way
                                we spend our money. Today, more and more individuals and families are choosing
                                to give electronically. This free and convenient service simplifies the giving
                                process, and allows you to give 24/7. It's easy to start, change, or stop at any time.
                            </p>
                            <p>
                                We put our money where our heart is. Because it is an act of worship, God is
                                more interested in the shape of our heart than the size of our gift. This means
                                we should seek to give joyfully, generously, and sacrificially.
                            </p>
                        </div>
                    </div>
    
                    {/* Donation Options */}
                    <div className="giving-options-section">
                        <h2>Ways to Give</h2>
                        <div className="giving-options">
                            {givingOptions.map((option, index) => (
                                <div key={index} className="giving-option-card">
                                    <div className="giving-icon">{option.icon}</div>
                                    <h3>{option.title}</h3>
                                    <p className="giving-description">{option.description}</p>
                                    <div className="giving-details">{option.details}</div>
                                </div>
                            ))}
                        </div>
                        <div className="giving-footer">
                            <p>
                                Network Christian Ministries is a 501(c)(3) nonprofit organization. 
                                Your donation is tax-deductible to the extent allowed by law.
                            </p>
                        </div>
                    </div>
    
                    {/* Scripture Section */}
                    <div className="giving-scripture-card">
                        <div className="scripture-content">
                            <svg className="scripture-quote-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                            </svg>
                            <blockquote>
                                You must each decide in your heart how much to give. And don't give reluctantly 
                                or in response to pressure. For God loves a person who gives cheerfully.
                            </blockquote>
                            <cite>— 2 Corinthians 9:7</cite>
                        </div>
                    </div>
    
                    {this.props.renderBottomMenu()}
                </div>
            </>
        )
    }
}
