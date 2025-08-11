import React, { useState } from "react";

/** ---------- Login ---------- */
function Login({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic demo validation
    if (username.trim()) onSuccess(username.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 shadow-2xl rounded-2xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome Back</h2>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          placeholder="john"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

/** ---------- To-Do ---------- */
function Todo({ user, onLogout }) {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  const add = (e) => {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now(), text: t, done: false },
    ]);
    setText("");
  };

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );

  const remove = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">To-Do List</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Hi, {user}</span>
          <button
            onClick={onLogout}
            className="px-3 py-1 rounded-lg border text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto p-6">
        <form onSubmit={add} className="flex gap-2 mb-4">
          <input
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
            placeholder="Add a task…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {items.length === 0 && (
            <li className="text-gray-500 text-sm">No tasks yet.</li>
          )}
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-center justify-between bg-white rounded-xl border px-4 py-2"
            >
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={it.done}
                  onChange={() => toggle(it.id)}
                />
                <span className={it.done ? "line-through text-gray-400" : ""}>
                  {it.text}
                </span>
              </label>
              <button
                onClick={() => remove(it.id)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

/** ---------- App: switch screens ---------- */
export default function App() {
  const [user, setUser] = useState(null);
  return user ? (
    <Todo user={user} onLogout={() => setUser(null)} />
  ) : (
    <Login onSuccess={(u) => setUser(u)} />
  );
}
