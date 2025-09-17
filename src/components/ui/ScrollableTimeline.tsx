import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  SectionText,
  TimelineCardTitle,
} from './Typography';
import { palette } from '@/lib/palette';

type ScrollableScrollableTimelineItem = {
  innovation: string;
  theater: string;
  description: string;
  militaryImplementationYear: number;
  usImplementationYear: number;
  outcomes: string;  
};

type ScrollableTimelineProps = {
  items: ScrollableScrollableTimelineItem[];
  height?: string; // e.g. "500px" or "100%"
};

const ScrollableTimelineItem: React.FC<{ item: ScrollableScrollableTimelineItem; index: number }> = ({
  item,
  index,
}) => {
  const { ref, entry } = useInView({
    threshold: Array.from({ length: 11 }, (_, i) => i / 10), // [0, 0.1, ..., 1]
  });

  const ratio = entry?.intersectionRatio ?? 0;
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex min-h-[300px] w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* circle */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white shadow"
        style={{ backgroundColor: palette.accent}}
      />

      {/* Spacer to keep line in middle */}
      <div className="flex-1" />

      {/* card */}
      <div
      className={`relative p-4 bg-white rounded-lg shadow-md max-w-sm transition-all duration-300 ease-in-out ${isLeft ? 'mr-auto pr-12' : 'ml-auto pl-12'}`}
      style={{
        opacity: ratio,
        transform: `translateY(${20 - ratio * 20}px) scale(${0.9 + ratio * 0.1})`,
      }}
      >
        <TimelineCardTitle >{item.innovation}</TimelineCardTitle>
        <SectionText >{item.description}</SectionText>
      </div>
    </div>
  );
};

export const ScrollableTimeline: React.FC<ScrollableTimelineProps> = ({ items }) => {
  const lineHeight = ( items.length + 1 ) * Number(200);
  return (
    <div
      className="relative flex flex-col items-center overflow-y-scroll"
      style={{ height: 200 }}
    >
      {/* vertical line */}
      <div
        className='absolute left-1/2 top-0 bottom-0 w-1 bg-gray-300 -translate-x-1/2 z-0'
        style={{ height: lineHeight}}
      />


      {items.map((item, index) => (
        <ScrollableTimelineItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};
