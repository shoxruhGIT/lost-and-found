import { ChevronDown, LogOut } from "lucide-react";
import { IUser } from "../../types/type";
import { useNavigate } from "react-router-dom";

interface UserModalProps {
  user: IUser | null;
  onClose: () => void;
}

const UserModal = ({ onClose, user }: UserModalProps) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="absolute top-12  flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <ChevronDown className="w-4 h-4 cursor-pointer" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center mb-6">
            <p className="w-14 h-14 rounded-full border-4 flex items-center justify-center text-xl border-gray-200 mb-4">
              {user?.username.slice(0, 2)}
            </p>
            <h3 className="text-lg font-semibold text-gray-900">
              {user?.username}
            </h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              handleLogOut();
              onClose();
            }}
            className="w-full h-10 flex items-center justify-center px-2 py-1 text-xs bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-lg transition-colors duration-200 border border-red-200 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
