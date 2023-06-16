export const useDefaultProps = () => {
  return {
    info: {
      type: Object,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  };
}
