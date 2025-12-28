export default function NotificationsPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Notifications</h1>
             <div className="space-y-4">
                {/* Placeholder for notification items */}
                <div className="p-4 bg-white rounded-lg shadow border flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">New Job Posting</h3>
                         <p className="text-sm text-gray-500">Google has posted a new role for Software Engineer.</p>
                    </div>
                    <span className="text-xs text-gray-400">2 hrs ago</span>
                </div>
                 <div className="p-4 bg-white rounded-lg shadow border flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">Student Application Update</h3>
                         <p className="text-sm text-gray-500">John Doe has applied for Amazon.</p>
                    </div>
                    <span className="text-xs text-gray-400">5 hrs ago</span>
                </div>
            </div>
        </div>
    );
}
