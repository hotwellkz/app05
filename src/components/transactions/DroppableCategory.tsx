import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { CategoryCardType } from '../../types';
import { CategoryCard } from './CategoryCard';

interface DroppableCategoryProps {
  category: CategoryCardType;
  onHistoryClick: () => void;
}

export const DroppableCategory: React.FC<DroppableCategoryProps> = ({
  category,
  onHistoryClick
}) => {
  const { setNodeRef, isOver, active } = useDroppable({
    id: category.id,
    data: category
  });

  const isValidDrop = () => {
    if (!active?.data.current) return false;
    
    const sourceCategory = active.data.current as CategoryCardType;
    const sourceRow = sourceCategory.row;
    const targetRow = category.row;

    // Клиент → Сотрудник
    if (sourceRow === 1 && targetRow === 2) return true;
    // Сотрудник → Проект
    if (sourceRow === 2 && targetRow === 3) return true;
    // Сотрудник ↔ Склад
    if ((sourceRow === 2 && targetRow === 4) || (sourceRow === 4 && targetRow === 2)) return true;

    return false;
  };

  const showDropIndicator = isOver && isValidDrop();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onHistoryClick();
  };

  return (
    <div
      ref={setNodeRef}
      className={`relative ${
        showDropIndicator ? 'ring-2 ring-emerald-500 ring-offset-2 rounded-lg' : ''
      }`}
    >
      <button
        onClick={handleClick}
        className="w-full bg-transparent border-none p-0 m-0 cursor-pointer focus:outline-none"
      >
        <CategoryCard category={category} />
      </button>
    </div>
  );
};