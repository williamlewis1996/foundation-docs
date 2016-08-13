if (typeof(window.FoundationDocs) === 'undefined') { window.FoundationDocs = {}; }
if (typeof(window.FoundationDocs.Pins) === 'undefined') { window.FoundationDocs.Pins = {}; }

var FoundationDocs = window.FoundationDocs;
!(function() {
  var storageName = 'FOUNDATION_PINS';

  FoundationDocs.Pins.storePins = function(pins) {
    localStorage.setItem(storageName, JSON.stringify(pins));
    return pins;
  };

  FoundationDocs.Pins.setPin = function(name, url) {
    var pins = FoundationDocs.Pins.getPins();
    var found = false;
    for(var i = 0; i < pins.length; i++) {
      if(pins[i].name === name) {
        pins[i].url = url;
        found = true;
        break;
      }
    }
    if(!found) {
      pins.unshift({name: name, url: url})
    };
    FoundationDocs.Pins.storePins(pins);
    return;
  }

  FoundationDocs.Pins.getPins = function() {
    var pinStr = localStorage.getItem(storageName);
    if (pinStr) {
      return JSON.parse(pinStr);
    } else {
      return [];
    }
  };

  // Find pin with name, remove it, return true if
  // found and removed, false otherwise.
  FoundationDocs.Pins.clearPin = function(name) {
    var pins = FouncationDocs.Pins.getPins();
    var found = -1;
    for(var i = 0; i < pins.length; i++) {
      if(pins[i].name === name) {
        found = i;
        break;
      }
    }
    if(found > -1) {
      pins.splice(i, 1);
      FoundationDocs.Pins.storePins(pins);
      return true;
    }
    return false;
  };

  FoundationDocs.Pins.clearPins = function() {
    FoundationDocs.Pins.storePins([]);
  };

  FoundationDocs.Pins.updatePinList = function() {
    var pins = FoundationDocs.Pins.getPins();
    var pinStr = ''
    for(var i = 0; i < pins.length; i++) {
      pinStr = pinStr + "<div class='pin-list-item'><a href='" + pins[i].url + "'>" + pins[i].name + "</a></div>";
    }
    $('[data-pin-list]').html(pinStr);
  };

})();

$('[data-pin-page]').on('click', function() {
  var name = $('h1').text();
  var url = window.location.href;
  FoundationDocs.Pins.setPin(name, url);
  FoundationDocs.Pins.updatePinList();
});
FoundationDocs.Pins.updatePinList();