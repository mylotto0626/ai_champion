import { useState } from "react";
import StepIndicator from "../pages/checkup/StepIndicator";
import Step1Upload from "../pages/checkup/Step1Upload";
import Step2Confirm from "../pages/checkup/Step2Confirm";
import Step3Result from "../pages/checkup/Step3Result";

type CheckupData = {
  bloodPressure: string;
  bloodSugar: string;
  cholesterol: string;
  liverFunction: string;
  weight: string;
  height: string;
  bmi: string;
  notes: string;
};

const CheckupAnalysis = () => {
  const [step, setStep] = useState(1);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [checkupData, setCheckupData] = useState<CheckupData>({
    bloodPressure: "",
    bloodSugar: "",
    cholesterol: "",
    liverFunction: "",
    weight: "",
    height: "",
    bmi: "",
    notes: "",
  });
  const [analysis, setAnalysis] = useState("");

  return (
    <div className="container mx-auto p-4">
      <StepIndicator step={step} />

      {step === 1 && (
        <Step1Upload
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setCheckupData={setCheckupData}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2Confirm
          checkupData={checkupData}
          setCheckupData={setCheckupData}
          onAnalyze={(result) => {
            setAnalysis(result);
            setStep(3);
          }}
        />
      )}
      {step === 3 && <Step3Result analysis={analysis} />}
    </div>
  );
};

export default CheckupAnalysis;
