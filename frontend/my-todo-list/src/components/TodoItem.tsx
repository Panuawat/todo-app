import { Check, Edit2, Save, Trash2, X } from "lucide-react";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  editingId: number | null;
  editingTitle: string;
  startEditing: (id: number, title: string) => void;
  cancelEditing: () => void;
  saveEditedTodo: (id: number, completed: boolean) => void;
  toggleTodo: (id: number, title: string, completed: boolean) => void;
  deleteTodo: (id: number) => void;
  setEditingTitle: (val: string) => void;
}

export default function TodoItem({
  todo,
  editingId,
  editingTitle,
  startEditing,
  cancelEditing,
  saveEditedTodo,
  toggleTodo,
  deleteTodo,
  setEditingTitle,
}: TodoItemProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 transition-all duration-200 hover:shadow-lg ${
        todo.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <button
            onClick={() => toggleTodo(todo.id, todo.title, todo.completed)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 hover:border-green-500"
            }`}
          >
            {todo.completed && <Check size={16} />}
          </button>
          <div className="flex-1 min-w-0">
            {editingId === todo.id ? (
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === "Enter") saveEditedTodo(todo.id, todo.completed);
                  else if (e.key === "Escape") cancelEditing();
                }}
              />
            ) : (
              <h3
                className={`font-medium text-lg break-words ${
                  todo.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {todo.title}
              </h3>
            )}
            <div className="text-sm text-gray-500 mt-1">
              สร้าง: {new Date(todo.created_at).toLocaleString("th-TH")}
              {todo.updated_at !== todo.created_at && (
                <span className="ml-2">
                  • แก้ไข: {new Date(todo.updated_at).toLocaleString("th-TH")}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              todo.completed
                ? "bg-green-100 text-green-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            {todo.completed ? "เสร็จแล้ว" : "ยังไม่เสร็จ"}
          </span>

          {editingId === todo.id ? (
            <>
              <button
                onClick={() => saveEditedTodo(todo.id, todo.completed)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                title="บันทึก"
              >
                <Save size={18} />
              </button>
              <button
                onClick={cancelEditing}
                className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                title="ยกเลิก"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => startEditing(todo.id, todo.title)}
                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="แก้ไขรายการ"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                title="ลบรายการ"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
