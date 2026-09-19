"use client";
import { LucideIcon, ShieldLockIcon, SendIcon } from "lucide-react";

interface FeaturesShowcaseProps {
    icon: LucideIcon;
    text: string;
    description: React.ReactNode;
}

const FeaturesShowcase = ({
    icon: Icon,
    text,
    description,
}: FeaturesShowcaseProps) => {
    return (
        <div className="flex flex-col items-center w-35">
            <Icon className="h-17 w-17 bg-green-200 text-black p-3 rounded-3xl mb-2 border-green-700 border-2" />
            <p className="font-bold">{text}</p>
            <p className="text-center text-[12px]">{description}</p>
        </div>
    );
};

export default FeaturesShowcase;