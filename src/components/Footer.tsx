import { Heart, Phone, Info } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 md:px-12 py-12 text-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 medical-gradient rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">MedNuri</h3>
                <p className="text-sm text-gray-400">by Mediums</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              AI 기술로 정확하고 편리하게, 국민 건강을 지키는 스마트 건강
              도우미입니다.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Info className="w-4 h-4" />
              <span>본 서비스는 의료진의 진료를 대체하지 않습니다.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">서비스</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/symptom-consultation"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  증상 상담
                </a>
              </li>
              <li>
                <a
                  href="/checkup-analysis"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  검진 결과
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">문의</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-medical-secondary" />
                <span className="text-gray-300">응급상황: 119</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="w-4 h-4 text-medical-secondary" />
                <span className="text-gray-300">생명존중: 1393</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p className="text-gray-400 text-sm">
              © 2024 MedNuri by Mediums. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                이용약관
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                의료면책조항
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
