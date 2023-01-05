import React, {useEffect, useState, useCallback} from 'react';
import './TodoList.css';
import TodoTab from './TodoTab';
import TodosForm from './TodoForm';
import { createTodo, deleteTodo, loadTodos, updateTodo} from '../services/todoServices';
import { Col, Layout, message, Row, Tabs } from 'antd';
import { Todo } from './models/Todo';

const { TabPane } = Tabs;
const { Content } = Layout;

const TodosList: React.FC = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [todos, setTodos] = useState([]);
    const [activeTodos, setActiveTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);

    const handleFormSubmit = async (todo : Todo) => {
        await createTodo(todo);
        onRefresh();
        message.success('Din att-göra är tillagd!');
    }
    
    const handleRemoveTodo = async (todo : Todo) => {
        if (typeof todo.id !== 'undefined' && 'id' in todo) {
            await deleteTodo(todo.id);
            onRefresh();
            message.warning('Du har tagit bort det du behövde göra');
          }
    }

    const handleToggleTodoStatus = async (todo : Todo) => {
        todo.completed = !todo.completed;
        await updateTodo(todo);
        onRefresh();
        message.info('Uppdaterat!');
    }

    const refresh = async () => {
        await loadTodos()
        .then(json => {
            setTodos(json);
            setActiveTodos(json.filter((todo : Todo) => todo.completed === false));
            setCompletedTodos(json.filter((todo : Todo) => todo.completed === true));
        });
    }
            
    const onRefresh = useCallback( async () => {
        setRefreshing(true);
        let data = await loadTodos();
        setTodos(data);
        setActiveTodos(data.filter((todo : Todo) => todo.completed === false));
        setCompletedTodos(data.filter((todo : Todo) => todo.completed === true));
        setRefreshing(false);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh])

    return (
        <Layout className="layout">
            <Content style={{padding: '10px 60px'}}>
                <div className="todolist">
                    <Row>
                        <Col span={15} offset={5}>
                            <h1>Att-göra-listan</h1>
                            <TodosForm onFormSubmit={handleFormSubmit}/>
                            <br />
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="Alla" key="all">
                                    <TodoTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Pågående" key="active">
                                    <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                                <TabPane tab="Färdiga" key="complete">
                                    <TodoTab todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}

export default TodosList;