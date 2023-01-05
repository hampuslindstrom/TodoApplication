import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import {PlusCircleFilled} from '@ant-design/icons';
import { Todo } from './models/Todo';
import { TodosFormProps } from './models/TodoFormProps';

  const TodosForm: React.FC<TodosFormProps> = (props) => {
    const [form] = Form.useForm();
    const { onFormSubmit } = props;

    const onFinish = () => {
        const todo: Todo = {
            title: form.getFieldValue('title'),
            completed: false,
        };
        onFormSubmit(todo);
        form.resetFields();
      }

    return (
        <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        className="todo-form">
            <Row gutter={20}>
                <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                    <Form.Item
                    name={'title'}
                    rules={[{required: true, message: 'Detta fält måste fyllas i'}]}>
                        <Input placeholder="Vad behöver du ta tag i?" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                    <Button type="primary" htmlType="submit" block>
                        <PlusCircleFilled />
                        Lägg till
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}

export default TodosForm;