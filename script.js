let ws = null;

function connect() {
  const ip = document.getElementById("tvIp").value.trim();
  if (!ip) {
    alert("Enter TV IP address");
    return;
  }

  const name = btoa("Web Remote");
  const url = `ws://${ip}:8001/api/v2/channels/samsung.remote.control?name=${name}`;

  ws = new WebSocket(url);

  ws.onopen = () => {
    document.getElementById("status").innerText = "Connected to TV";
  };

  ws.onerror = () => {
    document.getElementById("status").innerText = "Connection failed";
  };

  ws.onclose = () => {
    document.getElementById("status").innerText = "Disconnected";
  };
}

function sendKey(key) {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    alert("Not connected to TV");
    return;
  }

  ws.send(JSON.stringify({
    method: "ms.remote.control",
    params: {
      Cmd: "Click",
      DataOfCmd: key,
      Option: "false",
      TypeOfRemote: "SendRemoteKey"
    }
  }));
}

function sendText() {
  const text = document.getElementById("textInput").value;
  if (!text) return;

  if (!ws || ws.readyState !== WebSocket.OPEN) {
    alert("Not connected to TV");
    return;
  }

  ws.send(JSON.stringify({
    method: "ms.remote.control",
    params: {
      Cmd: "Type",
      DataOfCmd: text,
      Option: "false",
      TypeOfRemote: "SendInputString"
    }
  }));

  document.getElementById("textInput").value = "";
}
