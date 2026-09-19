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
        <div className="flex flex-col items-center h-40 w-30 border">
            <Icon className="h-20 w-20 bg-green-200 text-black p-3 rounded-3xl" />
            <p>{text}</p>
            <p>{description}</p>
        </div>
    );
};

export default FeaturesShowcase;