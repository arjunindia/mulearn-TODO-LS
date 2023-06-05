import {useEffect,useState,useRef,InputHTMLAttributes} from 'react';
import {useLocation,Link} from "wouter";
import {v4 as uuid,} from "uuid";
export default function Todo() {
    const todoVar = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")!) : [];
    const [_, setLocation] = useLocation();
    const [todos, setTodos] = useState<{id:string,text:string,completed:boolean}[]>(todoVar);
    const [visibleTodos, setVisibleTodos] = useState<{id:string,text:string,completed:boolean}[]>(todoVar);
    const [filter, setFilter] = useState<"all"|"active"|"completed">("all");
    const checkRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!localStorage.getItem("user")) {
            setLocation("/login");
        }

    }, []);
    useEffect(() => {
        if (filter === "all") {
            setVisibleTodos(todos);
        } else if (filter === "active") {
            setVisibleTodos(todos.filter((todo: any) => !todo.completed));
        } else if (filter === "completed") {
            setVisibleTodos(todos.filter((todo: any) => todo.completed));
        }
    }, [filter, todos]);


    const setItem = (todos: any) => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const todo = {
            id: uuid(),
            text: inputRef.current!.value,
            completed: checkRef.current!.checked
        }
        setItem([...todos, todo]);
        setTodos([...todos, todo]);
        inputRef.current!.value = "";
        checkRef.current!.checked = false;
    }
    const checkboxChange = (e: any) => {
        const id = e.target.parentElement.parentElement.getAttribute("data-id");
        const newTodos = todos.map((todo: any) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setItem(newTodos);
        setTodos(newTodos);
    }
    const deleteTodo = (e: any) => {
        const id = e.target.parentElement.getAttribute("data-id");
        const newTodos = todos.filter((todo: any) => todo.id !== id);
        setItem(newTodos);
        setTodos(newTodos);
    }

    return (
        <>
        <h1>Todo</h1>
        <form className="todo__input__form" onSubmit={handleSubmit}>
        <Checkbox checkRef={checkRef} />
        <input type="text" ref={inputRef} className="todo__input" required />
        <button type="submit" className="todo__submit">Add</button>
        </form>
        <div className="todo__list">
        {visibleTodos.map((todo: any) => (
            <div className="todo__item" key={todo.id} data-id={todo.id}>
            <Checkbox defaultChecked={todo.completed} onChange={checkboxChange} />
            <p className={`todo__text ${todo.completed && 'todo__strike'}`}>{todo.text}</p>
            <button className="todo__delete" onClick={deleteTodo}>X</button>
            </div>
        ))}
        <div className='todo__actions'>
            <p>{todos.length} items left</p>
            <div className='todo__filters'>
                <button className={`todo__filter ${filter === "all" && "todo__filter--active"}`} onClick={() => setFilter("all")}>All</button>
                <button className={`todo__filter ${filter === "active" && "todo__filter--active"}`} onClick={() => setFilter("active")}>Active</button>
                <button className={`todo__filter ${filter === "completed" && "todo__filter--active"}`} onClick={() => setFilter("completed")}>Completed</button>
            </div>
            <button className="todo__clear" onClick={() => setTodos(todos.filter((todo: any) => !todo.completed))}>Clear Completed</button>
        </div>
        </div>
        </>
    )
}

function Checkbox({checkRef,...props}: InputHTMLAttributes<HTMLInputElement>& {checkRef?:React.RefObject<HTMLInputElement>} ){
    return(
        <label className="mcui-checkbox">
        <input type="checkbox" ref={checkRef} {...props}/>
        <div>
          <svg className="mcui-check" viewBox="-2 -2 35 35" aria-hidden="true">
            <title>checkmark-circle</title>
            <polyline points="7.57 15.87 12.62 21.07 23.43 9.93" />
          </svg>
        </div>
        <div/>
      </label>
    )
}