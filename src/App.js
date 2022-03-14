/* eslint-disable no-undef */
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import About from "./components/About"


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


  //fetch tasks

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //fetch task

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  //get Task
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])



  //delete task
  const deleteTask = async (id) => {
    try{
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    // setTasks(tasks.filter((i) => i.id !== id))

    //  console.log(id);
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }
  catch(err)
  {
    console.log(err)
  }
    // setTasks(tasks.filter((task) => task.id !== id))

  }
  // delete -> tasks, setTasks() -> updated
  // reminder -> tasks, setTasks(prev => {}) -> useCurrent updated

  //toggle reminder
  const toggleReminder = async (id) => {
    // console.log(id);
    const taskToToggle = await fetchTask(id)
    const updTask = {
      ...taskToToggle,
      reminder: !taskToToggle.reminder
    }

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(updTask)

      })

    const data = await res.json()


    setTasks(
      prev => prev.map((task) =>
        (task.id === id) ? {
          ...task, reminder:
            data.reminder
        } : task))

  }


  //Add task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })


    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000)+1
    // const newTask = { id, ...task };
    // setTasks([...tasks,newTask])
  }
  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
       

        <Routes>
          <Route path="/"  element={
            <>
               {showAddTask && <AddTask onAdd={addTask} />}
              {
                tasks.length === 0 ?
                  ('Task is empty') :
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder} />
              }
            </>
          } 

          />


          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
