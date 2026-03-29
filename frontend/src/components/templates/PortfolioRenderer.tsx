import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import MinimalTemplate from './MinimalTemplate';
import ModernTemplate from './ModernTemplate';
import CreativeTemplate from './CreativeTemplate';

interface PortfolioRendererProps {
  data: PortfolioData;
  templateName?: string;
}

const PortfolioRenderer: React.FC<PortfolioRendererProps> = ({ data, templateName = 'minimal' }) => {
  switch (templateName.toLowerCase()) {
    case 'modern':
      return <ModernTemplate data={data} />;
    case 'creative':
      return <CreativeTemplate data={data} />;
    case 'minimal':
    default:
      return <MinimalTemplate data={data} />;
  }
};

export default PortfolioRenderer;
