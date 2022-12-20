import React from 'react';
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import {CloseOutlined, CheckOutlined} from '@ant-design/icons';

type TodoProps = {
    todo: {
        id: number;
        title: string;
        completed: boolean;
    };
    onTodoRemoval: (todo: { id: number; title: string; completed: boolean; }) => void;
    onTodoToggle: (todo: { id: number; title: string; completed: boolean; }) => void;
};

const Todo = ({todo, onTodoRemoval, onTodoToggle}: TodoProps) => {
    return(
        <List.Item
        actions={[
            <Tooltip
                title={todo.completed ? 'Markera som ej utförd' : 'Markera som färdig'}>
                    <Switch 
                        checkedChildren={<CheckOutlined/>}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={() => onTodoToggle(todo)}
                        defaultChecked={todo.completed}
                    />

            </Tooltip>,
            <Popconfirm
            title={'Vill du verkligen radera?'}
            onConfirm={() => {
                onTodoRemoval(todo);
            }}>
                <Button className="remove-todo-btn" type="primary" danger>
                    X
                </Button>
            </Popconfirm>
        ]}
        className="list-item"
        key={todo.id}
        >
            <div className="todo-item">
                <Tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag">
                    {todo.title}
                </Tag>
            </div>
        </List.Item>
    )
}

export default Todo;