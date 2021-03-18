import { Mentor } from './mentor.model'; 

export  interface Task{
    task_id?: number;
    title: string;
    text: string;
    status: boolean;
    mentor_id?: Mentor[];
}