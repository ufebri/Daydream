export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}


// This component can be used to show a loading spinner while data is being fetched or processed.
// It uses Tailwind CSS for styling, so make sure you have Tailwind set up in
// your project. The spinner is a simple div with a border that spins indefinitely.
// You can customize the size and color of the spinner by changing the classes applied to the div
// (e.g., `w-10 h-10` for size and `border-red-600` for color).
// To use this component, simply import it and include it in your JSX where you want the loader to appear.
// For example:
// import Loader from './components/ui/loader';
