import { useEffect } from "react";
import { Upload, FileText } from "lucide-react";
import { Button } from "../../components/ui/button";

interface Step1UploadProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  setCheckupData: (data: {
    bloodPressure: string;
    bloodSugar: string;
    cholesterol: string;
    liverFunction: string;
    weight: string;
    height: string;
    bmi: string;
    notes: string;
  }) => void;
  onNext: () => void;
}

const Step1Upload = ({
  selectedFile,
  setSelectedFile,
  setCheckupData,
  onNext,
}: Step1UploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // OCR 시뮬레이션 후 자동으로 데이터 채움
      setTimeout(() => {
        setCheckupData({
          bloodPressure: "120/80",
          bloodSugar: "105",
          cholesterol: "200",
          liverFunction: "정상",
          weight: "70",
          height: "175",
          bmi: "22.9",
          notes: "이미지에서 추출된 결과입니다.",
        });
        onNext();
      }, 1500);
    }
  };

  return (
    <div className="p-6 border rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5" />
        검진 결과 업로드
      </h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors inline-block"
        >
          <FileText className="w-12 h-12 text-gray-500 mx-auto mb-2" />
          <p className="font-medium text-gray-800">클릭하여 파일 선택</p>
          <p className="text-sm text-gray-600">또는 파일을 드래그하여 업로드</p>
        </label>
      </div>

      {selectedFile && (
        <div className="mt-4 text-sm text-gray-600">
          선택된 파일: {selectedFile.name}
        </div>
      )}
    </div>
  );
};

export default Step1Upload;
