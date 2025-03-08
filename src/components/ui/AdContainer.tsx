
interface AdContainerProps {
    position: 'left' | 'right';
  }
  
  export const AdContainer = ({ position }: AdContainerProps) => {
    return (
      <div 
        className={`ad-container ${position === 'left' ? 'left-0' : 'right-0'}`}
      >
        <div className="w-full h-full glass rounded-lg flex items-center justify-center">
          <span className="text-sm text-muted-foreground">Advertisement</span>
        </div>
      </div>
    );
  };
  

// interface AdContainerProps {
//   position: "left" | "right" | "bottom";
// }

// export const AdContainer = ({ position }: AdContainerProps) => {
//   return (
//     <div
//       className={`fixed ${
//         position === "left"
//           ? "left-0 top-0 h-full w-20"
//           : position === "right"
//           ? "right-0 top-0 h-full w-20"
//           : "bottom-0 left-0 w-full h-16"
//       } bg-gray-900 bg-opacity-80 flex items-center justify-center z-50`}
//     >
//       <div className="w-full h-full glass rounded-lg flex items-center justify-center">
//         <span className="text-sm text-muted-foreground">Advertisement</span>
//       </div>
//     </div>
//   );
// };