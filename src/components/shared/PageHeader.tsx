import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="text-center">
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter animate-sway">
        {title}
      </h1>
      <p className="text-lg mt-2 bg-cyan-300 inline-block px-3 py-1 border-2 border-black rounded-md shadow-neo-sm">
        {subtitle}
      </p>
    </header>
  );
};

export default PageHeader;