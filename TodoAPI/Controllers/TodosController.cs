using Microsoft.AspNetCore.Mvc;
using Entity.Interfaces;
using ApplicationCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TodosApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;

        public TodosController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            var todos = await _todoRepository.GetTodos();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(int id)
        {
            var todo = await _todoRepository.GetTodo(id);
            if (todo == null)
            {
                return NotFound();
            }

            return todo;
        }

        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            var addedTodo = await _todoRepository.AddTodo(todo);
            return CreatedAtAction("GetTodo", new { id = addedTodo.Id }, addedTodo);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Todo>> PutTodo(int id, Todo todo)
        {
            var updatedTodo = await _todoRepository.UpdateTodo(id, todo);
            if (updatedTodo == null)
            {
                return BadRequest();
            }

            return updatedTodo;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var deletedTodo = await _todoRepository.DeleteTodo(id);
            if (deletedTodo == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
