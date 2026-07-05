/**
 * Utilities for handling LTree paths and curriculum structures.
 */

/**
 * Parses an LTree path string (e.g., 'math.grade3.addition') into an array of slugs.
 * Used for breadcrumbs, navigation, and filtering.
 */
export function parsePathToBreadcrumbs(path: string): string[] {
  if (!path) return [];
  return path.split('.');
}

/**
 * Formats a list of slugs into an LTree path string.
 */
export function formatBreadcrumbsToPath(breadcrumbs: string[]): string {
  return breadcrumbs.join('.');
}

/**
 * Helper to determine if a node is a descendant of another based on their paths.
 */
export function isDescendant(parentPath: string, childPath: string): boolean {
  if (!parentPath || !childPath) return false;
  return childPath.startsWith(parentPath + '.');
}

/**
 * Helper to get the parent path of an LTree path.
 */
export function getParentPath(path: string): string | null {
  if (!path || !path.includes('.')) return null;
  const parts = path.split('.');
  parts.pop();
  return parts.join('.');
}
