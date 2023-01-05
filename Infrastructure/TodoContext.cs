using Microsoft.EntityFrameworkCore;
using ApplicationCore;

namespace Infrastructure
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
        }

        public DbSet<Todo> Todos { get; set; }

    }
}
