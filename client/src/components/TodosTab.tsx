import React, {useEffect} from 'react';
import { List } from 'antd';
import TodoItem from './TodoItem';

type TodosTabProps = {
    todos: {
        id: number;
        title: string;
        completed: boolean;
    }[];
    onTodoRemoval: (todo: { id: number; title: string; completed: boolean; }) => void;
    onTodoToggle: (todo: { id: number; title: string; completed: boolean; }) => void;
};

const TodosTab = ({todos, onTodoRemoval, onTodoToggle}: TodosTabProps) => {
    return (
        <>
        <List
            locale={{ emptyText: "Du har inget kvar att göra.", }}
            dataSource={todos}
            renderItem={(todo) => {
                return <TodoItem 
                    todo={todo}
                    onTodoToggle={onTodoToggle}
                    onTodoRemoval={onTodoRemoval}
                />
            }}
            pagination={{
                position: 'bottom',
                pageSize: 10,
            }}
        />

        </>
    )
}

export default TodosTab;