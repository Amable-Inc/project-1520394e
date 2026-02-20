import Calculator from './components/Calculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <main className="w-full max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            Free Online Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple and easy-to-use calculator for all your basic math operations. Perform addition, subtraction, multiplication, and division instantly.
          </p>
        </header>
        
        <Calculator />
        
        <section className="mt-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How to Use This Calculator
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-6 text-left">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span><strong>Numbers:</strong> Click number buttons (0-9) to enter values</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span><strong>Operations:</strong> Use +, -, ×, ÷ buttons for calculations</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span><strong>Equals:</strong> Press = to get your result</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span><strong>Clear:</strong> AC button resets the calculator</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">•</span>
                <span><strong>Backspace:</strong> ⌫ button removes the last digit</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
