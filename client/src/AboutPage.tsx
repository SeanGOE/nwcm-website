import React, { Component, JSX } from 'react';
import "./css/Global.css";
import "./css/AboutPage.css";

export type Staff = {
  name: string;
  role: string;
  img: string;
  description: string;
}

type AboutProps = {
    renderTopBar: () => JSX.Element;
    renderBottomMenu: () => JSX.Element;
};

type AboutState = {
  selectedStaff: Staff | null;
};

type Belief = {
  title: string;
  description: string;
  verses: { reference: string; text: string }[];
};

export class AboutPage extends Component<AboutProps, AboutState> {
  constructor(props: AboutProps) {
    super(props);
    this.state = {
      selectedStaff: null
    };
  }

  componentDidMount() {
    // Check if there's a hash in the URL and scroll to it
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.pastor-card, .staff-member, .belief-card').forEach(el => observer.observe(el));
  }

    // Open staff detail modal
    openStaffModal = (staff: Staff) => {
      this.setState({ selectedStaff: staff });
    };

    closeStaffModal = () => {
      this.setState({ selectedStaff: null });
    }

    renderStaffModal = (): JSX.Element | null => {
      const { selectedStaff } = this.state;

      if (!selectedStaff) {
        return null;
      }

      return (
        <div className="modal-overlay" onClick={this.closeStaffModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={this.closeStaffModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <div className="modal-img-container">
              <img src={selectedStaff.img} alt={selectedStaff.name}></img>
            </div>
            <div className="modal-info-container">
              <h2 className="modal-staff-name">{selectedStaff.name}</h2>
              <p className="modal-staff-role">{selectedStaff.role}</p>
              <p className="modal-staff-description">{selectedStaff.description}</p>
            </div>
          </div>
        </div>
      )
    }

    renderBeliefs = (): JSX.Element => {
      const beliefs: Belief[] = [
        {
          title: "Bible",
          description: "We believe the entire Bible is the inspired Word of God and that men were moved by the Spirit of God to write the very words of Scripture. Therefore, we believe the Bible is without error.",
          verses: [
            { reference: "2 Timothy 3:16", text: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness." }
          ]
        },
        {
          title: "God",
          description: "We believe in one God who exists in three distinct persons: Father, Son, and Holy Spirit. We believe that Jesus Christ is the only begotten Son of the Father, conceived of the Holy Spirit, and born of the Virgin Mary. We believe that Jesus Christ became flesh to reveal God to man and to become the Savior of this sinful world. That Jesus was crucified, buried, and raised from the dead. That He ascended to Heaven and is today at the right hand of the Father as our intercessor.",
          verses: [
            { reference: "Matthew 28:19", text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." }
          ]
        },
        {
          title: "Man",
          description: "We believe that mankind was created in the image of God to have fellowship with Him but became alienated in that relationship through sinful disobedience. As a result, man is incapable of regaining a right relationship with God through his own effort alone. All have sinned and have fallen short of the glory of God.",
          verses: [
            { reference: "Genesis 1:26a", text: "Then God said, \"Let us make mankind in our image, in our likeness.\"" },
            { reference: "Romans 3:23", text: "For all have sinned and fall short of the glory of God." }
          ]
        },
        {
          title: "God's Plan of Salvation",
          description: "We believe that the blood of Jesus Christ, shed on the cross, provides the sole basis for the forgiveness of sin. Therefore, salvation occurs only when people place their faith in the death and resurrection of Christ as sufficient payment for their sin.",
          verses: [
            { reference: "Romans 6:23", text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord." },
            { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." }
          ]
        },
        {
          title: "Holy Living",
          description: "Holiness is to be God's standard of living for His people. We believe that every Christian should live for Christ and not for himself. By obedience to the Word of God and daily yielding to the Spirit of God, every believer should mature and be conformed to the image of Christ.",
          verses: [
            { reference: "1 Thessalonians 4:7", text: "For God did not call us to be impure, but to live a holy life." },
            { reference: "1 Peter 1:15-16", text: "But just as he who called you is holy, so be holy in all you do; for it is written: \"Be holy, because I am holy.\"" }
          ]
        },
        {
          title: "Church",
          description: "We believe that the church is the body of Christ, of which Jesus Christ is the head. The members of the church are those who have trusted by faith the finished work of Christ. The purpose of the church is to glorify God by loving Him and by making Him known to the world. We believe that every member of the church is divinely gifted by the Holy Spirit to play a special role in the Christian community.",
          verses: [
            { reference: "Colossians 1:18", text: "And he is the head of the body, the church; he is the beginning and the firstborn from among the dead, so that in everything he might have the supremacy." },
            { reference: "1 Corinthians 12:4-7", text: "There are different kinds of gifts, but the same Spirit distributes them. There are different kinds of service, but the same Lord. There are different kinds of working, but in all of them and in everyone it is the same God at work. Now to each one the manifestation of the Spirit is given for the common good." }
          ]
        },
        {
          title: "Sacraments",
          description: "We believe in water baptism by immersion, and all who repent should be baptized in the name of the Father, and of the Son, and of the Holy Spirit. We also believe in remembering Christ's love for us manifested on the cross through the Lord's Supper.",
          verses: [
            { reference: "Matthew 28:19", text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." },
            { reference: "1 Corinthians 11:23-25", text: "For I received from the Lord what I also passed on to you: The Lord Jesus, on the night he was betrayed, took bread, and when he had given thanks, he broke it and said, \"This is my body, which is for you; do this in remembrance of me.\" In the same way, after supper he took the cup, saying, \"This cup is the new covenant in my blood; do this, whenever you drink it, in remembrance of me.\"" }
          ]
        },
        {
          title: "End Time Events",
          description: "We believe in the Second Coming of Jesus Christ. In the bodily resurrection of the saints of God; eternal life for the righteous in a Heavenly Kingdom, and eternal punishment for the wicked.",
          verses: [
            { reference: "Matthew 24:30-31", text: "Then will appear the sign of the Son of Man in heaven. And then all the peoples of the earth will mourn when they see the Son of Man coming on the clouds of heaven, with power and great glory. And he will send his angels with a loud trumpet call, and they will gather his elect from the four winds, from one end of the heavens to the other." },
            { reference: "1 Thessalonians 4:16-17", text: "For the Lord himself will come down from heaven, with a loud command, with the voice of the archangel and with the trumpet call of God, and the dead in Christ will rise first. After that, we who are still alive and are left will be caught up together with them in the clouds to meet the Lord in the air. And so we will be with the Lord forever." }
          ]
        }
      ];

      return (
        <div className="beliefs-section" id="beliefs">
          <h2 className="beliefs-header">Our Doctrinal Beliefs</h2>
          <div className="beliefs-grid">
            {beliefs.map((belief, index) => (
              <div key={index} className="belief-card">
                <h3 className="belief-title">{belief.title}</h3>
                <p className="belief-description">{belief.description}</p>
                <div className="belief-verses">
                  {belief.verses.map((verse, vIndex) => (
                    <div key={vIndex} className="belief-verse">
                      <span className="verse-reference">{verse.reference}</span>
                      <span className="verse-text">{verse.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

  render = (): JSX.Element => {
    const pastor = {
      name: "Dino Miciano",
      role: "Pastor",
      description: "Pastor Dino leads Network Christian Ministries with a clear mission: connecting people to God and to one another. Through biblical teaching and compassionate leadership, he helps believers deepen their faith while fostering authentic relationships that reflect Christ's love.",
      img: "img/pastor.jpeg"
    };

    const staffMembers: Staff[] = [
      { name: "Neo Miciano", role: "Worship Ministry", img: "img/neo.jpeg", description: "Facilitates corporate worship by leading congregations in song, prayer, and scripture, aimed at pointing people to God, deepening their faith, and fostering an atmosphere for experiencing His presence. " },
      { name: "Brenda Pagdilao", role: "Outreach Ministry", img: "img/brenda.jpeg", description: "Extends a church's love, service, and message beyond its walls to the local community and world, often serving as the \"hands and feet\" of Jesus. It focuses on meeting physical, emotional, and spiritual needs through acts of service, relationship building, and, in some contexts, sharing the gospel." },
      { name: "John Pagdilao", role: "Administration", img: "img/john.jpeg", description: "Planning, organizing, and coordinating the logistics Church events and activities.Handle tasks like financial budgeting, facility and maintenance."},
      { name: "Eddie Eglip", role: "Media", img: "img/eddie.jpeg", description: "Manages the technical and creative aspects of a church's communication, primarily using audio, video, and digital technology to spread the Gospel, enhance worship, and extend outreach beyond physical church walls. Responsibilities include live streaming services, managing sound, creating video content, social media management, and producing digital media and graphics." },
      { name: "Lani Alagcan Pajarillaga", role: "Children's Ministry", img: "/img/lani.jpg", description: "Provides a safe, age-appropriate environment to teach biblical foundations, foster spiritual growth, and model Christian community. Teaching Bible stories and aimed at helping children understand the Bible, experience God's love, and build lasting faith." },
      { name: "Joey Sumabat", role: "Men's Ministry", img: "img/joey.jpeg", description: "Focus on cultivating spiritual, mental, and emotional growth in men through discipleship, fellowship, and service. Key responsibilities include mentoring, fostering accountability, and organizing service projects to meet the needs of the church and community." },
      { name: "Helen Eglip & Annie Specker", role: "Women's Ministry", img: "img/helen_annie.jpg", description: "Serves to foster spiritual growth, emotional support, and community among women within a church, typically focusing on Bible study, discipleship, mentorship, and fellowship. It addresses the unique needs of women, providing a space for fellowship, prayer, and service while encouraging them to use their spiritual gifts for the church and community." },
      { name: "David Applestone", role: "Hospitality", img: "img/david.jpeg", description: "Creates a welcoming, warm, and safe atmosphere for church attendees, particularly guests, to experience God. Responsibilities include greeting, ushering, managing parking, guiding seating, providing information, all aimed at fostering a sense of belonging and connecting newcomers to the community." },
    ];

    return <div className="about_page">
        {this.props.renderTopBar()}
        
        <div className="hero-section">
            <img className="hero-img" src="img/IMG_1357.JPG" alt="Church community"></img>
            <div className="hero-overlay">
                <h1>About Us</h1>
            </div>
        </div>

        <div className="about-section">
            <div className="about-content">
                <h2>Our Mission</h2>
                <p>Network Christian Ministries is a non-denominational Christian organization that seeks to connect people to God and to one another. We believe that God is love and that we are called to love one another as God loves us. We are committed to serving the community and spreading the good news of Jesus Christ.</p>
            </div>
        </div>

        {/* Doctrinal Beliefs Section */}
        {this.renderBeliefs()}

        {/* Combined Staff Section */}
        <div className="team-section">
            <h2 className="team-header">Our Staff</h2>
            
            {/* Pastor Card */}
            <div className="pastor-card">
                <div className="pastor-img-container">
                    <img src={pastor.img} alt={pastor.name}></img>
                </div>
                <div className="pastor-info">
                    <h3>{pastor.name}</h3>
                    <p className="pastor-role">{pastor.role}</p>
                    <p className="pastor-description">{pastor.description}</p>
                </div>
            </div>

            {/* Staff Grid */}
            <div className="staff-grid">
                {staffMembers.map((member, index) => (
                    <div key={index} className="staff-member" onClick={() => this.openStaffModal(member)} style={{ cursor: 'pointer' }}>
                        <div className="staff-member-img-container">
                            <img src={member.img} alt={member.name}></img>
                        </div>
                        <div className="staff-member-info">
                            <h3>{member.name}</h3>
                            <p className="staff-member-role">{member.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        {this.renderStaffModal()}
        {this.props.renderBottomMenu()}
    </div>;
  }
}