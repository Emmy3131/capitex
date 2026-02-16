import { useEffect, useState } from "react";

const activities = [
  { name: "Liam", action: "withdrew", amount: 75000 },
  { name: "Olivia", action: "invested", amount: 150000 },
  { name: "Noah", action: "deposited", amount: 42000 },
  { name: "Emma", action: "withdrew", amount: 98000 },
  { name: "Lucas", action: "invested", amount: 210000 },

  { name: "Amelia", action: "deposited", amount: 56000 },
  { name: "Ethan", action: "withdrew", amount: 87000 },
  { name: "Isabella", action: "invested", amount: 134000 },
  { name: "Mason", action: "deposited", amount: 39000 },
  { name: "Mia", action: "withdrew", amount: 66000 },

  { name: "Alexander", action: "invested", amount: 250000 },
  { name: "Charlotte", action: "deposited", amount: 47000 },
  { name: "Benjamin", action: "withdrew", amount: 91000 },
  { name: "Sophia", action: "invested", amount: 175000 },
  { name: "Daniel", action: "deposited", amount: 52000 },

  { name: "Henry", action: "withdrew", amount: 83000 },
  { name: "Ava", action: "invested", amount: 142000 },
  { name: "Sebastian", action: "deposited", amount: 61000 },
  { name: "Elijah", action: "withdrew", amount: 79000 },
  { name: "Scarlett", action: "invested", amount: 198000 },

  { name: "Mateo", action: "deposited", amount: 45000 },
  { name: "Aria", action: "withdrew", amount: 72000 },
  { name: "James", action: "invested", amount: 223000 },
  { name: "Evelyn", action: "deposited", amount: 54000 },
  { name: "Michael", action: "withdrew", amount: 88000 }
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
      className={`fixed top-16 md:top-6 md:right-6 right-3 z-50 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="bg-white shadow-xl rounded-xl px-4 py-3">
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
