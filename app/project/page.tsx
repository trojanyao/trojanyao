import ProjectList from './components/ProjectList';
import { getProjects } from '@/lib/notion';

export default async function DevProjects() {
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}
