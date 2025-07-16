import { Toaster } from "components/ui/toaster";
import { Toaster as Sonner } from "components/ui/sonner";
import { TooltipProvider } from "components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SymptomConsultation from "./pages/SymptomConsultation";
import CheckupAnalysis from "./pages/CheckupAnalysis";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
const queryClient = new QueryClient();
// api key 추가 env 파일에 추가(mistral api..)

const App = () => {
  useEffect(() => {
    fetch("/api/llm1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.REACT_APP_MIR_API_KEY!,
      },
      body: JSON.stringify({ prompt: "Hello" }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text(); // 👈 JSON 아닌 경우 대비
          throw new Error(`응답 오류: ${res.status} - ${text}`);
        }
        return res.json();
      })
      .then((data) => console.log("응답:", data))
      .catch((err) => console.error("에러:", err));
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/symptom-consultation"
              element={<SymptomConsultation />}
            />
            <Route path="/checkup-analysis" element={<CheckupAnalysis />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
// function useEffect(arg0: () => void, arg1: never[]) {
//   throw new Error("Function not implemented.");
// }
