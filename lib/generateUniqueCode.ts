export function generateUniqueCode(title: string): string {
  // Step 1: Simplify the title by removing special characters and spaces, then convert to lowercase
  const simplifiedTitle = title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // remove non-alphanumeric characters
    .slice(0, 10); // take only the first 10 characters for brevity

  // Step 2: Create a unique identifier, e.g., using the current timestamp
  const uniqueId = Date.now().toString(36); // Convert timestamp to base-36

  // Step 3: Combine the simplified title with the unique ID to form the code
  const uniqueCode = `${simplifiedTitle}-${uniqueId}`;

  return uniqueCode;
}