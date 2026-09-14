(() => {
  const clock = document.querySelector('[data-utc-clock]');
  if (clock) {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
    });
    function updateClock() {
      const now = new Date();
      const hundredths = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      clock.textContent = `${formatter.format(now)}.${hundredths}`;
      clock.dateTime = now.toISOString();
    }
    updateClock();
    setInterval(updateClock, 80);
  }
  document.querySelector('#header-quick')?.addEventListener('click', () => {
    document.querySelector('#toggle-explorer')?.click();
  });
})();
