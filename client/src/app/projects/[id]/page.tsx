"use client";

import { useEffect, useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import BoardView from "../BoardView/BoardView";
import ModalNewTask from "@/components/ModalNewTask";
import ListView from "../ListView/ListView";
import TableView from "../TableView/TableView";
import TimelineView from "../TimelineView/TimelineView";


type ProjectProps = {
  params: Promise<{ id: string }>; 
}
const Project = ({ params }: ProjectProps) => {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolved = await params;
        setResolvedParams(resolved);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    };
    
    resolveParams();
  }, [params]);
  
  if (!resolvedParams) return <div>Loading...</div>;
  
  const { id } = resolvedParams;
  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
