import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { FileText } from "lucide-react";

interface CheckupData {
  bloodPressure: string;
  bloodSugar: string;
  cholesterol: string;
  liverFunction: string;
  weight: string;
  height: string;
  bmi: string;
  notes: string;
}

interface Step2ConfirmProps {
  checkupData: CheckupData;
  setCheckupData: (data: CheckupData) => void;
  onAnalyze: (result: string) => void;
}

const Step2Confirm = ({
  checkupData,
  setCheckupData,
  onAnalyze,
}: Step2ConfirmProps) => {
  const handleChange =
    (field: keyof CheckupData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCheckupData({ ...checkupData, [field]: e.target.value });
    };
  const handleAnalyze = () => {
    const result = `📝 분석 결과

• 혈압: ${checkupData.bloodPressure}
• 혈당: ${checkupData.bloodSugar} ${
      parseInt(checkupData.bloodSugar) > 100 ? "(주의)" : ""
    }
• 콜레스테롤: ${checkupData.cholesterol}
• 간 기능: ${checkupData.liverFunction}
• BMI: ${checkupData.bmi}

⚠️ ${
      parseInt(checkupData.bloodSugar) > 100
        ? "혈당 수치가 다소 높습니다. 식이조절이 필요할 수 있습니다."
        : "모든 수치는 정상 범위입니다."
    }

➕ 추가 권장사항: 3개월 후 재검진 권장`;

    onAnalyze(result);
  };

  return (
    <Card className="border border-gray-200 !bg-white ">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          OCR 결과 확인 및 수정
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 !bg-white">
        <label className="block text-sm font-medium mb-1">
          혈압 (예: 120/80)
        </label>
        <Input
          value={checkupData.bloodPressure}
          onChange={handleChange("bloodPressure")}
          className="bg-white border-gray-200"
        />
        <label className="block text-sm font-medium mb-1">
          혈당 (예: 95 mg/dL)
        </label>
        <Input
          value={checkupData.bloodSugar}
          onChange={handleChange("bloodSugar")}
          className="bg-white border-gray-200"
        />
        <label className="block text-sm font-medium mb-1">콜레스테롤</label>
        <Input
          value={checkupData.cholesterol}
          onChange={handleChange("cholesterol")}
          className="bg-white border-gray-200"
        />

        <label className="block text-sm font-medium mb-1">
          간 기능 (정상/이상)
        </label>
        <Input
          value={checkupData.liverFunction}
          onChange={handleChange("liverFunction")}
          className="bg-white border-gray-200"
        />

        <label className="block text-sm font-medium mb-1">체중 (kg)</label>
        <Input
          value={checkupData.weight}
          onChange={handleChange("weight")}
          className="bg-white border-gray-200"
        />

        <label className="block text-sm font-medium mb-1">신장 (cm)</label>
        <Input
          value={checkupData.height}
          onChange={handleChange("height")}
          className="bg-white border-gray-200"
        />
        <Textarea
          placeholder="메모"
          value={checkupData.notes}
          onChange={handleChange("notes")}
          className="col-span-full bg-white border-gray-200"
        />
        <Button
          className="col-span-full bg-medical-primary text-white hover:bg-medical-primary/90 mt-2"
          onClick={handleAnalyze}
        >
          검진 결과 분석하기
        </Button>
      </CardContent>
    </Card>
  );
};

export default Step2Confirm;
