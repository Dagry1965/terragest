Write-Host "Generating Terragest AI Chat Assistant..." -ForegroundColor Cyan

# =====================================================
# GO TO MOBILE APP
# =====================================================

Set-Location "mobile\terragest-mobile"

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\chat" -Force
mkdir "src\chat\services" -Force
mkdir "src\chat\components" -Force
mkdir "src\screens\chat" -Force

# =====================================================
# AI CHAT SERVICE
# =====================================================

$chatService = @'
export const AIChatService = {

  async ask(
    question: string
  ) {

    const normalized =
      question.toLowerCase();

    if (
      normalized.includes(
        "stock faible"
      )
    ) {

      return `
Produits en stock faible :

- Engrais NPK
- Semences maïs
- Aliment bétail
`;
    }

    if (
      normalized.includes(
        "terrain"
      )
    ) {

      return `
Terrains surveillés :

- Zone Nord
- Exploitation Est
- Parcelle B12
`;
    }

    if (
      normalized.includes(
        "intervention"
      )
    ) {

      return `
Interventions récentes :

- Maintenance tracteur
- Contrôle irrigation
- Réparation pompe
`;
    }

    return `
Je suis l'assistant IA Terragest.

Je peux aider sur :
- stocks
- terrains
- interventions
- exploitations
- analytics
`;
  },
};
'@

Set-Content `
"src\chat\services\AIChatService.ts" `
$chatService

# =====================================================
# CHAT BUBBLE
# =====================================================

$chatBubble = @'
import {
  Text,
  View,
} from "react-native";

interface ChatBubbleProps {

  message: string;

  isUser?: boolean;
}

export const ChatBubble = ({
  message,
  isUser,
}: ChatBubbleProps) => {

  return (

    <View
      style={{
        alignSelf:
          isUser
            ? "flex-end"
            : "flex-start",

        backgroundColor:
          isUser
            ? "#2563eb"
            : "#e5e7eb",

        padding: 14,

        borderRadius: 16,

        marginBottom: 12,

        maxWidth: "85%",
      }}
    >

      <Text
        style={{
          color:
            isUser
              ? "white"
              : "black",
        }}
      >
        {message}
      </Text>

    </View>
  );
}
'@

Set-Content `
"src\chat\components\ChatBubble.tsx" `
$chatBubble

# =====================================================
# CHAT INPUT
# =====================================================

$chatInput = @'
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

interface ChatInputProps {

  value: string;

  onChange: (
    value: string
  ) => void;

  onSend: () => void;
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
}: ChatInputProps) => {

  return (

    <View
      style={{
        flexDirection: "row",
        gap: 10,
        marginTop: 12,
      }}
    >

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Poser une question..."
        style={{
          flex: 1,
          backgroundColor:
            "white",

          padding: 14,

          borderRadius: 14,
        }}
      />

      <TouchableOpacity
        onPress={onSend}
        style={{
          backgroundColor:
            "#7c3aed",

          paddingHorizontal: 20,

          justifyContent:
            "center",

          borderRadius: 14,
        }}
      >

        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          Envoyer
        </Text>

      </TouchableOpacity>

    </View>
  );
}
'@

Set-Content `
"src\chat\components\ChatInput.tsx" `
$chatInput

# =====================================================
# AI CHAT SCREEN
# =====================================================

$chatScreen = @'
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
'@

Set-Content `
"src\screens\chat\AIChatScreen.tsx" `
$chatScreen

# =====================================================
# UPDATE APP TSX
# =====================================================

$appTsx = @'
import AIChatScreen from "./src/screens/chat/AIChatScreen";

export default function App() {

  return <AIChatScreen />;
}
'@

Set-Content `
"App.tsx" `
$appTsx

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest AI Chat Assistant generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- AI chat service"
Write-Host "- Conversational ERP"
Write-Host "- Smart assistant"
Write-Host "- AI mobile interface"
Write-Host "- ERP copilot foundation"
Write-Host ""