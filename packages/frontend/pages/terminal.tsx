import React, { useState } from "react";
import { Delete } from "lucide-react"; // Import the delete icon from Lucide
import PayTerminal from "@/components/Dialog/PayTerminal";
import { Button } from "@headlessui/react";
import { useRouter } from "next/router";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const handleButtonClick = (value: string) => {
    setInput(input + value);
  };

  const handleEnter = () => {
    const amount = parseFloat(input);
    if (!isNaN(amount)) {
      setTotal(total + amount);
      setInput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setTotal(0);
  };

  const handleDelete = () => {
    setInput(input.slice(0, -1));
  };

  return (
    <div className="flex flex-col p-4 h-full w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex flex-row mb-4 items-center justify-between w-full">
        <h1 className="text-xl font-bold  ">Order Terminal</h1>

        <Button
          onClick={() => {
            router.push("/menu");
          }}
          className="text-sm font-medium text-gray-500"
        >
          <h1 className="text-sm font-medium text-orange-500  ">Home</h1>
        </Button>
      </div>
      <div className="flex flex-col items-center mb-4">
        <div className="w-full bg-gray-100 p-4 rounded-lg text-right text-2xl mb-2">
          {input || "0.00"}
        </div>
        <div className="w-full bg-gray-200 p-4 rounded-lg text-right text-xl">
          Total: ${total.toFixed(2)}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0].map((item) => (
          <button
            key={item}
            onClick={() => handleButtonClick(item.toString())}
            className="p-4 bg-blue-500 text-white text-xl rounded-lg"
          >
            {item}
          </button>
        ))}
        <button
          onClick={handleDelete}
          className="p-4 bg-yellow-500 text-white text-xl rounded-lg flex items-center justify-center"
        >
          <Delete className="w-6 h-6" />
        </button>
        <PayTerminal handleEnter={handleEnter} amount={total} />
        <button
          onClick={handleClear}
          className="col-span-3 p-4 bg-red-500 text-white text-xl rounded-lg"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Terminal;
