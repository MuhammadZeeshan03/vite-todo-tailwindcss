
import { useState, useEffect } from "react";
function App() {
  const [todo, setTodos] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const response = await fetch('http://localhost:3000/todo/getAllTodo');
      const data = await response.json();
      setTodoList(data);

    } catch (err) {
      console.log(err);
    }
  }

  const addTodo = async () => {
    try {
      const response = await fetch('http://localhost:3000/todo/createTodo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: todo
        })
      });
      const data = await response.json();
      setTodoList([...todoList, data]);
    } catch (err) {
      console.log(err);
    }
  }


  const handleForm = async (e) => {

    e.preventDefault();
    await addTodo();
    setTodos("");
  }

  const deleteTodo = async (deleteValue) => {

    console.log(deleteValue);
    try {

      await fetch("http://localhost:3000/todo/deleteTodo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: deleteValue,
        }),

      })
      


    }
    catch (err) {
      console.log(err);
    }

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
            {todoList.map((singleTodo) => {
              return (
                <li key={singleTodo._id} className="bg-black flex justify-between text-white py-5 rounded-lg text-3xl mb-2 px-5">{singleTodo.title} <span className="text-red-600 cursor-pointer "
                  onClick={() => deleteTodo(singleTodo._id)}
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
