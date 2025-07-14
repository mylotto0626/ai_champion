const StepIndicator = ({ step }: { step: number }) => {
  const steps = ["이미지 업로드", "OCR 확인", "분석 결과"];
  return (
    <div className="flex justify-center gap-4 my-6">
      {steps.map((label, index) => (
        <div
          key={index}
          className={`flex items-center px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
            step === index + 1
              ? "bg-medical-primary text-white border-medical-primary"
              : "bg-white text-gray-400 border-gray-200"
          }`}
        >
          {index + 1}. {label}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
