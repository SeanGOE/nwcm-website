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

    document.querySelectorAll('.pastor-card, .staff-member').forEach(el => observer.observe(el));
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