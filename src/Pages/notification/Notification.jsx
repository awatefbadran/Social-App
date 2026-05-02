import React, { useEffect, useState } from "react";
import {
    getNotificationsApi,
    getUnreadCountApi,
    readAllNotificationsApi,
} from "../../Services/notificationServices";
import { FaShareFromSquare } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const [selected, setSelected] = useState(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);

            const res = await getNotificationsApi();

            const list = res.data?.data?.notifications || [];

            console.log("NOTIFICATIONS REAL DATA:", list);

            setNotifications(list);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUnread = async () => {
        try {
            const res = await getUnreadCountApi();
            setUnreadCount(res.data?.data?.unreadCount || 0);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchNotifications();
        fetchUnread();
    }, []);

    const handleReadAll = async () => {
        try {
            await readAllNotificationsApi();
            fetchNotifications();
            fetchUnread();
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-4">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">
                    Notifications ({unreadCount})
                </h1>

                <button
                    onClick={handleReadAll}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                    Mark all as read
                </button>
            </div>


            {loading ? (
                <p>Loading...</p>
            ) : notifications.length === 0 ? (
                <p className="text-center text-gray-400">
                    No notifications
                </p>
            ) : (
                <div className="space-y-3">
                    {notifications.map((n) => (
                        <div
                            key={n._id}
                            onClick={() => setSelected(n)}
                            className={`p-4 rounded-xl border cursor-pointer hover:shadow ${n.isRead ? "bg-white" : "bg-blue-50"
                                }`}
                        >


                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src={
                                        n.actor?.photo ||
                                        "https://i.pravatar.cc/100"
                                    }
                                    className="w-10 h-10 rounded-full object-cover"
                                />

                                <div>
                                    <p className="font-semibold text-sm">
                                        {n.actor?.name}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        @{n.actor?.name}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm flex items-center gap-1">
                                {n.type === "share_post" && (
                                    <>
                                        <FaShareFromSquare />
                                        shared your post
                                    </>
                                )}

                                {n.type === "like_post" && (
                                    <>
                                        <FcLike />
                                        liked your post
                                    </>
                                )}

                                {n.type === "comment_post" && (
                                    <>
                                        <FaRegCommentDots />
                                        commented on your post
                                    </>
                                )}
                            </p>
                            {n.entityType === "post" && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Post ID: {n.entityId}
                                </p>
                            )}


                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(n.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}


            {selected && (
                <div
                    className="fixed inset-0 bg-black/60 flex items-center justify-center"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="bg-white p-6 rounded-xl w-[90%] max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="font-bold mb-3">
                            Notification Details
                        </h2>

                        <p className="mb-2">
                            <b>From:</b> {selected.actor?.name}
                        </p>

                        <p className="mb-2">
                            <b>Type:</b> {selected.type}
                        </p>

                        <p className="text-xs text-gray-500">
                            {new Date(selected.createdAt).toLocaleString()}
                        </p>

                        <button
                            onClick={() => setSelected(null)}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;