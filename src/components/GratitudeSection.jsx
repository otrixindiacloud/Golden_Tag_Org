"use client";

export default function GratitudeSection() {
  const gratitudeTypes = [
    {
      id: 1,
      title: "GRATITUDE GIFTS FOR CLIENTS",
      icon: "/images/gratitude/client-gifts.jpg",
      fallbackIcon: (
        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border-2 border-amber-300 shadow-lg">
          <div className="text-center">
            <div className="w-8 h-8 bg-amber-400 rounded-full mb-1"></div>
            <div className="w-4 h-2 bg-amber-400 rounded mx-auto"></div>
          </div>
        </div>
      ),
      description: "Express your gratitude to your clients for their loyalty and support in another year of working together with gifts that are both useful and memorable."
    },
    {
      id: 2,
      title: "EMPLOYEE APPRECIATION GIFTS",
      icon: "/images/gratitude/employee-appreciation.jpg",
      fallbackIcon: (
        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border-2 border-amber-300 shadow-lg">
          <div className="text-center">
            <div className="w-12 h-8 bg-amber-400 rounded mb-1"></div>
            <div className="w-8 h-2 bg-amber-400 rounded mx-auto"></div>
          </div>
        </div>
      ),
      description: "A business is only as successful as its team members make it to be. The gesture of giving gifts allows you show appreciation for their continued effort to realize the mission of the company."
    },
    {
      id: 3,
      title: "TOKENS FOR EVENTS OR PARTNERS",
      icon: "/images/gratitude/event-tokens.jpg",
      fallbackIcon: (
        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border-2 border-amber-300 shadow-lg">
          <div className="text-center">
            <div className="w-10 h-10 bg-amber-400 rounded-full mb-1"></div>
            <div className="w-6 h-2 bg-amber-400 rounded mx-auto"></div>
          </div>
        </div>
      ),
      description: "Give unique gifts to your event guests that will make them remember your event fondly or to your community and business partners that will build goodwill for a more fruitful relationship."
    }
  ];

  return (
    <section className="golden-tag-section bg-background">
      <div className="golden-tag-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="text-2xl font-bold text-amber-600 tracking-wider">
              STORE
            </div>
          </div>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            A LITTLE GRATITUDE GOES A LONG WAY
          </h2>
          <p className="text-amber-600 font-medium text-lg">
            Our Approach to Meaningful Corporate Gifting
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {gratitudeTypes.map((type, index) => (
            <div 
              key={type.id} 
              className="text-center group p-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-border hover:border-border/80 bg-card relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4 w-16 h-16 bg-current rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-current rounded-full"></div>
              </div>
              
              <div className="flex justify-center relative z-10 mb-6">
                <div className="relative">
                  <img 
                    src={type.icon} 
                    alt={type.title}
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.parentElement.querySelector('.fallback-icon');
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  <div className="fallback-icon hidden">
                    {type.fallbackIcon.props.children}
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                  GT
                </div>
              </div>
              
              <h3 className="text-lg font-bold mb-4 transition-all duration-500 transform group-hover:scale-105 text-card-foreground group-hover:text-card-foreground">
                {type.title}
              </h3>
              
              <p className="text-sm leading-relaxed transition-colors duration-500 text-muted-foreground group-hover:text-foreground">
                {type.description}
              </p>
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-muted/20 to-muted/30"></div>
              
              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full transition-all duration-500 bg-transparent group-hover:bg-muted-foreground"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
