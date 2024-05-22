const users = [{ name: "Sanjay" }, { name: "mohit" }, { name: "dipu" }];

async function getMessages() {
  try {
    const response = await fetch("http://localhost:5000/message/", {
      method: "get",
      headers: {
        Authorization: localStorage.getItem("authToken"),
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return { messages: [] }; // return an empty array on error
  }
}

// Display users and messages
document.addEventListener(
  "DOMContentLoaded",
  async function displayJoinedUsers() {
    users.forEach((user) => {
      const li = document.createElement("li");
      
      li.innerHTML = `${user.name} joined`;
      usersUl.appendChild(li);
    });
    //   show messsages
    setInterval(async () => {
      const messageResult = await getMessages();
      console.log(messageResult);
      const messagesUl = document.getElementById("messages");
      messagesUl.innerHTML= ""
      if (messageResult.messages) {
        console.log(messageResult.messages);
        messageResult.messages.forEach((message) => {
          const li = document.createElement("li");
          li.innerHTML = `${message.text}`;
          messagesUl.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.innerHTML = "No message found!";
        messagesUl.appendChild(li);
      }
    }, 1000);
  }
);

const sendMsgBtn = document.getElementById("send-message");
sendMsgBtn.onclick = async () => {
  try {
    const message = document.getElementById("message").value;
    const response = await fetch("http://localhost:5000/message/send", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ message: message }),
    });
    const messageResult = await response.json();
    console.log(messageResult);
  } catch (error) {
    console.log(error);
  }
};
