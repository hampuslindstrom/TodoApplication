using ApplicationCore;
using Entity.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using TodosApp.Controllers;

namespace TodoAPI.Test
{
    [TestClass]
    public class TodosControllerTest
    {

        private Mock<ITodoRepository> _todoRepositoryMock;

        [TestInitialize]
        public void Setup()
        {
            _todoRepositoryMock = new Mock<ITodoRepository>();
        }

        [TestMethod]
        public async Task ShouldGetOneTodoById()
        {
            // Arrange
            var todo = new Todo { Id = 1, Title = "Test", Completed = false };
            _todoRepositoryMock = new Mock<ITodoRepository>();
            _todoRepositoryMock.Setup(x => x.GetTodo(todo.Id)).ReturnsAsync(todo);
            var controller = new TodosController(_todoRepositoryMock.Object);

            // Act
            var result = await controller.GetTodo(todo.Id);

            // Assert
            var todoResult = result.Value as Todo;
            Assert.AreEqual(todo.Id, todoResult.Id);
            Assert.AreEqual(todo.Title, todoResult.Title);
            Assert.AreEqual(todo.Completed, todoResult.Completed);
        }


        [TestMethod]
        public async Task ShouldGetAllTodos()
        {
            // Arrange
            var todo1 = new Todo { Id = 1, Title = "Test1", Completed = false };
            var todo2 = new Todo { Id = 2, Title = "Test2", Completed = true };
            var todos = new List<Todo> { todo1, todo2 };

            _todoRepositoryMock = new Mock<ITodoRepository>();
            _todoRepositoryMock.Setup(x => x.GetTodos()).ReturnsAsync(todos);
            var controller = new TodosController(_todoRepositoryMock.Object);

            // Act
            var result = await controller.GetTodos();

            // Assert
            var okResult = result.Result as OkObjectResult;
            var todosResult = okResult.Value as IEnumerable<Todo>;
            // Assert.IsNotNull(todosResult);
            Assert.AreEqual(2, todosResult.Count());
        }

        [TestMethod]
        public async Task ShouldAddOneTodo()
        {
            // Arrange
            var todo = new Todo
            {
                Id = 1,
                Title = "Test",
                Completed = false
            };

            _todoRepositoryMock = new Mock<ITodoRepository>();
            _todoRepositoryMock.Setup(x => x.AddTodo(todo))
                .ReturnsAsync(todo);

            var todosController = new TodosController(_todoRepositoryMock.Object);

            // Act
            var result = await todosController.PostTodo(todo);

            // Assert
            var createdResult = result.Result as CreatedAtActionResult;
            var todoResult = createdResult.Value as Todo;
            Assert.AreEqual(todo, todoResult);
        }

        [TestMethod]
        public async Task ShouldUpdateTodoAndReturnOkResult()
        {
            // Arrange
            var todoToUpdate = new Todo { Id = 1, Title = "Todo 1" };
            _todoRepositoryMock = new Mock<ITodoRepository>();
            _todoRepositoryMock.Setup(repo => repo.UpdateTodo(todoToUpdate.Id, todoToUpdate))
                .ReturnsAsync(todoToUpdate);
            var controller = new TodosController(_todoRepositoryMock.Object);

            // Act
            var result = await controller.PutTodo(todoToUpdate.Id, todoToUpdate);

            // Assert
            var objectResult = result as ActionResult<Todo>;
            Assert.AreEqual(todoToUpdate, objectResult.Value);
            _todoRepositoryMock.Verify(repo => repo.UpdateTodo(todoToUpdate.Id, todoToUpdate), Times.Once());
        }

        [TestMethod]
        public async Task ShouldDeleteTodoAndReturnNoContentResult()
        {
            // Arrange
            _todoRepositoryMock = new Mock<ITodoRepository>();
            _todoRepositoryMock.Setup(repo => repo.DeleteTodo(1))
                .ReturnsAsync(new Todo { Id = 1, Title = "Test" });
            var controller = new TodosController(_todoRepositoryMock.Object);

            // Act
            var result = await controller.DeleteTodo(1);

            // Assert
            Assert.IsInstanceOfType(result, typeof(NoContentResult));
            _todoRepositoryMock.Verify(repo => repo.DeleteTodo(1), Times.Once());
        }
    }
}