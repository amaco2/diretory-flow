import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "./types/kanban";

interface Props
{
    task: Task;
}

const KanbanTask: React.FC<Props> = ({ task }) =>
{
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: task.id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <article
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="kanban-task"
        >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span className={`priority ${task.priority}`}>
                {task.priority}
            </span>
        </article>
    );
};

export default KanbanTask;