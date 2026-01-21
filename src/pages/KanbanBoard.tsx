import { useContext, useEffect, useState } from "react";
import { DndContext, type DragEndEvent, closestCenter } from "@dnd-kit/core";
import
{
    SortableContext,
    verticalListSortingStrategy,
    arrayMove
} from "@dnd-kit/sortable";
import axios from "axios";
import "../styles/Kanban.css";
import { type Task, type Column } from "../Component/types/kanban";
import KanbanColumn from "../Component/KanbanColumn";
import { TContext } from "../ThemeContext";
import { useOutletContext } from "react-router-dom";
import axio from "../config/axiosConfig";

interface Props
{
    ID_Project: number;
}

interface Project
{
    id: number;
    name: string
}

const KanbanBoard: React.FC = () =>
{
    const [columns, setColumns] = useState<Column[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const { ID_Project } = useOutletContext<Props>();
    const { projectId } = useContext<any>(TContext);

    console.log(projectId);
    console.log(ID_Project);
    // const projectContext: Project = projectId.find((item: Project) => (Number(item.id) === Number(ID_Project)));
    // console.log("Context du projet", projectContext);

    useEffect(() =>
    {
        axio
            .get<Column[]>(`/api/columns/get/projects/${ID_Project}/board`)
            .then(res => { console.log(res.data); setColumns(res.data) })
            .catch(console.error);

        axio
            .get<Task[]>(`/api/tasks/project/${ID_Project}/getTasks`)
            .then(res => { console.log(res.data); setTasks(res.data) })
            .catch(console.error);
    }, [ID_Project]);

    const onDragEnd = (event: DragEndEvent) =>
    {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setColumns(cols =>
            cols.map(col =>
            {
                const oldIndex = tasks.findIndex(t => t.id === active.id);
                const newIndex = tasks.findIndex(t => t.id === over.id);

                if (oldIndex === -1 || newIndex === -1) return col;

                return {
                    ...col,
                    tasks: arrayMove(tasks, oldIndex, newIndex)
                };
            })
        );

        axio.post("/api/tasks/reorder", {
            taskId: active.id,
            targetTaskId: over.id
        });
    };

    return (
        <>
            {/* SEO */}
            <header className="seo-header">
                <h1>Tableau de production – DirectoryFlow</h1>
                <p>Kanban intelligent pour la production audiovisuelle</p>
                <button>Genere les taches</button>
            </header>

            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <main className="kanban-board">
                    {columns.map(column => (
                        < SortableContext
                            key={column.id}
                            items={tasks.map(item => item)}
                            strategy={verticalListSortingStrategy}
                        >
                            <KanbanColumn column={column} tasks={tasks} />

                        </SortableContext>
                    ))}
                </main>
            </DndContext >
        </>
    );
};

export default KanbanBoard;