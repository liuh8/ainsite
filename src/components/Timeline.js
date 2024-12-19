import React from 'react';

const Timeline = ({ projects, selectedProject, setSelectedProject }) => {
    const handleProjectClick = (project) => {
        const element = document.getElementById(project.projectId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setSelectedProject(project);
    };

    const handleCategoryClick = (category) => {
        const categoryId = category.replace(/\s+/g, '-').toLowerCase();
        const element = document.getElementById(categoryId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="w-full">
            {Object.keys(projects).map((category, idx) => (
                <div key={idx} className="mb-8">
                    <h3
                        className="text-xl font-semibold mb-4 cursor-pointer text-primary hover:underline"
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </h3>
                    <ul>
                        {projects[category].map((project) => (
                            <li key={project.projectId} className="mb-2">
                                <button
                                    onClick={() => handleProjectClick(project)}
                                    className={`text-left w-full px-4 py-2 rounded 
                                        ${selectedProject && selectedProject.projectId === project.projectId
                                            ? 'bg-primary text-foreground shadow-md transform scale-105'
                                            : 'text-foreground hover:bg-primary hover:text-background'
                                        } transition-all duration-200`}
                                    tabIndex="0"
                                    aria-pressed={selectedProject && selectedProject.projectId === project.projectId}
                                >
                                    {project.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default Timeline;