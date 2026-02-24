import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "./types/kanban";

interface Props {
    task: Task;
}

const priorityLabels: Record<string, string> = {
    high: "Haute",
    medium: "Moyenne",
    low: "Basse",
};

const KanbanTask: React.FC<Props> = ({ task }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <article
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`kanban-task${isDragging ? ' dragging' : ''}`}
        >
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <span className={`priority ${task.priority}`}>
                {priorityLabels[task.priority] || task.priority}
            </span>
        </article>
    );
};

export default KanbanTask;