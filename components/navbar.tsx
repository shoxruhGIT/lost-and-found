import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { IUser } from "../types/type";
import UserModal from "./modals/user-modal";

interface HeaderProps {
  onOpen: () => void;
}

const Navbar = ({ onOpen }: HeaderProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const getUser = async () => {
    const userId = localStorage.getItem("userId");

    const response = await axios.get(
      `https://688978734c55d5c739527348.mockapi.io/api/loastandfound/users?id=${userId}`
    );

    setUser(response.data[0]);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Lost & Found</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowUserModal(true)}
              className="w-9 h-9 flex items-center justify-center cursor-pointer rounded-full bg-gray-500 hover:bg-gray-600"
            >
              <p className="text-white">{user?.username.slice(0, 2)}</p>
            </button>
            {showUserModal && (
              <UserModal user={user} onClose={() => setShowUserModal(false)} />
            )}
            <button
              onClick={onOpen}
              className="inline-flex items-center px-4 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              Post Item
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
