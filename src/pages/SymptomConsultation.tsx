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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "안녕하세요! MediNuri 증상 상담 AI입니다. 😊\n\n현재 어떤 증상으로 고민이신가요? 자세히 설명해주시면 적절한 진료과와 대처방법을 안내해드리겠습니다.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
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

  // 예시 시나리오 응답
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes("두통") || message.includes("머리")) {
      return `두통 증상을 말씀해주셨군요. 🤕\n\n**추천 진료과**: 신경과 또는 내과\n\n**가능한 원인**:\n• 스트레스나 수면 부족\n• 목과 어깨 근육 긴장\n• 혈압 변화\n• 편두통\n\n**대처방법**:\n• 충분한 휴식과 수면\n• 목과 어깨 마사지\n• 스트레스 관리\n• 규칙적인 식사\n\n⚠️ **병원 방문이 필요한 경우**:\n• 갑작스럽고 심한 두통\n• 발열, 목 경직이 동반되는 경우\n• 시야 장애가 있는 경우\n\n추가로 궁금한 점이 있으시면 언제든 말씀해주세요!`;
    }

    if (
      message.includes("배") ||
      message.includes("소화") ||
      message.includes("복통")
    ) {
      return `소화불량과 복통 증상이군요. 😣\n\n**추천 진료과**: 소화기내과 또는 내과\n\n**가능한 원인**:\n• 급성 위염\n• 소화불량\n• 스트레스성 위장장애\n• 식중독\n\n**대처방법**:\n• 부드러운 음식 섭취\n• 충분한 수분 보충\n• 금주, 금연\n• 규칙적인 식사\n\n⚠️ **응급실 방문이 필요한 경우**:\n• 심한 복통이 지속되는 경우\n• 구토, 설사가 심한 경우\n• 발열이 동반되는 경우\n\n더 자세한 증상을 알려주시면 더 정확한 안내를 드릴 수 있어요!`;
    }

    if (
      message.includes("기침") ||
      message.includes("목") ||
      message.includes("감기")
    ) {
      return `기침 증상을 호소하고 계시는군요. 😷\n\n**추천 진료과**: 내과 또는 이비인후과\n\n**가능한 원인**:\n• 감기나 독감\n• 기관지염\n• 알레르기\n• 역류성 식도염\n\n**대처방법**:\n• 충분한 수분 섭취\n• 따뜻한 차나 꿀차\n• 실내 습도 조절\n• 금연\n\n⚠️ **병원 방문이 필요한 경우**:\n• 2주 이상 지속되는 기침\n• 가래에 피가 섞여 나오는 경우\n• 고열이 동반되는 경우\n\n기침 양상이나 동반 증상을 더 자세히 알려주시면 도움이 될 것 같아요!`;
    }

    if (
      message.includes("열") ||
      message.includes("몸살") ||
      message.includes("오한")
    ) {
      return `발열과 몸살 증상이 있으시군요. 🤒\n\n**추천 진료과**: 내과\n\n**가능한 원인**:\n• 바이러스 감염\n• 세균 감염\n• 독감\n• 기타 감염성 질환\n\n**대처방법**:\n• 충분한 휴식\n• 수분 보충\n• 해열제 복용 (의사와 상담 후)\n• 가벼운 음식 섭취\n\n⚠️ **응급실 방문이 필요한 경우**:\n• 39도 이상의 고열\n• 의식 저하\n• 심한 두통이나 목 경직\n• 호흡곤란\n\n언제부터 증상이 시작되었는지, 체온은 얼마나 되는지 알려주시면 더 정확한 조언을 드릴 수 있어요!`;
    }

    // 기본 응답
    return `증상을 말씀해주셔서 감사합니다. 🏥\n\n더 정확한 상담을 위해 다음 사항들을 알려주시면 좋겠어요:\n\n• 언제부터 증상이 시작되었나요?\n• 어떤 상황에서 더 심해지나요?\n• 다른 동반 증상은 없나요?\n• 복용 중인 약물이 있나요?\n\n이런 정보들이 있으면 더 구체적인 조언을 드릴 수 있습니다.\n\n⚕️ 참고: 이 정보는 의료진 진료를 대체하지 않으며, 심각한 증상이 있으시면 즉시 병원에 방문하시기 바랍니다.`;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // AI 응답 시뮬레이션
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
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
        {/* 헤더 */}
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

        {/* 채팅 영역 */}
        <Card
          className="h-[600px] flex flex-col bg-white !bg-white border border-gray-200"
          style={{ backgroundColor: "white" }}
        >
          {/* 메시지 영역 */}
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
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
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

              {/* 타이핑 인디케이터 */}
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

          {/* 빠른 응답 버튼 */}
          {messages.length === 1 && (
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
                      className="text-left text-xs h-auto py-2 justify-start bg-white !bg-white border-gray-300"
                      onClick={() => handleQuickButton(text)}
                    >
                      {text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 입력 영역 */}
          <CardContent className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="증상을 자세히 설명해주세요..."
                className="flex-1 text-black placeholder:text-black bg-white !bg-white border-gray-300 focus-visible:outline-none focus-visible:ring-0 focus:border-medical-primary"
                style={{
                  backgroundColor: "white !important",
                  borderColor: "#d1d5db !important",
                  outline: "none !important",
                  boxShadow: "none !important",
                }}
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
