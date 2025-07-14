import { Shield, Clock, Smartphone, Brain } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI 기반 정확한 분석",
      description:
        "최신 의료 AI 기술로 정확하고 신뢰할 수 있는 건강 정보를 제공합니다.",
    },
    {
      icon: Clock,
      title: "24시간 언제든지",
      description:
        "병원이 문을 닫아도, 새벽이라도 언제든 건강 상담을 받을 수 있습니다.",
    },
    {
      icon: Smartphone,
      title: "모바일 최적화",
      description: "스마트폰, 태블릿, PC 어디서든 편리하게 이용할 수 있습니다.",
    },
    {
      icon: Shield,
      title: "개인정보 보호",
      description:
        "의료정보는 철저히 보호되며, 익명 상담으로 안전하게 이용하세요.",
    },
  ];

  return (
    <section className="pt-16 pb-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
            왜 <span className="text-medical-primary">MedNuri</span>를 선택해야
            할까요?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto py-2">
            첨단 기술과 따뜻한 마음으로 만든 건강 도우미 서비스
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
