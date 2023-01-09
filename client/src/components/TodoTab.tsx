import React, {useEffect} from 'react';
import { List } from 'antd';
import TodoItem from './TodoItem';
import { TodosTabProps } from './models/TodoTabProps';

const TodosTab = ({todos, onTodoRemoval, onTodoToggle}: TodosTabProps) => {
    return (
        <>
        <List
            locale={{ emptyText: "You got nothing left to do.", }}
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