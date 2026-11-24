/** First focusable element on every page: lets keyboard users jump past the sidebar and header. */
const SkipToMain = () => (
  <a
    href='#content'
    className='bg-primary text-primary-foreground focus-visible:ring-ring/50 fixed inset-s-4 top-4 z-100 -translate-y-24 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-transform outline-none focus-visible:translate-y-0 focus-visible:ring-3 motion-reduce:transition-none'
  >
    Skip to main content
  </a>
)

export default SkipToMain
