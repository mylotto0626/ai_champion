import { Button } from "../components/ui/button";
import { Heart, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 medical-gradient opacity-95"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">AI 기반 건강 도우미</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            언제나 곁에 있는
            <br />
            <span className="text-white">스마트 건강 도우미</span>
          </h1>

          <p className="text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed">
            증상부터 처방약까지, AI가 도와드리는
            <br />
            맞춤형 건강 관리 서비스
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/symptom-consultation">
              <Button
                size="lg"
                className="bg-white text-medical-primary hover:bg-blue-50 text-lg px-8 py-4 h-auto"
              >
                지금 시작하기
              </Button>
            </Link>
            {/* <Button 
              size="lg" 
              className="bg-white text-medical-primary hover:bg-blue-50 text-lg px-8 py-4 h-auto"
            >
              서비스 둘러보기
            </Button> */}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <div className="text-2xl font-bold">5가지</div>
              <div className="text-blue-100">핵심 건강 서비스</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-2xl font-bold">24시간</div>
              <div className="text-blue-100">언제든 이용 가능</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="text-2xl font-bold">AI 기반</div>
              <div className="text-blue-100">정확한 건강 정보</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
