const users = [
  {
    id: 1,
    name: "Alice Trader",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    info: ["🌟 Active Trader", "3 Years Experience", "❤ BTC, ETH"],
    role: "Fullstack Developer",
    location: "New York",
    email: "alice@trader.com",
    projects: 12,
    comments: 120,
  },
  {
    id: 2,
    name: "Bob Investor",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    info: ["📈 Long-term Investor", "5 Years Experience", "❤ AAPL, TSLA"],
    role: "Investor",
    location: "San Francisco",
    email: "bob@investor.com",
    projects: 8,
    comments: 230,
  },
  {
    id: 3,
    name: "Charlie Analyst",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    info: ["📊 Market Analyst", "7 Years Experience", "❤ Research"],
    role: "Market Analyst",
    location: "Chicago",
    email: "charlie@analyst.com",
    projects: 20,
    comments: 350,
  },
  {
    id: 4,
    name: "Dana Swing",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    info: ["💹 Swing Trader", "2 Years Experience", "❤ Forex, Crypto"],
    role: "Swing Trader",
    location: "Los Angeles",
    email: "dana@swing.com",
    projects: 5,
    comments: 90,
  },
];

export default function Admin() {
  const handleEdit = (userId: number) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDelete = (userId: number) => {
    console.log(`Delete user with ID: ${userId}`);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-10">
      <h1 className="text-3xl text-center text-white mb-10">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4 lg:px-20">
        {users.map((user) => (
          <div key={user.id} className="flex flex-col rounded-lg border border-gray-700 bg-gray-800 p-6 shadow-lg">
            <div className="flex items-center">
              <img
                className="w-24 h-24 rounded-full object-cover mr-4"
                src={user.image}
                alt={user.name}
              />
              <div>
                <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                <div className="text-sm text-gray-400">{user.role}</div>
                <div className="text-sm text-gray-400">{user.location}</div>
              </div>
            </div>

            <div className="flex flex-wrap mt-4 space-x-2">
              {user.info.map((infoItem, index) => (
                <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                  {infoItem}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-400">
              <div>
                <span className="text-lg text-white font-bold">{user.projects}</span> Projects
              </div>
              <div>
                <span className="text-lg text-white font-bold">{user.comments}</span> Comments
              </div>
            </div>

            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={() => handleEdit(user.id)}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}