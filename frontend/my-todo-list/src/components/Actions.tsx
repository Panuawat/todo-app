import { RefreshCw, Trash2 } from "lucide-react";

interface ActionsProps {
  fetchTodos: () => void;
  deleteAllTodos: () => void;
  loading: boolean;
  hasTodos: boolean;
}

export default function Actions({ fetchTodos, deleteAllTodos, loading, hasTodos }: ActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <button
        onClick={fetchTodos}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 flex items-center justify-center gap-2 font-medium transition-colors"
      >
        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        รีเฟรช
      </button>
      {hasTodos && (
        <button
          onClick={deleteAllTodos}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400 flex items-center justify-center gap-2 font-medium transition-colors"
        >
          <Trash2 size={18} />
          ลบทั้งหมด
        </button>
      )}
    </div>
  );
}
