import { palette } from '@/lib/palette';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  SectionText,
  TimelineCardTitle,
} from './Typography';

type ScrollableScrollableTimelineItem = {
  innovation: string;
  theater: string;
  description: string;
  militaryImplementationYear: number;
  usImplementationYear: number;
  outcome: string;  
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
      className={`py-10 relative flex w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      style={{ backgroundColor: palette.background}}
    >
      {/* vertical line */}
      <div
        className='h-full my-10 absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-5'
        style={{
          // height: lineHeight,
          backgroundColor: palette.accent2,
        }}
      />
      {/* circle */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 shadow z-10"
        style={{ backgroundColor: palette.accent, borderColor: palette.cardBg}}
      / >

      {/* Spacer to keep line in middle */}
      <div className="flex-1" />
      
      {/* Year implemented */}
      <TimelineCardTitle >{item.usImplementationYear}</TimelineCardTitle>

      {/* card */}
      <div
        className={`relative p-4 rounded-md shadow-md max-w-sm transition-all duration-300 ease-in-out ${isLeft ? 'mr-10 ml-5 pr-12' : 'ml-10 mr-5 pl-12'}`}
        style={{
          opacity: ratio,
          transform: `translateY(${20 - ratio * 20}px) scale(${0.9 + ratio * 0.1})`,
          backgroundColor: palette.cardBg,
          display: 'grid',
          gap: 8,
        }}
      >
        <TimelineCardTitle >{item.innovation}</TimelineCardTitle>
        <SectionText ><span className='font-bold'>Year implemented by military:</span> {item.militaryImplementationYear}</SectionText>
        <SectionText ><span className='font-bold'>Theater:</span>  {item.theater}</SectionText>
        <SectionText ><span className='font-bold'>Description:</span>  {item.description}</SectionText>
        <SectionText ><span className='font-bold'>Result:</span>  {item.outcome}</SectionText>
      </div>
    </div>
  );
};

export const ScrollableTimeline: React.FC<ScrollableTimelineProps> = ({ items }) => {
  return (
    <div
      className="relative flex flex-col items-center overflow-y-scroll px-10"
    >
      {items.map((item, index) => (
        <ScrollableTimelineItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};
