import {FaTimes} from "react-icons/fa"

const Task = ({task , onDelete , onToggle}) => {
    return (
        // head of the div --> influnetam clasa sa devina stilizata cu clasa reminder sau sa ramana fara clasa
        // asta se face 
        <div className = {`task ${task.reminder ? "reminder"  : ""}`}  
                onDoubleClick={() => onToggle(task.id)}>
            <h3>
                {task.text} 
                <FaTimes style={{color:"rgb(214, 122, 127)" , cursor: "pointer"}}
                onClick = {() => onDelete(task.id)}  />
             </h3>
            <p>{task.day}</p>
        </div>
    )
}



export default Task
