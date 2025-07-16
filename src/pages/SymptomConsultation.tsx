import { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { ArrowLeft, Send, Bot, User, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "../components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const SymptomConsultation = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickButtons = [
    "두통이 자주 발생해요",
    "배가 아프고 소화가 안돼요",
    "기침이 계속 나와요",
    "열이 나고 몸살 기운이 있어요",
    "가슴이 답답하고 숨이 차요",
    "어지럽고 현기증이 나요",
  ];

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const res = await fetch("http://amm.kr:3964/llm_med_gemma3_4b", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "mir.so",
        },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!res.ok) throw new Error(`서버 오류 발생 (status: ${res.status})`);

      const data = await res.json();

      if (typeof data.response === "string") {
        return data.response;
      } else if (Array.isArray(data.response)) {
        return data.response.join("\n");
      } else {
        return "⚠️ 응답 형식이 올바르지 않습니다.";
      }
    } catch (err) {
      console.error("❌ 오류:", err);
      return "⚠️ 서버 응답에 실패했습니다. 다시 시도해주세요.";
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    const botTextRaw = await getAIResponse(text);
    setIsTyping(false);

    const cleanText =
      typeof botTextRaw === "string"
        ? botTextRaw.trim()
        : "⚠️ AI 응답을 불러오지 못했습니다.";

    const botMessage: Message = {
      id: `${Date.now() + 1}`,
      text: cleanText,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const handleQuickButton = (text: string) => {
    sendMessage(text);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-gray-100 text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            메인으로 돌아가기
          </Button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 medical-gradient rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                MediNuri 증상 상담
              </h1>
              <p className="text-gray-600">AI 건강 도우미와 실시간 상담</p>
            </div>
          </div>
        </div>

        <Card className="h-[600px] flex flex-col bg-white border border-gray-200">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 bg-medical-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-medical-primary text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <div
                      className="whitespace-pre-line break-words text-sm leading-relaxed"
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {message.text}
                    </div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-medical-primary rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {messages.length === 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">
                  자주 문의하는 증상:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickButtons.map((text, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left text-xs h-auto py-2 justify-start bg-white border-gray-300"
                      onClick={() => handleQuickButton(text)}
                    >
                      {text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <CardContent className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="증상을 자세히 설명해주세요..."
                className="flex-1 text-black placeholder:text-black bg-white border-gray-300 focus-visible:outline-none focus-visible:ring-0 focus:border-medical-primary"
                disabled={isTyping}
              />
              <Button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="bg-medical-primary hover:bg-medical-primary/90 text-white"
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              ⚕️ 이 상담은 참고용이며 의료진 진료를 대체하지 않습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SymptomConsultation;
