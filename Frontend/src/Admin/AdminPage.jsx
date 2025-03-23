import  { useState } from "react";
import { Home, User, FileText, List } from "lucide-react";
import AdminDashBoard from "./AdminDashBoard";
import BlogRequests from "./BlogRequests";
import PostRequests from "./PostRequests";

const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("dashboard"); // Default to dashboard

  return (
    <div className="h-[700px] relative mt-0">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-gray-900 text-white h-screen p-4 ${
            isOpen ? "w-64" : "w-16"
          } transition-all duration-300`}
        >
          <button onClick={() => setIsOpen(!isOpen)} className="mb-4">
            <List size={24} />
          </button>
          <ul className="space-y-4">
            <li
              className={`flex items-center gap-4 p-2 rounded hover:bg-gray-700 cursor-pointer ${
                selectedTab === "dashboard" && "bg-gray-700"
              }`}
              onClick={() => setSelectedTab("dashboard")}
            >
              <Home size={24} />
              {isOpen && <span>Dashboard</span>}
            </li>
            <li
              className={`flex items-center gap-4 p-2 rounded hover:bg-gray-700 cursor-pointer ${
                selectedTab === "blogRequests" && "bg-gray-700"
              }`}
              onClick={() => setSelectedTab("blogRequests")}
            >
              <FileText size={24} />
              {isOpen && <span>Blog Requests</span>}
            </li>
            <li
              className={`flex items-center gap-4 p-2 rounded hover:bg-gray-700 cursor-pointer ${
                selectedTab === "postRequests" && "bg-gray-700"
              }`}
              onClick={() => setSelectedTab("postRequests")}
            >
              <User size={24} />
              {isOpen && <span>Post Requests</span>}
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4">
          {selectedTab === "dashboard" && <AdminDashBoard />}
          {selectedTab === "blogRequests" && <BlogRequests />}
          {selectedTab === "postRequests" && <PostRequests />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
