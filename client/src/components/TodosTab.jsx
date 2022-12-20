import React, {useEffect} from 'react';
import { List } from 'antd';
import TodoItem from './TodoItem';

const TodosTab = ({todos, onTodoRemoval, onTodoToggle}) => {
    return (
        <>
        <List
            locale={{ emptyText: "Du har inget kvar att göra.", }}
            dataSource={todos}
            renderItem={(todo) => {
                <TodoItem 
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