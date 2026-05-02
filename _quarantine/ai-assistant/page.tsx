"use client";

import {
  useState,
} from "react";

import {
  AppLayout,
} from "@/components/layout/AppLayout";

import {
  BusinessAssistant,
} from "@/ai/assistant/BusinessAssistant";

export default function AIDashboard() {

  const [question,
    setQuestion] =
    useState("");

  const [response,
    setResponse] =
    useState<any>(null);

  const handleAsk =
    () => {

      const result =
        BusinessAssistant.ask(
          question
        );

      setResponse(
        result
      );
    };

  return (

    <AppLayout>

      <div className="
        p-10
        space-y-8
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          Enterprise AI Assistant
        </h1>

        <div className="
          bg-white
          rounded-2xl
          shadow-md
          p-8
          space-y-4
        ">

          <input
            placeholder="Posez une question métier..."
            value={question}
            onChange={(e) =>
              setQuestion(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              px-4
              py-3
            "
          />

          <button
            onClick={handleAsk}
            className="
              bg-black
              text-white
              px-6
              py-3
              rounded-xl
            "
          >

            Analyser

          </button>

          {response && (

            <div className="
              bg-gray-100
              rounded-xl
              p-4
            ">

              <p>

                {response.answer}

              </p>

            </div>

          )}

        </div>

      </div>

    </AppLayout>
  );
}
