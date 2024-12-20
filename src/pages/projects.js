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
            const scrollPosition = scrollY + window.innerHeight;
            const bodyHeight = document.body.offsetHeight;

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

            const isAtBottom = scrollPosition >= bodyHeight - 2;
            if (isAtBottom && projectsInView.length > 0) {
                currentProjectId = projectsInView[projectsInView.length - 1].projectId;
            } else {
                if (scrollY < 100 && projectsInView.length > 0) {
                    currentProjectId = projectsInView[0].projectId;
                } else {
                    for (let i = 0; i < projectsInView.length; i++) {
                        const { projectId, offsetTop } = projectsInView[i];
                        if (scrollY + 100 >= offsetTop) {
                            currentProjectId = projectId;
                        } else {
                            break;
                        }
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
        <div className="min-h-screen bg-background text-foreground px-8 lg:px-24 py-12 flex justify-center">
            <Head>
                <title>AinSite - My Projects</title>
            </Head>
            <div className="flex w-full max-w-7xl">
                <div className="w-1/3 hidden lg:block lg:sticky lg:top-24 lg:self-start">
                    <Timeline
                        projects={projects}
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                    />
                </div>
                <div className="w-full lg:hidden mb-8">
                    <Timeline
                        projects={projects}
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                    />
                </div>
                <div className="w-full lg:w-2/3 lg:ml-8">
                    <ProjectDetails projects={projects} selectedProject={selectedProject} />
                </div>
            </div>
        </div>
    );
}