import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // W95 specific styling additions:
        "font-pixel bg-w95-white text-w95-black border-w95-darkgrey shadow-w95-panel p-1",
        // Override some defaults for W95 style:
        "rounded-none h-auto focus-visible:ring-0 focus-visible:ring-offset-0", // No rounded corners, auto height, no focus ring for W95
        className
      )}
      ref={ref}
      {...props} />
  )
})
Input.displayName = "Input"

export { Input }
