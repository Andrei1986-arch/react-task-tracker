import { useState } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
const App = () => {
    const [tasks , setTasks] = useState(
        [
            {
                id:1,
                text:"Doctors Appointment",
                day:"Feb 5th at 2.30",
                reminder:true,
            },
            {
                id:2,
                text:"Meeting at school",
                day:"Feb 6th at 1.30",
                reminder:true,
            },
            {
                id:3,
                text:"Food shopping",
                day:"Feb 5th at 3.30",
                reminder:false,
            },
        ]
    )
        // delete Task
    const deleteTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id))
  }

    // Toggle reminder

    const toggleReminder = (id) => {
      console.log(id);
    }

  return (
    <div className='container'>
   <Header />
   {tasks.length > 0 ? (<Tasks tasks={tasks}  onDelete={deleteTask}
    onToggle={toggleReminder} />) : ("No Tasks to do :)")}
    </div>
  );
}



export default App;
