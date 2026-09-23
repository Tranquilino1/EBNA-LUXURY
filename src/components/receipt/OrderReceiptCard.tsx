import React from 'react';
import type { OrderReceiptData, ReceiptTemplateId } from '../../types';
import { HauteCoutureTemplate } from './templates/HauteCoutureTemplate';
import { ObsidianGoldTemplate } from './templates/ObsidianGoldTemplate';
import { EditorialVogueTemplate } from './templates/EditorialVogueTemplate';
import './receipt.css';

interface OrderReceiptCardProps {
  order: OrderReceiptData;
  template?: ReceiptTemplateId;
}

export const OrderReceiptCard: React.FC<OrderReceiptCardProps> = ({ 
  order, 
  template = 'haute-couture' 
}) => {
  switch (template) {
    case 'obsidian-gold':
      return <ObsidianGoldTemplate order={order} />;
    case 'editorial-vogue':
      return <EditorialVogueTemplate order={order} />;
    case 'haute-couture':
    default:
      return <HauteCoutureTemplate order={order} />;
  }
};
