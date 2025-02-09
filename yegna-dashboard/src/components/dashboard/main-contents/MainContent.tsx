const MainContent: React.FC = () => {
  return (
    <div className="flex-1 pl-60 pt-24 bg-gray-100 ">
      <h2 className="text-2xl font-semibold mb-4">
        {/* Current Section: {activeBar.replace("-", " ")} */}
      </h2>
      {/* <p>This is the content for {activeBar}.</p> */}
      <div className="h-screen bg-gray-500"></div>
    </div>
  );
};

export default MainContent;
