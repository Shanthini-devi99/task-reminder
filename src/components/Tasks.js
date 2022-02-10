import Task1 from './Task1'

const Tasks = ({tasks,onDelete,onToggle}) => {
    
  return (
  <div>
        {
            tasks.map((task, index) => 
        (
            <Task1 key={index} 
            tasks={task}  
            onDelete={onDelete} 
            onToggle={onToggle}/>
        ))
        }
  </div>
  )
};

export default Tasks;
