type MainContentProps = {
  activeBar: string;
};
const MainContent: React.FC<MainContentProps> = ({ activeBar }) => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">
        Current Section: {activeBar.replace("-", " ")}
      </h2>
      <p>This is the content for {activeBar}.</p>
    </div>
  );
};

export default MainContent;
