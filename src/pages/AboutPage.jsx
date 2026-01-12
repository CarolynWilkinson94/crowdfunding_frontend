import "./AboutPage.css";

export default function aboutPage() {
    return(
        <div className="about-page">
            <div className="about-hero">
                <h1 className="about-title">Welcome to Tunes for Change</h1>
                <p className="about-intro">
                    Tunes for change aims to pair underprivileged children with musical educators and community musicians who will donate their time to help realise their musical dreams and ideas through online collaboration.
                </p>
            </div>
            
            <div className="about-content">
                <div className="about-section">
                    <h2>Who are we?</h2>
                    <p>
                        We are a community-driven platform dedicated to connecting aspiring young musicians with experienced educators and mentors. Our mission is to break down barriers to musical education and provide opportunities for underprivileged children to explore their musical potential.
                    </p>
                </div>

                <div className="about-section">
                    <h2>How can I get involved?</h2>
                    <p>
                        If you are a musician or teacher who would like to volunteer with Tunes for Change, browse the 'Home' page to find student projects that you would like to pledge your time towards.
                    </p>
                </div>

                <div className="about-section">
                    <h2>How can I post an idea?</h2>
                    <p>
                        If you would like to receive volunteer help with a musical idea or project, create an account and login, then visit the 'Create Fundraiser' page and fill in the form to create your project.
                    </p>
                </div>
            </div>
        </div>
    )
}