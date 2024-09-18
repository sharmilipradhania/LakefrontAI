import Slider from "./components/Slider";
import Navigation from "./components/navigation";
import Midsection from "./components/Midsection";



export default function Home() {

  return (
   <main className="block w-auto min-h-screen mx-auto place-items-center overflow: hidden;">
    <Navigation />
    <Slider/>
    <Midsection/>
   
   </main>
  );
}