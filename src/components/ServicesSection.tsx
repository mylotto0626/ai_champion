import { Hospital, Calendar, Search, Users, Heart } from 'lucide-react';
import ServiceCard from './ServiceCard';

const ServicesSection = () => {
  const services = [
    {
      icon: Hospital,
      title: "증상 상담",
      description: "아플 때 어디로 가야 할지 모르겠다면",
      features: [
        "증상을 설명하면 적절한 진료과 추천",
        "주변 병원 및 의료진 정보 제공",
        "부위별 증상 예시로 쉬운 선택",
        "응급상황 판단 및 대응 가이드"
      ],
      buttonText: "증상 상담 시작하기",
      gradient: true
    },
    {
      icon: Calendar,
      title: "검진 결과 해석",
      description: "건강검진 결과지를 쉽게 이해하세요",
      features: [
        "검진 결과지 사진 업로드로 간편 분석",
        "수치별 의미와 주의사항 설명",
        "개선을 위한 생활습관 가이드",
        "추가 검사 필요성 판단"
      ],
      buttonText: "검진 결과 분석하기"
    },
    {
      icon: Search,
      title: "처방약 정보",
      description: "복용 중인 약의 모든 것을 알아보세요",
      features: [
        "약 이름만으로 상세 정보 제공",
        "정확한 복용법과 주의사항",
        "부작용 및 알레르기 정보",
        "다른 약과의 상호작용 체크"
      ],
      buttonText: "약 정보 검색하기"
    },
    {
      icon: Users,
      title: "시니어 케어",
      description: "어르신들을 위한 특별한 건강 관리",
      features: [
        "정기적인 안부 확인 및 건강 체크",
        "연령대별 맞춤 운동 프로그램",
        "복용 약물 관리 및 알림",
        "응급상황 대응 가이드"
      ],
      buttonText: "시니어 케어 시작하기"
    },
    {
      icon: Heart,
      title: "마음 상담",
      description: "혼자 힘들 때, 마음을 털어놓으세요",
      features: [
        "익명 보장으로 안전한 상담",
        "24시간 언제든 이용 가능",
        "전문적인 심리 상담 정보",
        "스트레스 관리 및 힐링 콘텐츠"
      ],
      buttonText: "마음 상담 받기",
      gradient: true
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            5가지 핵심 <span className="text-medical-primary">건강 서비스</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI 기술로 더욱 정확하고 편리하게, 당신의 건강을 지켜드립니다
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className={index === 4 ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
