// Third-party Imports
import { cva } from 'class-variance-authority'

/**
 * The page content column: max width + side gutters. `<main>` and the navbar both use it, so the header (attached or
 * floating) always lines up with page content — change the width or gutters here, never per component.
 */
export const pageContainer = cva('mx-auto w-full max-w-360 px-4 sm:px-6')
