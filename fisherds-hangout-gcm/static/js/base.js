/**
 * @fileoverview
 * Uses the Endpoints API to send messages to the server.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

/** rh global namespace. */
var rh = rh || {};

/** mercury namespace. */
rh.mercury = rh.mercury || {};

/**
 * Client ID of the application (from the APIs Console).
 * @type {string}
 */
rh.mercury.CLIENT_ID = '';

/**
 * Scopes used by the application.
 * @type {string}
 */
rh.mercury.SCOPES = 'https://www.googleapis.com/auth/userinfo.email';


/**
 * Prints a message to the outputLog.
 * param {Object} msg Message to add to the log.
 */
rh.mercury.print = function(command) {
  var element = document.createElement('div');
  element.classList.add('row');
  element.innerHTML = command.name;
  document.getElementById('outputLog').appendChild(element);
};

/**
 * Call to lists commands and add them to the output log.
 */
rh.mercury.clearOutput = function() {
	console.log("Clear output");
	  document.getElementById('outputLog').innerHTML = '';
};

/**
 * Call to lists commands and add them to the output log.
 */
rh.mercury.listCommands = function() {
  console.log("List commands");
  rh.mercury.clearOutput();
  gapi.client.mercury.command.list().execute(
      function(resp) {
        if (!resp.code) {
          resp.items = resp.items || [];
          for (var i = 0; i < resp.items.length; i++) {
            rh.mercury.print(resp.items[i]);
          }
        }
      });
};

/**
 * Gets a greeting a specified number of times.
 * @param {string} greeting Greeting to repeat.
 * @param {string} count Number of times to repeat it.
 */
rh.mercury.insertCommand = function(name, script_number) {
	console.log("Insert command");
  gapi.client.mercury.command.insert({
      'name': name,
      'script_number': script_number
    }).execute(function(resp) {
      if (!resp.code) {
        rh.mercury.print(resp);
      }
    });
};


/**
 * Enables the button callbacks in the UI.
 */
rh.mercury.enableButtons = function() {
	document.getElementById('listCommands').disabled = false;
	document.getElementById('insertCommand').disabled = false;
	document.getElementById('listCommands').onclick = function() {
		rh.mercury.listCommands();
	}
	document.getElementById('clearOutput').onclick = function() {
		rh.mercury.clearOutput();
	}
	document.getElementById('insertCommand').onclick = function() {
		rh.mercury.insertCommand(
				document.getElementById('name').value,
				document.getElementById('script_number').value);
	}
	

	var xTriggered = 0;
	$(document).keypress(function( event ) {
		if (event.which == 49) {
			console.log("Execute script 1");
			rh.mercury.insertCommand('script', 1);
		} else if (event.which == 50) {
			console.log("Execute script 2");
			rh.mercury.insertCommand('script', 2);
		} else if (event.which == 51) {
			console.log("Execute script 3");
			rh.mercury.insertCommand('script', 3);
		} else if (event.which == 52) {
			console.log("Execute script 4");
			rh.mercury.insertCommand('script', 4);
		}
		  xTriggered++;
		  var msg = "Handler for .keypress() called " + xTriggered + " time(s).";
		  console.log(msg);
	});
};



/**
 * Initializes the application.
 * 
 * @param {string}
 *            apiRoot Root of the API's path.
 */
rh.mercury.init = function(apiRoot) {
  console.log("init called");
  var apisToLoad;
  var callback = function() {
	  console.log("Loaded an api");
    if (--apisToLoad == 0) {
      rh.mercury.enableButtons();
    }
  }

  apisToLoad = 1; // must match number of calls to gapi.client.load()
  gapi.client.load('mercury', 'v1', callback, apiRoot);
};

