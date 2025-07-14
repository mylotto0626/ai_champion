import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { FileText } from "lucide-react";

interface Step3ResultProps {
  analysis: string;
}

const Step3Result = ({ analysis }: Step3ResultProps) => {
  return (
    <div className="space-y-6 !bg-white !border-white">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl !bg-white">
            <FileText className="w-5 h-5" />
            AI 분석 결과
          </CardTitle>
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
              분석 결과가 없습니다.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Step3Result;
