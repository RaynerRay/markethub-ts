import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  align?: 'left' | 'center' | 'right';
}

const alignmentClasses: Record<'left' | 'center' | 'right', string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  align = "center"
}) => {
  return (
    <div className={`mx-auto mb-8 ${alignmentClasses[align]} ${className}`}>
      <h2 className={`text-3xl font-bold mb-3 ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-gray-600 max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;