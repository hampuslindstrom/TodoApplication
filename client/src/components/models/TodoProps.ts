export type TodoProps = {
    todo: {
        id: number;
        title: string;
        completed: boolean;
    };
    onTodoRemoval: (todo: { id: number; title: string; completed: boolean; }) => void;
    onTodoToggle: (todo: { id: number; title: string; completed: boolean; }) => void;
};