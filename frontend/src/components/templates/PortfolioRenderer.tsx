import React from 'react';
import { PortfolioData } from '../../types/portfolio';
import MinimalTemplate from './MinimalTemplate';
import ModernTemplate from './ModernTemplate';
import CreativeTemplate from './CreativeTemplate';

interface PortfolioRendererProps {
  data: PortfolioData;
  templateName?: string;
  embedded?: boolean;
}

const PortfolioRenderer: React.FC<PortfolioRendererProps> = ({
  data,
  templateName = 'minimal',
  embedded = false,
}) => {
  switch (templateName.toLowerCase()) {
    case 'modern':
      return <ModernTemplate data={data} embedded={embedded} />;
    case 'creative':
      return <CreativeTemplate data={data} embedded={embedded} />;
    case 'minimal':
    default:
      return <MinimalTemplate data={data} embedded={embedded} />;
  }
};

export default PortfolioRenderer;
