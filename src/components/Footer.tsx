export default function Footer() {
  return (
    <footer className="footer-dark py-8 px-5 sm:px-6">
      <div className="max-w-[1400px] mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-coral-500 text-2xl">✦</span>
          <span className="text-white text-xl font-bold font-heading">connect-jayanth</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 text-coral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            jayanthnjk1327@gmail.com
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-gray-600" />
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 text-coral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            Bengaluru, India
          </span>
        </div>
      </div>
    </footer>
  );
}
