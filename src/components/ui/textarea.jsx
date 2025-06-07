import * as React from "react"

import { cn } from "@/utils/cn"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // W95 specific styling additions:
        "font-pixel bg-w95-white text-w95-black border-w95-darkgrey shadow-w95-panel p-1",
        // Override some defaults for W95 style:
        "rounded-none min-h-[60px] focus-visible:ring-0 focus-visible:ring-offset-0", // No rounded corners, adjusted min-height, no focus ring
        className
      )}
      ref={ref}
      {...props} />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
