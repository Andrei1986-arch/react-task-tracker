import { useState , useEffect } from "react"
import {BrowserRouter as Router , Route} from "react-router-dom"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/footer";
import About from "./components/About";
const App = () => {
    const [showAddTask , setShowAddTask] =  useState(false)

    const [tasks , setTasks] = useState( [] )

    useEffect(() => {
      const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
      }
     
      getTasks()
    } , [] )

    //
      const fetchTasks = async () => {
      const res = await fetch ("http://localhost:5000/tasks")
      const data = await res.json()
      return data
    }

    const fetchTask = async (id) => {
      const res = await fetch (`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data
    }

        // delete Task --> stergerea se face doar prin setTask
        // NU prin functia DELETE petru ca folosim useState care este imutabil
        // folosim filter --> pastram tot ce nu are id-ul selectat
    const deleteTask = async(id) => {
      await fetch(`http://localhost:5000/tasks/${id}` , {
        method: "DELETE"
      })

      setTasks(tasks.filter((task) => task.id !== id))
  }

    // Toggle reminder
    //
    const toggleReminder = async (id) => {
      const taskToToggle = await fetchTask(id)
      const updateTask = { ...taskToToggle,
      reminder: !taskToToggle.reminder }

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method:"PUT",
        headers:{"Content-type" : "application/json"},
        body: JSON.stringify(updateTask)
      })

      const data = await res.json()
       
      setTasks(tasks.map((task) => task.id === id ? 
      {...task , reminder : data.reminder} : task
          )
        )
    }

    const addTask = async (task) => {
      // pentru alocarea unui id unic / json face asta automat
      // const id = Math.floor(Math.random() * 1000) + 1
      // const newTask = {id , ...task};
      // setTasks([...tasks , newTask])

      const res = await fetch("http://localhost:5000/tasks" ,
      { method: "POST" ,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(task),
      })

      const data = await res.json()
      setTasks([...tasks , data])
    }// end of addTask

  return (
    <Router>
    <div className='container'>

      {/* prin "setShowAddTask(!showAddTask)"  se ia valoarea existenta
       si se schimba */}
   <Header 
   onAdd={() => setShowAddTask(!showAddTask)} 
   showAdd={showAddTask}/>

   {/* ce se afla intre { }  este ca o functie anonima 
   se foloseste de  &&  ca de o functie ternar daca "showAddTask" este 
   false nu se afiseaza nimic / ambele trebuie sa fie adevarate */}


    <Route path="/" exact render={(props) => (
      <>
  {showAddTask && <AddTask onAdd={addTask}/>}
   {tasks.length > 0 ? (<Tasks tasks={tasks}  onDelete={deleteTask}
    onToggle={toggleReminder} />) : ("No Tasks to do :)")}
      </>
    ) } />
    <Route path="/about" component={About} />
    <Footer />

    </div>
    </Router>
  );
}



export default App;
