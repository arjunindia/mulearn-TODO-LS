import {useLocation,Link} from "wouter";
import {useRef,useState} from "react";
export default function Register() {
    const [_, setLocation] = useLocation();
    const [error, setError] = useState<string | null>(null);
    const username = useRef<HTMLInputElement>(null);
    const pass1 = useRef<HTMLInputElement>(null);
    const pass2 = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userList = JSON.parse(localStorage.getItem("users") || "[]");
        if (pass1.current?.value !== pass2.current?.value) {
            setError("Passwords do not match!");
            return;
        }
        setError(null);
        if(userList.find((user: { username: string; }) => user.username === username.current?.value)) {
            setError("Username already exists!");
            return;
        }
        userList.push({
            username: username.current?.value,
            password: pass1.current?.value
        });
        localStorage.setItem("users", JSON.stringify(userList));
        setLocation("/");
    };
  return (
    <>
      <h1>Register</h1>
      <form className="user__form" onSubmit={handleSubmit}>
        <input className="form__input" ref={username} type="text" placeholder="Username" autoComplete="username" required />
        <input className="form__input" ref={pass1} type="password" minLength={8} placeholder="Password" autoComplete="new-password" required />
        <input className="form__input" ref={pass2} type="password" placeholder="Confirm Password" required />
        {error && <p className="form__error">{error}</p>}
        <div className="seperator"></div>
        <button className="form__button" type="submit">Register</button>
        <Link href="/login" className="form__alr">Already have an account?</Link>
      </form>
    </>
  );
}
