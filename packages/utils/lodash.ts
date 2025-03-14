type DebouncedFunction<F extends (...args: any[]) => any> = F & {
    cancel: () => void;
  };
  
  export function debounce<F extends (...args: any[]) => ReturnType<F>>(
    func: F,
    delay: number,
    immediate?: boolean
  ): DebouncedFunction<F> {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let isInvoked = false;
    let lastResult: ReturnType<F>;
  
    const debounced = function (this: ThisParameterType<F>, ...args: Parameters<F>) {
      const context = this;
  
      if (immediate && !isInvoked) {
        lastResult = func.apply(context, args);
        isInvoked = true;
      }
  
      if (timer) clearTimeout(timer);
  
      timer = setTimeout(() => {
        if (!immediate) {
          lastResult = func.apply(context, args);
        }
        isInvoked = false; 
      }, delay);
  
      return lastResult; 
    } as F;
  
    (debounced as DebouncedFunction<F>).cancel = () => {
      if (timer) clearTimeout(timer);
      timer = null;
      isInvoked = false;
    };
  
    return debounced as DebouncedFunction<F>;
  }