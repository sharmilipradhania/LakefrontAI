import Header from './chartHeader';
import ChartPlot from './chartPlot';

export default function chart() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <ChartPlot />
      </div>
    </div>
  );
}