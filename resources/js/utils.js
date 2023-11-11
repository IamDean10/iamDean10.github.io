// Global utility functions
function epochToDate(epoch) {
  if (epoch < 10000000000) epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)

  //   Convert epoch to en-US date
  var date = new Date(epoch).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return date;
}

function kebabToTitle(string) {
  return string.replace(/^-*(.)|-+(.)/g, (s, c, d) =>
    c ? c.toUpperCase() : " " + d.toUpperCase()
  );
}

function confirmRedirect(url) {
  const response = confirm("Do you really wish to visit an external website?");
  if (response) {
    window.open(url, "_blank");
  }
}
