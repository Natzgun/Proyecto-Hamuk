import { useState } from "react";
const About = () => {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const sendMessage = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      setBotResponse(data.answer);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };
  return (
    <div className="pb-12">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <h2 className="text-4xl mb-3 text-white font-semibold">ChatGepeto</h2>
        <section className="w-102 bg-blue-300 p-4 rounded-lg shadow-md" >
          <div className="mb-4 p-2 h-40 bg-blue-100 text-gray-800 rounded-lg ">
            <label className="text-sm text-black"></label>
            <div className="text-sm border-black">{botResponse}</div>
          </div>
          <div className="flex items-center">
            <label className="text-sm text-black">Usuario:</label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow ml-2 p-2 border rounded-md focus:outline-none focus:border-blue-500 border-black"
            />
            <button
              onClick={sendMessage}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
            >
              Consultar
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
