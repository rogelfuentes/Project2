
// Get references to page elements
var $deviceType= $("#device-Type");
var $deviceDisplayName = $("#device-DisplayName");
var $deviceId = $("#device-Id");
var $deviceFacility = $("#device-Facility");
var $deviceUnit = $("#device-Unit");
var $deviceSip = $("#device-Sip");
var $deviceStatus = $("#device-Status");
var $deviceNotes = $("#device-Notes");
var $submitBtn = $("#submit");
var $deviceList = $("#device-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveDevice: function(device) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/devices",
      data: JSON.stringify(device)
    });
  },
  getDevices: function() {
    return $.ajax({
      url: "/api/devices",
      type: "GET"
    });
  },
  deleteDevice: function(id) {
    return $.ajax({
      url: "/api/devices/" + id,
      type: "DELETE"
    });
  }
};

// refreshdevices gets new devices from the db and repopulates the list
var refreshDevices = function() {
  API.getDevices().then(function(data) {
    var $devices = data.map(function(device) {
      var $a = $("<a>")
        .text(device.text)
        .attr("href", "/device/" + device.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": device.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $deviceList.empty();
    $deviceList.append($devices);
  });
};

// handleFormSubmit is called whenever we submit a new device
// Save the new device to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var device = {

    type: $deviceType.val().trim(),
    displayName:$deviceDisplayName.val().trim(), 
    deviceId: $deviceId.val().trim(),
    facility: $deviceFacility.val().trim(),
    unit: $deviceUnit.val().trim(),
    sip: $deviceSip.val().trim(),
    status: $deviceStatus.val().trim(),
    notes: $deviceNotes.val().trim(),
  };

  if (!(device.type && device.displayName && device.deviceId && device.facility && device.unit && device.sip && device.status)) { 
    alert("You must enter all the information");
    return;
  }

  API.saveDevice(device).then(function() {
    refreshDevices();
  });
  $deviceType.val("");
  $deviceDisplayName.val(""); 
  $deviceId.val("");
  $deviceNotes.val("");
  $deviceFacility.val("");
  $deviceUnit.val("");
  $deviceSip.val("");
  $deviceStatus.val("");
  $deviceNotes.val("");
};

// handleDeleteBtnClick is called when an device's delete button is clicked
// Remove the device from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDevice(idToDelete).then(function() {
    refreshDevices();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$deviceList.on("click", ".delete", handleDeleteBtnClick);
