import { useState, useEffect } from "react";
import Header from "./components/Header";
import Stats from "./components/Stats";
import AddTodoForm from "./components/AddTodoForm";
import Actions from "./components/Actions";
import ErrorMessage from "./components/ErrorMessage";
import Loading from "./components/Loading";
import TodoList from "./components/TodoList";
import Footer from "./components/Footer";
import type { Todo } from "./types";

const API_BASE_URL = "http://localhost:8000/api";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
      setError('');
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async (e: any) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo.trim(),
          completed: false,
        }),
      });

      if (!response.ok) throw new Error('Failed to create todo');
      
      setNewTodo('');
      await fetchTodos(); // Refresh the list
      setError('');
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเพิ่มรายการ');
      console.error('Error creating todo:', err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: number, title: string, completed: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          completed: !completed,
        }),
      });

      if (!response.ok) throw new Error('Failed to update todo');
      await fetchTodos(); // Refresh the list
      setError('');
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการอัปเดตรายการ');
      console.error('Error updating todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะลบรายการนี้?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete todo');
      await fetchTodos(); // Refresh the list
      setError('');
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการลบรายการ');
      console.error('Error deleting todo:', err);
    }
  };

  // Delete all todos
  const deleteAllTodos = async () => {
    if (!window.confirm('คุณแน่ใจหรือไม่ที่จะลบรายการทั้งหมด?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete all todos');
      await fetchTodos(); // Refresh the list
      setError('');
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการลบรายการทั้งหมด');
      console.error('Error deleting all todos:', err);
    }
  };

  // Start editing a todo
  const startEditing = (id: number, title: string) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle('');
  };

  // Save edited todo
  const saveEditedTodo = async (id: number, completed: boolean) => {
    if (!editingTitle.trim()) {
      setError('ชื่อรายการไม่สามารถเป็นค่าว่างได้');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingTitle.trim(),
          completed,
        }),
      });

      if (!response.ok) throw new Error('Failed to update todo');
      
      setEditingId(null);
      setEditingTitle('');
      await fetchTodos(); // Refresh the list
      setError('');
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการแก้ไขรายการ');
      console.error('Error updating todo:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header />
        <Stats total={todos.length} completed={todos.filter((t) => t.completed).length} />
        <AddTodoForm newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} loading={loading} />
        <Actions fetchTodos={fetchTodos} deleteAllTodos={deleteAllTodos} loading={loading} hasTodos={todos.length > 0} />
        {error && <ErrorMessage error={error} />}
        {loading && <Loading />}
        <TodoList
          todos={todos}
          editingId={editingId}
          editingTitle={editingTitle}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          saveEditedTodo={saveEditedTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          setEditingTitle={setEditingTitle}
        />
        <Footer />
      </div>
    </div>
  );
}
