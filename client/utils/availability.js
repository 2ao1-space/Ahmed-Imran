let status = "";
let color = "";
let until;

function getStatusBtHour(hour) {
  const now = new Date();

  // Handle early morning hours (0-8 AM)
  if (hour >= 0 && hour < 9) {
    status = "Sleeping. Will get back soon!";
    color = "text-red-500";
    until = new Date(now.setHours(9, 0, 0, 0));
  }

  // Working hours (9 AM - 5 PM)
  if (hour >= 9 && hour < 17) {
    status = "Available to work.";
    color = "text-green-600";
    until = new Date(now.setHours(17, 0, 0, 0));
  }

  // Evening hours (5 PM - 11 PM)
  if (hour >= 17 && hour < 23) {
    status = "Relaxing & Recharging.";
    color = "text-blue-400";
    until = new Date(now.setHours(23, 0, 0, 0));
  }

  // Late night hours (11 PM - midnight)
  if (hour >= 23) {
    status = "Sleeping. Will get back soon!";
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    color = "text-red-500";
    until = tomorrow;
  }
}

function getTimingLeft(now, until) {
  // ✅ Fixed: Removed TypeScript parameter typing
  const diff = until.getTime() - now.getTime();

  const minLeft = Math.floor(diff / (1000 * 60)) % 60;
  const hourLeft = Math.floor(diff / (60 * 60 * 1000));
  return `Time left: ${hourLeft}h ${minLeft}m`;
}

function updateAvailability() {
  const now = new Date();
  const hour = now.getHours();
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  getStatusBtHour(hour);
  const timeLeft = until ? getTimingLeft(now, until) : "";

  const el = document.getElementById("availability-status");
  if (el) {
    el.innerHTML = `${timeStr}, Eg. ${status}`;
    // el.innerHTML = `<p class="">${timeStr}, Eg. ${status} <br/>[${timeLeft}]</p>`;
  }

  // Update every minute
  const msToNextMinute =
    60000 - (now.getSeconds() * 1000 + now.getMilliseconds());
  setTimeout(updateAvailability, msToNextMinute);
}

// Start the availability updater
window.addEventListener("DOMContentLoaded", () => {
  updateAvailability();
});
