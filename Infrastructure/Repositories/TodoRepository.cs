using ApplicationCore;
using Entity.Interfaces;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

public class TodoRepository : ITodoRepository
{
    private readonly TodoContext _context;

    public TodoRepository(TodoContext context)
    {
        _context = context;
    }

    public async Task<List<Todo>> GetTodos()
    {
        return await _context.Todos.ToListAsync();
    }

    public async Task<Todo> GetTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null)
        {
            return null;
        }

        return todo;
    }

    public async Task<Todo> AddTodo(Todo todo)
    {
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();

        return todo;
    }

    public async Task<Todo> UpdateTodo(int id, Todo todo)
    {
        if (id != todo.Id)
        {
            return null;
        }

        _context.Entry(todo).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TodoExists(id))
            {
                return null;
            }
            else
            {
                throw;
            }
        }
        return todo;
    }

    public async Task<Todo> DeleteTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null)
        {
            return null;
        }

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();

        return todo;
    }

    private bool TodoExists(int id)
    {
        return _context.Todos.Any(e => e.Id == id);
    }
}