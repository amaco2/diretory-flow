export type Priority = "high" | "medium" | "low";

export interface Task
{
    id: number;
    title: string;
    description: string;
    priority: Priority;
}

export interface Column
{
    id: number;
    name: string;
    position: number;
    decription: string;
    tasks: Task[];
}