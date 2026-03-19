async function sendMessage() {

  const input = document.getElementById("message");
  const message = input.value;

  const chatbox = document.getElementById("chatbox");

  chatbox.innerHTML += "<p><b>You:</b> " + message + "</p>";

  const response = await fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  });

  const data = await response.json();

  chatbox.innerHTML += "<p><b>Bot:</b> " + data.reply + "</p>";

  input.value = "";
}