import React from "react";
import './Home.css';

const Home = () => {
    return (
        <div className="hero">
            <h1>Hello, I'm Poushali</h1>
            <p>A passionate developer interested in Machine Learning, Artificial Intelligence, Deep Learning and also web technology</p>
            
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
            </div>
            
            <div className="scroll-indicator" />
        </div>
    );
};

export default Home;