import React, { useState } from "react";
import { Input, Button, Modal, Form, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { editTodo } from '../services/todoServices';
import { TodoEditProps } from "./models/TodoEditProps";

const TodoEdit = (todo : TodoEditProps) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (e: React.MouseEvent<HTMLElement>, todo: TodoEditProps) => {
        setIsModalOpen(false);
        const editedTodo: TodoEditProps = {
            id: todo.id,
            title: form.getFieldValue('title'),
            completed: todo.completed,
        };
        if (editedTodo.title != null) {
            await editTodo(editedTodo);
            window.location.reload();
        }
        else {
            message.warning('Din todo har inte uppdaterats.');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <Button onClick={showModal}>
            <EditOutlined/>
        </Button>
        <Modal title="Redigera" open={isModalOpen} onOk={(e) => handleOk(e, todo)} onCancel={handleCancel}>
        <Form
        form={form}>
            <Form.Item name={'title'}>
                <Input placeholder={todo.title} />
            </Form.Item>
        </Form>
        </Modal>
        </>
    );
}

export default TodoEdit;