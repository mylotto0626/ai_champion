import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  gradient?: boolean;
  onClick?: () => void;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  buttonText,
  gradient = false,
  onClick,
}: ServiceCardProps) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-[2px_2px_8px_rgba(0,0,0,0.1)] animate-fade-in">
      <CardHeader className="medical-gradient text-white rounded-t-lg">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        <CardDescription className="text-blue-100">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6 bg-white">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-medical-secondary rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 text-sm leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button
          className="w-full bg-medical-primary hover:bg-medical-primary/90 text-white font-medium py-3 rounded-lg transition-all duration-200 group-hover:animate-pulse-soft"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
