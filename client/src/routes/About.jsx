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
    <div data-name="about" className="w-full h-screen bg-white text-gray-300">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <h2 className="text-7xl mb-3 text-slate-500">ChatGepeto</h2>
        {/* <img */}
        {/*   src="https://i.ytimg.com/vi/ZL5b4uPicp0/maxresdefault.jpg" */}
        {/*   alt="" */}
        {/*   className="h-[400px]" */}
        {/* /> */}
        <section className="bg-slate-700 p-4">
          <div className="mt-4 p-2 bg-gray-500 text-white">
            <label>ChatGepeto:</label>
            <div>{botResponse}</div>
          </div>
          <div className="p-2">
            <label>Usuario:</label>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="mr-2 ml-2 p-2 text-black"
            />
            <button onClick={sendMessage}>Enviar</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
