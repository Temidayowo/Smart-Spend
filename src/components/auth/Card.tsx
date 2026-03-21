import { AnimateOnScroll } from "../ui/MotionWrapper"; 

type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <AnimateOnScroll className="lg:px-40 lg:py-12 h-full">
      <div className="grid grid-row-2 lg:grid-cols-2 lg:grid-rows-1">
        {children}
      </div>
    </AnimateOnScroll>
  );
};

export default Card;
