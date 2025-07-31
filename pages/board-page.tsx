"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import Loader from "../components/loader";
import PostItemModal from "../components/modals/post-item-modal";
import ItemCard from "../components/ui/item-card";
import { NotFound } from "../components/ui/not-found";
import { Tabs } from "../components/ui/tabs";
import { IItems } from "../types/type";
import Navbar from "../components/navbar";

const BoardPage = () => {
  const statuses = ["all", "done", "active"];

  const [items, setItems] = useState<IItems[]>([]);
  const [showPostModal, setShowPostModal] = useState(false);

  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [isLoading, setIsLoading] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const userId = localStorage.getItem("userId");

  const getItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://688978734c55d5c739527348.mockapi.io/api/loastandfound/items?userId=${userId}`
      );

      setItems(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchSearch = item.name
      .toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase());

    const matchTabs = selectedTab === "all" || item.type === selectedTab;
    const matchStatus =
      selectedStatus === "all" || item.status === selectedStatus;

    return matchSearch && matchTabs && matchStatus;
  });

  const handleMarkAsDone = async (id: string) => {
    const promise = axios.put(
      `https://688978734c55d5c739527348.mockapi.io/api/loastandfound/items/${id}`,
      { status: "done" }
    );

    toast.promise(promise, {
      loading: "Marking as done...",
      success: "Mark as done",
      error: "Failed to mark as done",
    });

    await promise;
    await getItems();
  };

  return (
    <section className="w-full max-w-[1600px] mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar onOpen={() => setShowPostModal(true)} />

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search items, locations, or descriptions..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none min-w-[180px] justify-between"
            >
              <div className="flex items-center gap-x-4">
                <Filter className="w-4 h-4" />
                <p className="">
                  {selectedStatus === "all" ? "All" : selectedStatus}
                </p>
              </div>
              <ChevronDown />
            </button>
            {showCategoryDropdown && (
              <div className="absolute right-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setShowCategoryDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {status === "all" ? "All" : status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}

        <Tabs
          total={items.length}
          lostCount={items.filter((item) => item.type === "lost").length}
          foundCount={items.filter((item) => item.type === "found").length}
          selected={selectedTab}
          onChange={setSelectedTab}
        />

        {/* Items Grid & Not found & Loading */}

        {isLoading ? (
          <Loader />
        ) : items.length === 0 ? (
          <NotFound />
        ) : filteredItems.length === 0 ? (
          <NotFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard
                item={item}
                key={item.Id}
                onMarkAsDone={handleMarkAsDone}
              />
            ))}
          </div>
        )}
      </div>

      {/* Post Item Modal */}
      {showPostModal && (
        <PostItemModal
          onClose={() => setShowPostModal(false)}
          onSuccess={() => {
            setShowPostModal(false);
            getItems();
          }}
        />
      )}
    </section>
  );
};

export default BoardPage;
