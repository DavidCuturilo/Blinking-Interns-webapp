import { Mentor } from './mentor.model';

export  interface Task{
    task_id?: number;
    title: string;
    text: string;
    status: TaskStatus;
    mentor_id?: Mentor[];
    type: TaskType;
    progress: number;
}

export enum TaskType {
    FRONT_END = 'Front_end',
    BACK_END = 'Back_end',
    FULL_STACK = 'Full_stack'
}

export enum TaskStatus{
  ACTIVE='Active',
  COMPLETED='Completed',
  OVERDUE='Overdue'
}
