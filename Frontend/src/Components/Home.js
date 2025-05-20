import React from "react";
import './Home.css';

const Home = () => {
    return (
        <div className="hero">
            <div className = 'hero-content'>
                <h1>Hello, I'm Poushali</h1>
                <h2 className='typewriter'>
                    I'm a <span className="typewriter-text">Machine Learning and AI Developer</span>
                </h2>
                <p className="description">
                    A passionate developer interested in Machine Learning, Artificial Intelligence, Deep Learning and also web technology
                </p>

                <div className='cta-buttons'>
                    
                </div>
            <div className="social-links">
                <a 
                    href="https://github.com/Poushali-02" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link"
                >
                    GitHub
                </a>
                <a 
                    href="https://www.linkedin.com/in/poushali-bhattacharyya-555238342/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link"
                >
                    LinkedIn
                </a>
                <a 
                    href="/resume.pdf" 
                    className="social-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                        Download Resume
                    </a>
            </div>
        </div>
        <div className="tech-stack">
                <h3>Tech Stack</h3>
                <div className="tech-icons">
                    {/* Add your technology icons here */}
                    <i className="fab fa-python" title="Python"></i>
                    <i className="fab fa-react" title="React"></i>
                    <i className="fab fa-js" title="JavaScript"></i>
                    <i className="fab fa-html5" title="HTML5"></i>
                    <i className="fab fa-css3-alt" title="CSS3"></i>
                    <i className="fab fa-git-alt" title="Git"></i>
                    <i className="fab fa-github" title="GitHub"></i>
                    <i className="fas fa-database" title="SQL/Databases"></i>
                    <i className="fas fa-brain" title="Machine Learning/AI"></i>
                {/* Add more tech icons */}
                </div>
        </div>
        <div className="scroll-indicator" />
    </div>
    );
};

export default Home;