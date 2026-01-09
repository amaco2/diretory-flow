import type { Column, Task } from "./types/kanban";
import KanbanTask from "./KanbanTask";

interface Props
{
    column: Column;
    tasks: Task[];
}

const KanbanColumn: React.FC<Props> = ({ column, tasks }) =>
{
    const columnTasks = tasks.filter((task: any) => task.column_id === column.id);

    return (
        <section className="kanban-column">
            <header className="column-header">
                <h2>{column.name}</h2>
                <span>{columnTasks.length} tâches</span>
            </header>

            <div className="column-body">
                {columnTasks.map(task => (
                    <KanbanTask key={task.id} task={task} />
                ))}
            </div>
        </section>
    );
};

export default KanbanColumn;