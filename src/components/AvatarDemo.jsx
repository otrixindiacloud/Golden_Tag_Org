"use client";

import Avatar from "./Avatar";

// Demo component to showcase the Avatar functionality
export default function AvatarDemo() {
  const demoUsers = [
    { name: "Dheeraj Prajapat", email: "dheeraj@example.com" },
    { name: "John Doe", email: "john@example.com", avatar: "https://via.placeholder.com/150/6B7280/FFFFFF?text=JD" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Alice Johnson", email: "alice@example.com" },
    { name: "Bob Wilson", email: "bob@example.com" },
    { name: "Charlie Brown", email: "charlie@example.com" },
    { name: "Diana Prince", email: "diana@example.com" },
    { name: "Eve Adams", email: "eve@example.com" },
    { name: "Frank Miller", email: "frank@example.com" },
    { name: "Grace Lee", email: "grace@example.com" }
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Avatar Component Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Different sizes */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Different Sizes</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar user={demoUsers[0]} size="xs" />
                <span className="text-sm text-gray-600">Extra Small (xs)</span>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar user={demoUsers[0]} size="sm" />
                <span className="text-sm text-gray-600">Small (sm)</span>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar user={demoUsers[0]} size="md" />
                <span className="text-sm text-gray-600">Medium (md)</span>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar user={demoUsers[0]} size="lg" />
                <span className="text-sm text-gray-600">Large (lg)</span>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar user={demoUsers[0]} size="xl" />
                <span className="text-sm text-gray-600">Extra Large (xl)</span>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar user={demoUsers[0]} size="2xl" />
                <span className="text-sm text-gray-600">2X Large (2xl)</span>
              </div>
            </div>
          </div>

          {/* With names */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">With Names</h2>
            <div className="space-y-4">
              {demoUsers.slice(0, 5).map((user, index) => (
                <Avatar 
                  key={index} 
                  user={user} 
                  size="md" 
                  showName={true}
                />
              ))}
            </div>
          </div>

          {/* Color variations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Color Variations</h2>
            <div className="grid grid-cols-2 gap-4">
              {demoUsers.slice(0, 8).map((user, index) => (
                <div key={index} className="text-center">
                  <Avatar user={user} size="lg" />
                  <p className="text-xs text-gray-600 mt-2 truncate">
                    {user.name.split(' ')[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* With and without avatars */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">With/Without Avatars</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar user={demoUsers[1]} size="lg" showName={true} />
                <span className="text-sm text-gray-600">Has avatar image</span>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar user={demoUsers[0]} size="lg" showName={true} />
                <span className="text-sm text-gray-600">No avatar - shows initials</span>
              </div>
            </div>
          </div>

          {/* Email fallback */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Email Fallback</h2>
            <div className="space-y-4">
              <Avatar user={{ email: "test@example.com" }} size="lg" showName={true} />
              <Avatar user={{ email: "admin@company.com" }} size="lg" showName={true} />
              <Avatar user={{ email: "user@domain.org" }} size="lg" showName={true} />
            </div>
          </div>

          {/* Single name fallback */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Single Name Fallback</h2>
            <div className="space-y-4">
              <Avatar user={{ name: "Madonna" }} size="lg" showName={true} />
              <Avatar user={{ name: "Cher" }} size="lg" showName={true} />
              <Avatar user={{ name: "Prince" }} size="lg" showName={true} />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Features</h2>
          <ul className="space-y-2 text-blue-800">
            <li>• Automatically generates initials from user name</li>
            <li>• Consistent color generation based on name</li>
            <li>• Multiple size options (xs, sm, md, lg, xl, 2xl)</li>
            <li>• Optional name display</li>
            <li>• Graceful fallback to email if no name provided</li>
            <li>• Handles single names and full names</li>
            <li>• Smooth hover animations</li>
            <li>• Error handling for broken avatar images</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
