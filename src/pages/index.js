import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async (e) => {
  e.preventDefault();
  if (!newTodo.trim()) return;

  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: newTodo }),
  });

  const createdTodo = await res.json(); // espera que a API retorne o todo criado
  setTodos((prev) => [...prev, createdTodo]); // adiciona à lista existente
  setNewTodo('');
};


  const deleteTodo = async (id) => {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  setTodos((prev) => prev.filter(todo => todo.id !== id));
};

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#f2f2f2',
      padding: '2rem',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>📋 Todo List</h1>

        <form onSubmit={addTodo} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Nova tarefa..."
            style={{
              flex: 1,
              padding: '0.75rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '0.75rem 1rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Adicionar
          </button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <li key={todo.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              backgroundColor: '#fafafa',
              borderRadius: '4px',
              marginBottom: '0.5rem',
              border: '1px solid #e0e0e0'
            }}>
              <span style={{ color: '#333' }}>{todo.title}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 0.75rem',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

