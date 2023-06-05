import {Link,useLocation} from "wouter";
import {useState,useRef} from "react";

export default function Login() {
    const [_, setLocation] = useLocation();
    const [error, setError] = useState<string | null>(null);
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userList = JSON.parse(localStorage.getItem("users") || "[]");
        const user = userList.find((user: { username: string; password: string; }) => user.username === username.current?.value);
        if (!user) {
            setError("Username does not exist!");
            return;
        }
        if (user.password !== password.current?.value) {
            setError("Incorrect password!");
            return;
        }
        setError(null);
        localStorage.setItem("user", JSON.stringify(user));
        setLocation("/");
    };
    return (
        <>
      <h1>Login</h1>
      <form className="user__form" onSubmit={handleSubmit}>
        <input className="form__input" ref={username} type="text" placeholder="Username" required />
        <input className="form__input" ref={password} type="password" placeholder="Password" required />
        {error && <p className="form__error">{error}</p>}
        <div className="seperator"></div>
        <button className="form__button" type="submit">Login</button>
        <Link href="/register" className="form__alr">Don't have an account?</Link>
      </form>
    </>
    )
}