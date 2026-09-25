/**
 * yaml.d.ts - Type declarations for YAML imports
 * Allows TypeScript to import .yaml files as objects
 */

declare module '*.yaml' {
  const content: unknown;
  export default content;
}
