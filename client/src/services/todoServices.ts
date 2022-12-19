const baseUrl = 'localhost:5000/Todos';

export const loadTodos = () => {
    return fetch(baseUrl).then((res) => res.json());
}

export const getTodo = (id : number) => {
    return fetch(`${baseUrl}/${id}`).then((res) => res.json());
}

export const createTodo = (todo: { title: string; completed: boolean; }) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: todo.title,
            completed: todo.completed
        }),
    }).then((res) => res.json());
}

export const updateTodo = (todo: { id: number; title: string; completed: boolean; }) => {
    return fetch(`${baseUrl}/${todo.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: todo.id,
            title: todo.title,
            completed: todo.completed
        }),
    }).then((res) => res.json());
}

export const deleteTodo = (id: number) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
    }).then(res => res.json());
}