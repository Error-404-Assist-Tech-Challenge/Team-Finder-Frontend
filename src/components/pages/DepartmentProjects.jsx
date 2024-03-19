/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState, useEffect } from 'react';
import DepartmentProjectsComp from '../pageComponents/DepartmentProjects';

export default function DepartmentProjects() {
    const axiosPrivate = useAxiosPrivate();
    const [projects, setProjects] = useState([])

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getDepartmentProjects = async () => {
            try {
                const response = await axiosPrivate.get('department/projects', {
                    signal: controller.signal,
                    withCredentials: true
                });
                // console.log('Department projects:', response.data);
                isMounted && setProjects(response.data)
            } catch (error) {
                console.error('Error fetching department projects:', error);
            }
        }

        getDepartmentProjects();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <>
            <DepartmentProjectsComp projects={projects} setProjects={setProjects} />
        </>
    )
}