using ApplicationCore;

namespace Entity.Interfaces
{
    public interface ITodoRepository
    {
        Task<List<Todo>> GetTodos();
        Task<Todo> GetTodo(int id);
        Task<Todo> AddTodo(Todo todo);
        Task<Todo> UpdateTodo(int id, Todo todo);
        Task<Todo> DeleteTodo(int id);
    }
}
