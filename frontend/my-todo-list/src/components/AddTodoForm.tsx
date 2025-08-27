import { Plus } from "lucide-react";

interface AddTodoFormProps {
  newTodo: string;
  setNewTodo: (val: string) => void;
  addTodo: (e: any) => void;
  loading: boolean;
}

export default function AddTodoForm({ newTodo, setNewTodo, addTodo, loading }: AddTodoFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="เพิ่มรายการใหม่..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
          onKeyPress={(e) => {
            if (e.key === "Enter") addTodo(e);
          }}
        />
        <button
          onClick={addTodo}
          disabled={loading || !newTodo.trim()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Plus size={20} />
          เพิ่มรายการ
        </button>
      </div>
    </div>
  );
}
