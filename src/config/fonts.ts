/**
 * Centralized Font Configuration
 * 
 * This file contains all font classes used throughout the DiagnoX application.
 * Using these constants makes it easy to update fonts globally in the future.
 * 
 * Font Usage:
 * - Instrument Serif Regular: Main branding and hero titles
 * - Instrument Serif Regular: Section headings and large titles
 * - Poppins Regular: Body text and descriptions
 * - Poppins Medium: Subtext, emphasis, and footer navigation
 * - Poppins SemiBold: Navigation, buttons, and labels
 */

export const FONTS = {
  // Primary branding font (Instrument Serif Regular)
  // Used for: Main hero titles, logo text
  branding: "font-['Instrument_Serif:Regular',serif]",
  
  // Large heading font (Instrument Serif Regular)
  // Used for: Section titles, large headings
  heading: "font-['Instrument_Serif:Regular',serif]",
  
  // Secondary heading font (Instrument Serif Regular with sans-serif fallback)
  // Used for: Secondary headings, subsection titles
  subheading: "font-['Instrument_Serif:Regular',sans-serif]",
  
  // Body text font (Poppins Regular)
  // Used for: Paragraphs, descriptions, general text
  body: "font-['Poppins:Regular',sans-serif]",
  
  // Medium weight body font (Poppins Medium)
  // Used for: Emphasized body text, hero subtitle, footer navigation
  bodyMedium: "font-['Poppins:Medium',sans-serif]",
  
  // Semi-bold body font (Poppins SemiBold)
  // Used for: Navigation links, buttons, form labels, important text
  bodySemiBold: "font-['Poppins:SemiBold',sans-serif]",
  
  // Navigation font (Poppins Medium)
  // Used for: Footer navigation, secondary navigation
  nav: "font-['Poppins:Medium',sans-serif]",
} as const;

// Type for font keys - useful for type-safe font selection
export type FontKey = keyof typeof FONTS;

/**
 * Helper function to get font class by key
 * @param key - The font key from FONTS object
 * @returns The font class string
 */
export function getFont(key: FontKey): string {
  return FONTS[key];
}