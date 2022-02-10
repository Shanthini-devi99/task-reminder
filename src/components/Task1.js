import { FaTimes } from 'react-icons/fa'
const Task1 = ({ tasks, onDelete, onToggle }) => {
  return (
    <div className={`task ${tasks.reminder ? 'reminder' : ''}`} onClick={()=>onToggle(tasks.id)}>
      <h3>{tasks.text}
        <FaTimes
          onClick={() => {
            setTimeout(() =>{
              onDelete(tasks.id)
            }, 100)
          }}
          style={{ color: 'red', cursor: 'pointer' }} />
      </h3>
      <p>{tasks.day}</p>
    </div>
  )
};

export default Task1;
