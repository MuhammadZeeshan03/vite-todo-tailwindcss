
import { useState } from "react";
function App() {
  const [todo, setTodos] = useState("");
  const [todoList, setTodoList] = useState([]);


  const handleForm = (e) => {

    e.preventDefault();

    setTodoList([...todoList, { todoName: todo }]);
    setTodos("");
  }
  console.log(todoList);

  const deleteTodo = (deleteValue) => {
    const filterTodo = [
      ...todoList.filter((singleTodo) => {
        return singleTodo.todoName !== deleteValue;
      })]

    setTodoList(filterTodo);
  }

  return (

    <div className='bg-gray-200 w-full h-screen flex items-center'>

      <div className="w-[500px] mx-auto text-center bg-white p-5 ">


        <h1 className="text-5xl font-bold mb-8">Todo List</h1>

        <form onSubmit={handleForm}>
          <input className="border-2 border-black w-full p-5 mb-5 placeholder:text-grey-500 text-black rounded-lg"
            type="text"
            placeholder="Add Todo"
            value={todo}
            onChange={(e) => setTodos(e.target.value)} />
          <button type="submit" className="bg-red-600 text-white py-3 px-8 rounded-lg mb-8" >Add Todo</button>
        </form>

        <div className="todo-show-area">

          <ul>



            {todoList.map((singleTodo, index) => {

              return (
                <li key={index} className="bg-black flex justify-between text-white py-5 rounded-lg text-3xl mb-2 px-5">{singleTodo.todoName} <span className="text-red-600 cursor-pointer "
                  onClick={() => deleteTodo(singleTodo.todoName)}
                >X</span>

                </li>
              )
            })}




          </ul>

        </div>
      </div>
    </div>


  )
}

export default App
