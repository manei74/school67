/**
 * Utility functions for class name formatting
 */

/**
 * Converts class ID to display format with Russian letters
 * Examples: "7b" -> "7Б", "10a" -> "10А", "5v" -> "5В"
 */
export function formatClassName(classId: string): string {
  if (!classId) return classId;
  
  // Extract the grade number and letter
  const match = classId.match(/^(\d+)([a-z])$/i);
  if (!match) return classId;
  
  const [, grade, letter] = match;
  
  // Map English letters to Russian equivalents
  const letterMapping: { [key: string]: string } = {
    'a': 'А',
    'b': 'Б', 
    'v': 'В',
    'g': 'Г',
    'd': 'Д'
  };
  
  const russianLetter = letterMapping[letter.toLowerCase()];
  return russianLetter ? `${grade}${russianLetter}` : classId;
}