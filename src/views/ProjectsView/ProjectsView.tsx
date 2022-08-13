/** Interfaces/types */

/** components */
import { Container, VStack, Heading, HStack } from "@chakra-ui/react";
import { IProject, IProjectMeta } from "lib/interfaces/Prismic";
import { ProjectCard } from "./components";

interface IProjectsViewProps {
  projects: IProject[];
  meta: IProjectMeta;
  [rest: string]: any;
}

const ProjectsView = ({ projects, meta, ...rest }: IProjectsViewProps) => {
  const renderFeaturedProjects = () => {
    const featuredProjects = getProjectsFromOrder(
      projects,
      meta.project_order
    ).filter((project) => project.is_featured);

    return featuredProjects.map((project, i: number) => (
      <ProjectCard project={project} key={`project-card-${i}`} alt={!(i % 2)} />
    ));
  };

  return (
    <Container maxW="container.lg" h="100%" minH="100vh" {...rest}>
      <VStack spacing={2} align="flex-start" justifyContent="flex-start">
        <HStack
          w="100%"
          align="center"
          justifyContent="center"
          marginBottom="3rem"
        >
          <Heading as="h2" size="xl">
            {meta.projects_view_title || "Projects"}
          </Heading>
        </HStack>
        {renderFeaturedProjects()}
        {/* <HStack w="100%" justifyContent="center">
          {!showOther && otherExperience.length > 0 && (
            <Button onClick={() => setShowOther(true)}>
              Show Other Work Experience
            </Button>
          )}
        </HStack> */}
        {/* {showOther && renderOtherExperience()} */}
      </VStack>
    </Container>
  );
};

export default ProjectsView;

const getProjectsFromOrder = (
  experience: IProject[],
  order: IProjectMeta["project_order"]
) => {
  const projects = order.map(({ project: item }) =>
    experience.find((exp) => exp.id === item.id)
  );
  return projects[0] === undefined ? [] : projects;
};
