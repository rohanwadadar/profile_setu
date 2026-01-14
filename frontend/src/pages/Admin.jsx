import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const viewUserDetails = async (userId) => {
    setLoadingDetails(true);
    setShowModal(true);
    try {
      const res = await api.get(`/api/admin/user/${userId}`);
      setSelectedUser(res.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setShowModal(false);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-[#020617] relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-400">Manage your users and platform usage.</p>
          </div>

          <div className="flex gap-4">
            <div className="px-6 py-3 bg-slate-900/80 border border-slate-700/50 rounded-xl flex flex-col items-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider">Total Users</span>
              <span className="text-2xl font-bold text-white">{users.length}</span>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-slate-900/50 border border-slate-800/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-12 text-center text-slate-400">
              Loading users...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-xs uppercase tracking-wider text-slate-400">
                    <th className="p-6 font-medium">ID</th>
                    <th className="p-6 font-medium">User</th>
                    <th className="p-6 font-medium">Role</th>
                    <th className="p-6 font-medium">Organization</th>
                    <th className="p-6 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="group hover:bg-slate-800/30 transition-colors duration-200"
                    >
                      <td className="p-6 text-slate-500 font-mono text-sm">
                        #{user.id}
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                              {user.name}
                            </div>
                            <div className="text-sm text-slate-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${user.role === 'admin'
                          ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                          : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-6 text-slate-400">
                        {user.organization || "—"}
                      </td>
                      <td className="p-6">
                        <button
                          onClick={() => viewUserDetails(user.id)}
                          className="text-slate-400 hover:text-yellow-400 transition-colors group/btn"
                          title="View Details"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-700/50 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {loadingDetails ? (
              <div className="p-12 text-center text-slate-400">
                Loading user details...
              </div>
            ) : selectedUser ? (
              <>
                {/* Modal Header */}
                <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    User Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-6">
                  {/* User Avatar & Name */}
                  <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedUser.name}</h3>
                      <p className="text-slate-400">{selectedUser.email}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium border ${selectedUser.role === 'admin'
                        ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        }`}>
                        {selectedUser.role.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-4">Basic Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">User ID</p>
                        <p className="text-white font-mono">#{selectedUser.id}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Organization</p>
                        <p className="text-white">{selectedUser.organization || "—"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</p>
                        <p className="text-white break-all">{selectedUser.email}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                        <p className="text-white">{selectedUser.phone || "—"}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">LinkedIn URL</p>
                        {selectedUser.linkedin_url ? (
                          <a
                            href={selectedUser.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors break-all"
                          >
                            {selectedUser.linkedin_url}
                          </a>
                        ) : (
                          <p className="text-white">—</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-yellow-400 mb-4">Professional Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Designation</p>
                        <p className="text-white">{selectedUser.designation || "—"}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Experience</p>
                        <p className="text-white">
                          {selectedUser.experience_years ? `${selectedUser.experience_years} years` : "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 p-6 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all"
                  >
                    Close
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
