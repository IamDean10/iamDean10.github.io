// Variables
let earthquakeFeed = [];
let prevInfoWindow;

// Initialize Map
async function initMap() {
  // Initialize GET earthquake feeds
  earthquakeFeed = await getEarthquakesFeed();

  const features = earthquakeFeed?.features ?? [];
  //   Initial map viewport
  const myLatLng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map($("#map")[0], {
    zoom: 2,
    center: myLatLng,
  });

  //   Loop to features to create a map marker
  $.each(features, (index) => {
    const {
      properties: { time, title, detail },
      geometry: { coordinates },
    } = features[index];

    const coorLatLang = {
      lng: coordinates[0],
      lat: coordinates[1],
    };

    //  Create new html content for information window
    const contentString =
      '<div class="infoContent">' +
      `<h2 class="infoTitle">${title} </h2>` +
      '<div class="infoTime">' +
      `${epochToDate(time)}` +
      "</div>" +
      '<div class="infoFooter">' +
      `Click to view full details` +
      "</div>" +
      "</div>";

    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
      enableEventPropagation: true,
    });

    // Add event listener for side panel interaction
    google.maps.event.addListener(infoWindow, "domready", () => {
      $(".gm-style-iw-d").on("click", async () => {
        // show panel on info window click
        $(".info-panel").fadeIn();

        // populate side panel table
        populateSidePanel(detail);
      });
      $(".gm-ui-hover-effect").on("click", () => {
        // show panel on info window click
        $(".info-panel").fadeOut();
      });
    });

    const marker = new google.maps.Marker({
      position: coorLatLang,
      map,
      title: title,
    });

    marker.addListener("click", () => {
      // center to marker position on click
      map.panTo(marker.getPosition());

      // populate side panel table
      populateSidePanel(detail);
      if (prevInfoWindow) {
        // Close previous info window when another one is opened
        prevInfoWindow.close();
      }

      prevInfoWindow = infoWindow;

      infoWindow.open({
        anchor: marker,
        map,
      });
    });
  });
}