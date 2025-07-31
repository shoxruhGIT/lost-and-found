import { Calendar, MapPin } from "lucide-react";
import { IItems } from "../../types/type";

interface ItemCardProps {
  item: IItems;
  onMarkAsDone: (id: string) => void;
}

const ItemCard = ({ item, onMarkAsDone }: ItemCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <span
          className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white rounded-full ${
            item.type === "lost" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {item.type === "lost" ? "LOST" : "FOUND"}
        </span>
      </div>

      <div className="p-4 flex items-center justify-between">
        <div className="">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1 flex-1">
              {item.name}
            </h3>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{item.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <p
          className={`w-20 h-7 rounded-lg font-semibold text-center ${
            item.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {item.status}
        </p>
      </div>
      <div className="mt-3 p-4">
        <button
          disabled={item.status === "done"}
          onClick={() => onMarkAsDone(item.Id)}
          className={`w-full inline-flex items-center cursor-pointer justify-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
            item.status === "done"
              ? "hover:bg-gray-100 text-gray-700 border border-gray-200"
              : "bg-green-50 hover:bg-green-100 text-green-700 border border-green-200"
          }`}
        >
          Mark as done
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
