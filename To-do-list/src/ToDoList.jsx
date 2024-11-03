import React, {useState} from "react";
function ToDoList (){

    const [tasks,setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const [todoEdit,setTodoEdit] = useState(null);
    const [editText,setEditText] = useState("");

    function handleInputChange (event){
       setNewTask(event.target.value);
    }

    function addTask(){
        if (newTask.trim() === "") {
            return;
          }
        else {
            setTasks(t => [...t,newTask]);
            setNewTask("");
        }
          
    }

    function deleteTask(index){
         const updatedTasks = tasks.filter((_,i)=>i!==index);
         setTasks(updatedTasks);
    }

    function moveTaskUp(index){
         if(index>0){
          const updatedTasks = [...tasks];
          [updatedTasks[index], updatedTasks[index-1]] = [updatedTasks[index-1], updatedTasks[index]];
          setTasks(updatedTasks);
         }
    }
    function moveTaskDown(index){
      if (index<tasks.length-1){
        const updatedTasks = [...tasks];
          [updatedTasks[index], updatedTasks[index+1]] = [updatedTasks[index+1], updatedTasks[index]];
          setTasks(updatedTasks);
      }

    }

    function editTodo(id) {
      const updatedTasks = tasks.map((task, index) => (index === id ? editText : task));
      setTasks(updatedTasks);
      setTodoEdit(null);
      setEditText("");
    }

  return (
    <div className="todolist">
        <h2 className="text">To-Do-List</h2>
        <div> 
            <input type="text" 
            placeholder="Enter a task."
            value={newTask}
            onChange={handleInputChange}/>
            <button className="add-button" onClick={addTask}>+</button>
        </div>
      <ol>
        {tasks.map((task,index)=>
            <li key={index}>

              {todoEdit === index? (
                <input type="text" onChange={(e)=>setEditText(e.target.value)} value={editText}/>
              ): 
              (<span className="task">{task}</span>) }

                
                <button className="delete" onClick={()=>deleteTask(index)}>
                  -
                </button>
                <button className="move-up" onClick={()=>moveTaskUp(index)}>
                 &uarr;
                </button>
                <button className="move-down" onClick={()=>moveTaskDown(index)}>
                  &darr;
                </button>
                {todoEdit === index ? (<button className="save-button" onClick={()=> editTodo(index)}>save</button> ):
                (<button className="edit-button" onClick={()=>setTodoEdit(index)}>&#9998;</button>)}
                
               


            </li>
        )}
      </ol>
    </div>

  );
}
export default ToDoList