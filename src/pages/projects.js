import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import projects from '../data/project_data';
import Timeline from '../components/Timeline';
import ProjectDetails from '../components/ProjectDetail';

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const sectionRefs = useRef({});

    useEffect(() => {
        const firstCategory = Object.keys(projects)[0];
        if (projects[firstCategory].length > 0) {
            setSelectedProject(projects[firstCategory][0]);
        }
    }, []);

    useEffect(() => {
        Object.keys(projects).forEach((category) => {
            projects[category].forEach((project) => {
                sectionRefs.current[project.projectId] = document.getElementById(project.projectId);
            });
        });
    }, []);

    //handle highlight position
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollPosition = scrollY + 100;
            let currentProjectId = null;
            const projectsInView = Object.keys(sectionRefs.current)
                .map(projectId => {
                    const section = sectionRefs.current[projectId];
                    if (section) {
                        const { offsetTop } = section;
                        return { projectId, offsetTop };
                    }
                    return null;
                })
                .filter(Boolean)
                .sort((a, b) => a.offsetTop - b.offsetTop);

            if (scrollY < 100 && projectsInView.length > 0) {
                currentProjectId = projectsInView[0].projectId;
            } else {
                for (let i = 0; i < projectsInView.length; i++) {
                    const { projectId, offsetTop } = projectsInView[i];
                    if (scrollPosition >= offsetTop) {
                        currentProjectId = projectId;
                    } else {
                        break;
                    }
                }
            }
            if (currentProjectId) {
                const project = Object.values(projects)
                    .flat()
                    .find(proj => proj.projectId === currentProjectId);
                if (project && selectedProject?.projectId !== project.projectId) {
                    setSelectedProject(project);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        //set selectedProject
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [selectedProject]);

    return (
        <div className="min-h-screen bg-background text-foreground px-6 md:px-20 lg:px-40 py-8 flex flex-col">
            <Head>
                <title>My Projects</title>
            </Head>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center text-foreground">
                My Projects
            </h2>
            <div className="flex flex-col md:flex-row flex-grow">
                <div className="md:w-1/3 w-full md:pr-8 mb-8 md:mb-0">
                    <div className="md:sticky md:top-4">
                        <Timeline
                            projects={projects}
                            selectedProject={selectedProject}
                            setSelectedProject={setSelectedProject}
                        />
                    </div>
                </div>

                <div className="md:w-2/3 w-full overflow-auto">
                    <ProjectDetails projects={projects} selectedProject={selectedProject} />
                </div>
            </div>
        </div>
    );
}