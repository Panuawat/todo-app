import { X } from "lucide-react";

export default function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
      <div className="flex items-center gap-2">
        <X size={20} />
        {error}
      </div>
    </div>
  );
}
