interface StatsProps {
  total: number;
  completed: number;
}

export default function Stats({ total, completed }: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-blue-600">{total}</div>
        <div className="text-sm text-gray-600">รายการทั้งหมด</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 text-center">
        <div className="text-2xl font-bold text-green-600">{completed}</div>
        <div className="text-sm text-gray-600">เสร็จแล้ว</div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 text-center col-span-2 md:col-span-1">
        <div className="text-2xl font-bold text-orange-600">{total - completed}</div>
        <div className="text-sm text-gray-600">ยังไม่เสร็จ</div>
      </div>
    </div>
  );
}
