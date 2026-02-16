import { useEffect, useState } from "react";

const activities = [
  { name: "Emmanuel", action: "withdrew", amount: 50000 },
  { name: "Sophia", action: "invested", amount: 120000 },
  { name: "James", action: "deposited", amount: 30000 },
  { name: "Aisha", action: "withdrew", amount: 85000 },
  { name: "Daniel", action: "invested", amount: 200000 },
];

const LiveNotifications = () => {
  const [notification, setNotification] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        activities[Math.floor(Math.random() * activities.length)];

      setNotification(random);
      setVisible(true);

      // hide after 4 seconds
      setTimeout(() => {
        setVisible(false);
      }, 4000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  if (!notification) return null;

  return (
    <div
      className={`fixed top-6 right-6 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="bg-white shadow-xl rounded-xl px-4 py-3 border">
        <p className="text-sm">
          <span className="font-semibold">{notification.name}</span>{" "}
          {notification.action}{" "}
          <span className="font-semibold text-green-600">
            ${notification.amount.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LiveNotifications;
