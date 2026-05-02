import {
  useState,
} from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import { AIChatService } from "@/chat/services/AIChatService";

import { ChatBubble } from "@/chat/components/ChatBubble";

import { ChatInput } from "@/chat/components/ChatInput";

export default function AIChatScreen() {

  const [messages,
    setMessages] =
    useState<any[]>([
      {
        role: "assistant",
        content:
          "Bonjour, je suis l'assistant IA Terragest.",
      },
    ]);

  const [input,
    setInput] =
    useState("");

  const handleSend =
    async () => {

      if (!input.trim()) {
        return;
      }

      const userMessage = {
        role: "user",
        content: input,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      const response =
        await AIChatService.ask(
          input
        );

      setMessages((prev) => [

        ...prev,

        userMessage,

        {
          role: "assistant",
          content: response,
        },
      ]);

      setInput("");
    };

  return (

    <KeyboardAvoidingView
      style={{
        flex: 1,
        padding: 20,
      }}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >

      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        AI ERP Assistant
      </Text>

      <ScrollView
        style={{
          flex: 1,
        }}
      >

        {messages.map(
          (
            message,
            index
          ) => (

            <ChatBubble
              key={index}
              message={
                message.content
              }
              isUser={
                message.role ===
                "user"
              }
            />

          )
        )}

      </ScrollView>

      <ChatInput
        value={input}
        onChange={setInput}
        onSend={handleSend}
      />

    </KeyboardAvoidingView>
  );
}
