const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary/5 via-base-200 to-secondary/5 p-12 min-h-screen relative overflow-hidden">
      
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-md text-center relative z-10">
        
        <div className="grid grid-cols-3 gap-4 mb-12 p-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-3xl transition-all duration-500 hover:scale-105 ${
                i % 2 === 0
                  ? "bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse shadow-lg"
                  : "bg-gradient-to-br from-base-300 to-base-200 shadow-md"
              }`}
              style={{
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
        
        {/* Enhanced Title */}
        <h2 className="text-3xl font-bold text-base-content mb-6 leading-tight">
          {title}
        </h2>
        
        {/* Enhanced Subtitle */}
        <p className="text-lg text-base-content/70 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
