import React from "react";
import './Projects.css';
import searchEngineImg from '../Assets/search_engine.jpg';
import serenity_hub from '../Assets/serenity_hub.png';
import tictactoe from '../Assets/tictactoe.png';

const projectsData = [
    {
        id: 1,
        title: "Portfolio Website",
        description: "My personal portfolio website built with React, featuring a responsive design and modern UI elements.",
        image: "https://picsum.photos/800/600?random=1", // We'll update this once you add a portfolio image
        tags: ["React", "CSS", "JavaScript"],
        links: {
            github: "https://github.com/Poushali-02/Portfolio",
        }
    },
    {
        id: 2,
        title: "AI Search Engine",
        description: "A search engine that uses AI to provide relevant results based on user queries.",
        image: searchEngineImg,
        tags: ["Flask", "JavaScript", "Api keys"],
        links: {
            github: "https://github.com/Poushali-02/ai-search-engine",
        }
    },
    {
        id: 3,
        title: "Serenity Hub",
        description: "Project created for Binary 2025, based on reducing work pressure and increasing productivity. It includes a game section, a music and a chatbot section.",
        image: serenity_hub, // We'll update this once you add a portfolio image
        tags: ["Flask", "JavaScript", "Api keys", "css"],
        links: {
            github: "https://github.com/Poushali-02/Serenity-Hub",
        }
    },
    {
        id: 4,
        title: "Tic-tac_toe",
        description: "Very basic Tic-tac_toe game created using HTML, CSS and JavaScript.",
        image: tictactoe,
        tags: ["html", "css", "JavaScript"],
        links: {
            github: "https://github.com/Poushali-02/Tic-Tac-Toe",
        }
    },
];

const Projects = () => {

    const projectElements = [];
    for (let i = 0; i < projectsData.length; i++){
        const project = projectsData[i];
        const tagElements = [];
        for (let j=0; j < project.tags.length; j++){
            tagElements.push(
                <span key={j} className="project-tag">
                    {project.tags[j]}
                </span>
            );
        }
        projectElements.push(
            <div key={project.id} className="project-card"> 
                <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                />
                <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-tags">
                        {project.tags.map((tag, index) => (
                            <span key={index} className="project-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                                
                    <p className="project-description">
                        {project.description}
                    </p>
                                
                    <div className="project-links">
                        <a 
                            href={project.links.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='projects'>
            <h2>My Projects</h2>
            <div className="projects-grid">
                {projectElements}
            </div>
        </div>
    );
};

export default Projects;