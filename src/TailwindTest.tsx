import React from 'react';

/**
 * Tailwind CSS Test Component
 * 
 * Use this to verify Tailwind is working correctly.
 * 
 * To test:
 * 1. Import this in App.tsx temporarily
 * 2. Replace <AppRoutes /> with <TailwindTest />
 * 3. You should see colorful styled boxes
 * 4. If you see plain unstyled text, Tailwind isn't working
 */
export const TailwindTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎨 Tailwind CSS Test
          </h1>
          <p className="text-gray-600 mb-6">
            If you can see this styled correctly with colors, shadows, and spacing, 
            Tailwind CSS is working! 🎉
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2">Blue Box</h3>
              <p className="text-sm">Background color working</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2">Green Box</h3>
              <p className="text-sm">Padding & spacing working</p>
            </div>
            <div className="bg-purple-500 text-white p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2">Purple Box</h3>
              <p className="text-sm">Shadows & rounded corners working</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
              Primary Button
            </button>
            <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors">
              Secondary Button
            </button>
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
              Danger Button
            </button>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">Responsive Grid Test</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div
                  key={num}
                  className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white p-4 rounded text-center font-bold"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <h3 className="font-bold text-yellow-800 mb-2">✅ What You Should See:</h3>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Gradient background (purple to red)</li>
            <li>• White card with shadow</li>
            <li>• Colored boxes (blue, green, purple)</li>
            <li>• Styled buttons with hover effects</li>
            <li>• Responsive grid (2 cols on mobile, 4 on desktop)</li>
            <li>• This yellow warning box</li>
          </ul>
        </div>

        <div className="mt-8 bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <h3 className="font-bold text-red-800 mb-2">❌ If Tailwind is NOT Working:</h3>
          <ul className="text-red-700 space-y-1 text-sm">
            <li>• You'll see plain black text on white background</li>
            <li>• No colors, shadows, or spacing</li>
            <li>• Everything looks unstyled</li>
          </ul>
          <p className="text-red-700 mt-4 font-semibold">
            👉 Solution: See QUICK-FIX.md in the root folder
          </p>
        </div>
      </div>
    </div>
  );
};
