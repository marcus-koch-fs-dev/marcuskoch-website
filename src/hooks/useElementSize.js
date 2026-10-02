import { useEffect, useState } from "react";

export function useElementSize(ref) {
  const [size, setSize] = useState({ width: 800, height: 600 });

  useEffect(() => {
    function updateSize() {
      if (!ref.current) return;
      const { width, height } = ref.current.getBoundingClientRect();
      setSize({ width, height });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [ref]);

  return size;
}
