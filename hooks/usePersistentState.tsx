
import React, { useState, useEffect, useRef } from 'react';

// Helper to safe stringify objects with circular references and exclude DOM/React internals
const safeStringify = (obj: any): string | null => {
  const seen = new WeakSet();
  
  const replacer = (key: string, value: any) => {
    // 1. Handle null/undefined
    if (value === null || value === undefined) {
      return value;
    }

    // 2. Handle Primitives
    if (typeof value !== 'object') {
      return value;
    }

    // 3. React Internals & DOM Keys Blacklist - Aggressive filtering
    if (key.startsWith('__react') || key.startsWith('_react') || key === 'stateNode' || key === '_owner' || key === 'updater' || key === 'ref') {
        return undefined;
    }

    // 4. Detect DOM Nodes & Events
    // Check for nodeType (DOM Node) - safer than instanceof Node across contexts
    if ('nodeType' in value) {
        return undefined;
    }
    // Check for Event objects (native or React synthetic)
    if ('nativeEvent' in value || ('bubbles' in value && 'cancelable' in value)) {
        return undefined;
    }
    // Check for Window
    if (value === window) {
        return undefined;
    }

    // 5. Detect React Elements (virtual DOM)
    if ('$$typeof' in value) {
        return undefined;
    }

    // 6. Circular Reference Detection
    if (seen.has(value)) {
      return undefined;
    }
    seen.add(value);

    return value;
  };

  try {
    return JSON.stringify(obj, replacer);
  } catch (error) {
    // console.warn('safeStringify failed to serialize state:', error);
    return null;
  }
};

function usePersistentState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Use a ref to track if we are mounted to avoid state updates on unmounted components
  const isMounted = useRef(true);

  const [state, setState] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return initialValue;
      
      const storedValue = window.localStorage.getItem(key);
      if (storedValue !== null && storedValue !== 'undefined') {
          return JSON.parse(storedValue);
      }
      return initialValue;
    } catch (error) {
      console.warn(`Error reading from localStorage for key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    return () => { isMounted.current = false; };
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const serializedState = safeStringify(state);
      if (serializedState !== null) {
        window.localStorage.setItem(key, serializedState);
      }
    } catch (error) {
      console.warn(`Error writing to localStorage for key "${key}". State was not saved.`);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
