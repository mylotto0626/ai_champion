import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ArrowLeft, Upload, FileText, Edit3, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CheckupAnalysis = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputMode, setInputMode] = useState<"upload" | "manual">("upload");
  const [checkupData, setCheckupData] = useState({
    bloodPressure: "",
    bloodSugar: "",
    cholesterol: "",
    liverFunction: "",
    weight: "",
    height: "",
    bmi: "",
    notes: "",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // 이미지 업로드 시 자동으로 데이터가 채워지는 것처럼 시뮬레이션
      setTimeout(() => {
        setCheckupData({
          bloodPressure: "120/80",
          bloodSugar: "105 mg/dL",
          cholesterol: "200 mg/dL",
          liverFunction: "정상",
          weight: "70 kg",
          height: "175 cm",
          bmi: "22.9",
          notes: "이미지에서 자동 추출된 데이터입니다.",
        });
      }, 1500);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCheckupData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    // 실제 AI API 호출 대신 시뮬레이션
    setTimeout(() => {
      setAnalysis(`검진 결과 분석 완료

📋 주요 수치 분석:
• 혈압: ${checkupData.bloodPressure} - 정상 범위
• 혈당: ${checkupData.bloodSugar} - ${
        parseInt(checkupData.bloodSugar) > 100
          ? "약간 높음 (주의 필요)"
          : "정상"
      }
• 콜레스테롤: ${checkupData.cholesterol} - 정상
• 간 기능: ${checkupData.liverFunction}
• BMI: ${checkupData.bmi} - 정상 범위

⚠️ 주의사항:
${
  parseInt(checkupData.bloodSugar) > 100
    ? "• 혈당 수치가 경계선에 있어 식단 관리가 필요합니다."
    : "• 모든 수치가 정상 범위입니다."
}
• 정기적인 운동을 권장합니다.

🏥 추가 권장사항:
• 3개월 후 재검진 권장
${
  parseInt(checkupData.bloodSugar) > 100
    ? "• 내분비내과 상담 고려"
    : "• 현재 건강 상태 유지"
}

⚕️ 이 분석은 참고용이며 전문의 상담을 받으시기 바랍니다.`);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-gray-100 text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            메인으로 돌아가기
          </Button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            검진 결과 해석
          </h1>
          <p className="text-gray-600">
            건강검진 결과를 업로드하거나 직접 입력하여 AI 분석을 받아보세요.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex space-x-4">
            <Button
              variant={inputMode === "upload" ? "default" : "outline"}
              onClick={() => setInputMode("upload")}
              className={`flex items-center space-x-2 ${
                inputMode === "upload"
                  ? "bg-medical-primary hover:bg-medical-primary/90 text-white"
                  : "bg-white !bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>이미지 업로드</span>
            </Button>
            <Button
              variant={inputMode === "manual" ? "default" : "outline"}
              onClick={() => setInputMode("manual")}
              className={`flex items-center space-x-2 ${
                inputMode === "manual"
                  ? "bg-medical-primary hover:bg-medical-primary/90 text-white"
                  : "bg-white !bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>직접 입력</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white !bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {inputMode === "upload" ? (
                  <Upload className="w-5 h-5" />
                ) : (
                  <Edit3 className="w-5 h-5" />
                )}
                <span>
                  {inputMode === "upload"
                    ? "검진 결과지 업로드"
                    : "검진 결과 직접 입력"}
                </span>
              </CardTitle>
              <CardDescription className="text-gray-700">
                {inputMode === "upload"
                  ? "PDF, JPG, PNG 형식의 검진 결과지를 업로드해주세요."
                  : "검진 결과 수치를 직접 입력해주세요."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {inputMode === "upload" ? (
                <>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer bg-white !bg-white p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                      <p className="text-gray-900 mb-2 font-medium">
                        클릭하여 파일 선택
                      </p>
                      <p className="text-sm text-gray-700">
                        또는 파일을 드래그하여 업로드
                      </p>
                    </label>
                  </div>

                  {selectedFile && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium">선택된 파일:</p>
                      <p className="text-sm text-gray-600">
                        {selectedFile.name}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        혈압
                      </label>
                      <Input
                        placeholder="예: 120/80"
                        value={checkupData.bloodPressure}
                        onChange={(e) =>
                          handleInputChange("bloodPressure", e.target.value)
                        }
                        className="bg-white !bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        혈당
                      </label>
                      <Input
                        placeholder="예: 95 mg/dL"
                        value={checkupData.bloodSugar}
                        onChange={(e) =>
                          handleInputChange("bloodSugar", e.target.value)
                        }
                        className="bg-white !bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        콜레스테롤
                      </label>
                      <Input
                        placeholder="예: 180 mg/dL"
                        value={checkupData.cholesterol}
                        onChange={(e) =>
                          handleInputChange("cholesterol", e.target.value)
                        }
                        className="bg-white !bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        간 기능
                      </label>
                      <Input
                        placeholder="예: 정상"
                        value={checkupData.liverFunction}
                        onChange={(e) =>
                          handleInputChange("liverFunction", e.target.value)
                        }
                        className="bg-white !bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        체중
                      </label>
                      <Input
                        placeholder="예: 70 kg"
                        value={checkupData.weight}
                        onChange={(e) =>
                          handleInputChange("weight", e.target.value)
                        }
                        className="bg-white !bg-white border-gray-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        신장
                      </label>
                      <Input
                        placeholder="예: 175 cm"
                        value={checkupData.height}
                        onChange={(e) =>
                          handleInputChange("height", e.target.value)
                        }
                        className="bg-white !bg-white border-gray-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      추가 메모
                    </label>
                    <Textarea
                      placeholder="기타 특이사항이나 추가 정보를 입력해주세요"
                      value={checkupData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      className="bg-white !bg-white border-gray-300"
                    />
                  </div>
                </div>
              )}

              {/* 추출된 데이터 표시 */}
              {(checkupData.bloodPressure || checkupData.bloodSugar) && (
                <Card
                  className="bg-white !bg-white border border-gray-200 hover:shadow-md transition-shadow"
                  style={{ backgroundColor: "white" }}
                >
                  <CardHeader className="bg-white !bg-white">
                    <CardTitle className="text-lg text-gray-900">
                      추출된 검진 데이터
                    </CardTitle>
                  </CardHeader>
                  <CardContent
                    className="bg-white !bg-white"
                    style={{ backgroundColor: "white" }}
                  >
                    <Table className="bg-white">
                      <TableHeader className="bg-white">
                        <TableRow className="bg-white !bg-white hover:bg-gray-50 border-gray-200">
                          <TableHead className="text-gray-700 bg-white !bg-white border-gray-200">
                            항목
                          </TableHead>
                          <TableHead className="text-gray-700 bg-white !bg-white border-gray-200">
                            수치
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="bg-white">
                        {checkupData.bloodPressure && (
                          <TableRow className="bg-white !bg-white hover:bg-gray-50 border-gray-200">
                            <TableCell className="text-gray-800 bg-white !bg-white border-gray-200">
                              혈압
                            </TableCell>
                            <TableCell className="text-gray-800 bg-white !bg-white border-gray-200">
                              {checkupData.bloodPressure}
                            </TableCell>
                          </TableRow>
                        )}
                        {checkupData.bloodSugar && (
                          <TableRow className="bg-white !bg-white hover:bg-gray-50 border-gray-200">
                            <TableCell className="text-gray-800 bg-white !bg-white border-gray-200">
                              혈당
                            </TableCell>
                            <TableCell className="text-gray-800 bg-white !bg-white border-gray-200">
                              {checkupData.bloodSugar}
                            </TableCell>
                          </TableRow>
                        )}
                        {checkupData.cholesterol && (
                          <TableRow className="bg-white !bg-white hover:bg-gray-50 border-gray-200">
                            <TableCell className="text-gray-800 bg-white !bg-white border-gray-200">
                              콜레스테롤
                            </TableCell>
                            <TableCell className="text-gray-800 bg-white !bg-white border-gray-200">
                              {checkupData.cholesterol}
                            </TableCell>
                          </TableRow>
                        )}
                        {checkupData.liverFunction && (
                          <TableRow className="bg-white !bg-white hover:bg-gray-50 border-gray-200">
                            <TableCell className="text-gray-800 bg-white !bg-white border-gray-200">
                              간 기능
                            </TableCell>
                            <TableCell className="text-gray-800 bg-white !bg-white border-gray-200">
                              {checkupData.liverFunction}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              <Button
                onClick={handleAnalyze}
                className="w-full bg-medical-primary hover:bg-medical-primary/90 text-white font-medium py-3 rounded-lg transition-all duration-200"
                disabled={
                  (!selectedFile && inputMode === "upload") ||
                  (!checkupData.bloodPressure &&
                    !checkupData.bloodSugar &&
                    inputMode === "manual") ||
                  isAnalyzing
                }
              >
                {isAnalyzing ? "분석 중..." : "검진 결과 분석하기"}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white !bg-white border border-gray-200">
            <CardHeader>
              <CardTitle>AI 분석 결과</CardTitle>
              <CardDescription className="text-gray-700">
                입력한 검진 결과의 AI 분석 내용입니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysis ? (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                    {analysis}
                  </pre>
                </div>
              ) : (
                <div className="text-center text-gray-600 py-8 font-medium">
                  검진 결과를 입력하고 분석 버튼을 눌러주세요.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckupAnalysis;
