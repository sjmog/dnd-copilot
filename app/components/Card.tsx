import { XMarkIcon } from "@heroicons/react/16/solid";
import { cn } from "@/lib/utils";

const Card = ({ children, ...props }) => {
  return (
    <div className={cn("px-4 py-6 shadow-md relative", props.className)}>
      {props.withBar && (
        <div className="h-2 bg-fantasy-bar border border-black absolute -left-1 -right-1 top-0 z-1" />
      )}
      {props.onDismiss && (
        <XMarkIcon
          className="text-gray-400 hover:text-gray-900 cursor-pointer h-5 w-5 absolute right-4"
          onClick={props.onDismiss}
        />
      )}
      {children}
    </div>
  );
};

export default Card;
