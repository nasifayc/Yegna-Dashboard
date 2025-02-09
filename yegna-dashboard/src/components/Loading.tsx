const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center pt-10 text-center">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-background-dark dark:border-background-light"></div>
    </div>
  );
};

export default Loading;
