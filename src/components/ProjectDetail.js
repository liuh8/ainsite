import React from 'react';
import Image from 'next/image';

const ProjectDetails = ({ projects, selectedProject }) => {
  return (
    <div className="space-y-6">
      {Object.keys(projects).map((category) => (
        <section
          key={category}
          id={category.replace(/\s+/g, '-').toLowerCase()}
          className="mb-12"
        >
          {projects[category].map((project) => (
            <div
                key={project.projectId}
                id={project.projectId}
                className={`bg-primary-light p-6 rounded-lg mb-6 transition-opacity duration-500 ease-in-out 
                    ${selectedProject && selectedProject.projectId === project.projectId
                    ? 'shadow-lg'
                    : ''
                    }`}
            >

              {/* Project Title */}
              <h4 className="text-2xl md:text-3xl font-semibold mb-2 text-foreground">
                {project.title}
              </h4>

              {/* Position, Company, City, Datetime */}
              <p className="text-lg mb-2 text-gray-300">
                <strong>{project.role}</strong> | {project.company}, {project.location} |{' '}
                {project.dates}
              </p>
              {/* Optional Picture */}
              {project.image && (
                <div className="mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
              )}
              {/* Description */}
              <div className="text-lg mb-4 text-gray-300">
                {project.description && (
                  <ul className="list-disc list-inside">
                    {project.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Tech stack */}
              {project.techStack && (
                <div className="mb-4">
                  <h5 className="text-xl font-semibold text-foreground">Tech Stack:</h5>
                  <ul className="list-disc list-inside text-gray-300">
                    {project.techStack.map((tech, idx) => (
                      <li key={idx}>{tech}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Publish date */}
              {project.date && (
                <p className="text-sm text-gray-400 mb-4">Published: {project.date}</p>
              )}

              {/* Project link (optional) */}
              {project.link && (
                <a
                  href={project.link}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default ProjectDetails;