import type { Todo } from "../types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  editingId: number | null;
  editingTitle: string;
  startEditing: (id: number, title: string) => void;
  cancelEditing: () => void;
  saveEditedTodo: (id: number, completed: boolean) => void;
  toggleTodo: (id: number, title: string, completed: boolean) => void;
  deleteTodo: (id: number) => void;
  setEditingTitle: (val: string) => void;
}

export default function TodoList(props: TodoListProps) {
  const { todos, ...handlers } = props;

  if (todos.length === 0)
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">ยังไม่มีรายการงาน</h3>
        <p className="text-gray-500">เริ่มต้นโดยการเพิ่มรายการงานแรกของคุณ</p>
      </div>
    );

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...handlers} editingTitle={props.editingTitle} editingId={props.editingId} />
      ))}
    </div>
  );
}
