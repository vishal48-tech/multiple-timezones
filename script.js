window.addEventListener("DOMContentLoaded", () => {
  const timezones = Intl.supportedValuesOf("timeZone");
  const select = document.getElementById("selected-timezone");

  for (const timezone of timezones) {
    const option = document.createElement("option");
    option.text = timezone;
    option.value = timezone;
    select.appendChild(option);
  }

  // Get user's timezone
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById("timezone").textContent = userTimezone;
  
  updateDateTime(userTimezone);

  // Get current time with seconds
  const currentTimeWithSeconds = new Date().toLocaleTimeString();
  document.getElementById("current-time").textContent = currentTimeWithSeconds;

  // Get current date
  const currentDate = new Date().toLocaleDateString();
  document.getElementById("current-date").textContent = currentDate;

  const editzonebtn = document.getElementById("select-zonebtn");
  editzonebtn.addEventListener("click", () => {
    const modal = document.getElementById("editModal");
    const saveEditButton = document.getElementById("saveEdit");

    modal.style.display = "flex";
    const windowHeight = window.innerHeight;
    const modalHeight = modal.offsetHeight;
    const topPosition = (windowHeight - modalHeight) / 2;
    modal.style.top = `${topPosition}px`;

    const closeModal = document.getElementsByClassName("close")[0];
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    saveEditButton.addEventListener("click", () => {
      const selectedTimezone = document.getElementById('selected-timezone').value;
      document.getElementById('timezone').textContent = selectedTimezone;
      updateDateTime(selectedTimezone);
      modal.style.display = 'none';
    });
    
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  function updateDateTime(timezone) {
    const now = new Date();
    const timeOptions = { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dateOptions = { timeZone: timezone, day: '2-digit', month: '2-digit', year: 'numeric' };

    const formattedTime = now.toLocaleTimeString('en-US', timeOptions);
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);

    document.getElementById('current-time').textContent = formattedTime;
    document.getElementById('current-date').textContent = formattedDate;
  }
});
