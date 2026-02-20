'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(currentValue);
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '-':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setNewNumber(true);
    }
  };

  const Button = ({ children, onClick, className = '', variant = 'default' }: { 
    children: React.ReactNode; 
    onClick: () => void; 
    className?: string;
    variant?: 'default' | 'operation' | 'equals' | 'clear';
  }) => {
    const baseStyle = 'h-16 text-xl font-semibold rounded-lg transition-all active:scale-95';
    const variants = {
      default: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      operation: 'bg-orange-500 hover:bg-orange-600 text-white',
      equals: 'bg-green-500 hover:bg-green-600 text-white',
      clear: 'bg-red-500 hover:bg-red-600 text-white',
    };
    
    return (
      <button
        onClick={onClick}
        className={`${baseStyle} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  return (
    <article className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-2xl p-6">
      <header className="mb-4">
        <output className="block w-full bg-gray-100 rounded-lg p-6 text-right text-4xl font-bold text-gray-800 overflow-hidden text-ellipsis">
          {display}
        </output>
      </header>
      
      <section className="grid grid-cols-4 gap-3" aria-label="Calculator buttons">
        <Button onClick={handleClear} variant="clear" className="col-span-2">
          AC
        </Button>
        <Button onClick={handleBackspace} variant="default">
          ⌫
        </Button>
        <Button onClick={() => handleOperation('÷')} variant="operation">
          ÷
        </Button>

        <Button onClick={() => handleNumber('7')} variant="default">
          7
        </Button>
        <Button onClick={() => handleNumber('8')} variant="default">
          8
        </Button>
        <Button onClick={() => handleNumber('9')} variant="default">
          9
        </Button>
        <Button onClick={() => handleOperation('×')} variant="operation">
          ×
        </Button>

        <Button onClick={() => handleNumber('4')} variant="default">
          4
        </Button>
        <Button onClick={() => handleNumber('5')} variant="default">
          5
        </Button>
        <Button onClick={() => handleNumber('6')} variant="default">
          6
        </Button>
        <Button onClick={() => handleOperation('-')} variant="operation">
          -
        </Button>

        <Button onClick={() => handleNumber('1')} variant="default">
          1
        </Button>
        <Button onClick={() => handleNumber('2')} variant="default">
          2
        </Button>
        <Button onClick={() => handleNumber('3')} variant="default">
          3
        </Button>
        <Button onClick={() => handleOperation('+')} variant="operation">
          +
        </Button>

        <Button onClick={() => handleNumber('0')} variant="default" className="col-span-2">
          0
        </Button>
        <Button onClick={handleDecimal} variant="default">
          .
        </Button>
        <Button onClick={handleEquals} variant="equals">
          =
        </Button>
      </section>
    </article>
  );
}
