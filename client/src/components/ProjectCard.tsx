import { Project } from "@/state/api";
import { format } from "date-fns";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-tertiary dark:text-white">
      <p>
        <strong>Title:</strong> {project.name}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {project.description || "No description provided"}
      </p>
      <p>
        <strong>Start date:</strong>{" "}
        {project.startDate
          ? format(new Date(project.startDate), "P")
          : "Not set"}
      </p>
      <p>
        <strong>End date:</strong>{" "}
        {project.endDate ? format(new Date(project.endDate), "P") : "Not set"}
      </p>
    </div>
  );
};

export default ProjectCard;
