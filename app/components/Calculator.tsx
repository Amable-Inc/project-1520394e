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
      setDisplay(result);
      setPreviousValue(parseFloat(result.split(' ')[0])); // Store quotient for chained operations
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): string => {
    let result: number;
    switch (op) {
      case '+':
        result = prev + current;
        return String(result);
      case '-':
        result = prev - current;
        return String(result);
      case '×':
        result = prev * current;
        return String(result);
      case '÷':
        if (current === 0) {
          return 'Error';
        }
        const quotient = Math.floor(prev / current);
        const remainder = prev % current;
        return remainder === 0 ? String(quotient) : `${quotient} R ${remainder}`;
      default:
        return String(current);
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const currentValue = parseFloat(display);
      const result = calculate(previousValue, currentValue, operation);
      setDisplay(result);
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
      default: 'bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white shadow-lg',
      operation: 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg',
      equals: 'bg-gradient-to-br from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white shadow-lg',
      clear: 'bg-gradient-to-br from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white shadow-lg',
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
    <article className="w-full max-w-sm mx-auto bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-2xl shadow-2xl p-8">
      <header className="mb-6">
        <output className="block w-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl p-6 text-right text-4xl font-bold text-white overflow-hidden text-ellipsis shadow-inner">
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
