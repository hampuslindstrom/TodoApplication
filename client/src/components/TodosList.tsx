import React, {useEffect, useState, useCallback} from 'react';
import './TodosList.css';
import TodosTab from './TodosTab';
import TodosForm from './TodosForm';
import { createTodo, deleteTodo, loadTodos, updateTodo} from '../services/todoServices';
import { Col, Layout, message, Row, Tabs } from 'antd';
const { TabPane } = Tabs;
const { Content } = Layout;

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TodosList = () => {
    
    const [refreshing, setRefreshing] = useState(false);

    const [todos, setTodos] = useState([]);

    const [activeTodos, setActiveTodos] = useState([]);

    const [completedTodos, setCompletedTodos] = useState();

    const handleFormSubmit = async (todo : Todo) => {
        console.log('Skapa denna todo', todo);
        await createTodo(todo);
        onRefresh();
        message.success('Din att-göra är tillagd!');
    }

    const handleRemoveTodo = async (todo : Todo) => {
        await deleteTodo(todo.id);
        onRefresh();
        message.warning('Du har tagit bort det du behövde göra');
    }

    const handleToggleTodoStatus = async (todo : Todo) => {
        todo.completed = !todo.completed;
        await updateTodo(todo);
        onRefresh();
        message.info('Todo status updated!');
    }

    const refresh = async () => {

        loadTodos()
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
        console.log('Refresh', refreshing);
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
                                    <TodosTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />
                                </TabPane>

                                <TabPane tab="Pågående" key="active">

                                    <TodosTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />

                                </TabPane>
                                <TabPane tab="Färdiga" key="complete">

                                    <TodosTab todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo} />

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