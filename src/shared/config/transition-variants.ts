export const PopoverTransitionVariants = {
  variants: {
    start: {
      y: -10,
      opacity: 1,
      transition: {
        opacity: {
          duration: 0.15,
        },
      },
    },
    exit: {
      y: 10,
      opacity: 0,
      transition: {
        opacity: {
          duration: 0.15,
        },
      },
    },
  },
};
