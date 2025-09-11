"use client"

import Image from "next/image"

interface Company {
  name: string
  logo: string
  position: string
  duration: string
}

const companies: Company[] = [
  {
    name: "TCS",
    logo: "/logos/tcs.png",
    position: "Trainee Engineer",
    duration: "Feb 2025 - Present"
  },
  {
    name: "TATA Steel",
    logo: "/logos/tata-steel.png",
    position: "AI Engineer Intern",
    duration: "May 2024 - June 2024"
  }
]

export default function CompaniesTimeline() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Companies I've Worked With</h2>

      {/* Timeline */}
      <div className="relative">
        {/* Scrollable timeline container */}
        <div className="max-h-96 overflow-y-auto custom-scrollbar pr-4">
          {/* Timeline items */}
          <div className="relative space-y-12">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-muted-foreground/20 transform -translate-x-1/2"></div>

            {companies.map((company, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={`${company.name}-${index}`} className="relative flex items-center min-h-[100px] px-4">
                  {/* Left side content */}
                  <div className="w-1/2 pr-12 text-right">
                    {isEven && (
                      <div className="max-w-sm ml-auto text-center">
                        <div className="flex justify-center mb-2">
                          <Image
                            src={company.logo}
                            alt={`${company.name} logo`}
                            width={100}
                            height={100}
                            className={`object-contain ${company.name === 'TCS' ? 'dark:invert' : 'dark:brightness-110 dark:contrast-110'}`}
                          />
                        </div>
                        <p className="text-primary font-medium text-sm mb-1">
                          {company.position}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {company.duration}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Timeline node - centered on the line */}
                  <div className="absolute left-1/2 w-6 h-6 bg-muted-foreground/30 rounded-full border-2 border-background flex items-center justify-center z-10 transform -translate-x-1/2 -translate-y-3">
                    <div className="w-2 h-2 bg-muted-foreground/60 rounded-full"></div>
                  </div>

                  {/* Right side content */}
                  <div className="w-1/2 pl-12 text-left">
                    {!isEven && (
                      <div className="max-w-sm mr-auto text-center">
                        <div className="flex justify-center mb-2">
                          <Image
                            src={company.logo}
                            alt={`${company.name} logo`}
                            width={100}
                            height={100}
                            className={`object-contain ${company.name === 'TCS' ? 'dark:invert' : 'dark:brightness-110 dark:contrast-110'}`}
                          />
                        </div>
                        <p className="text-primary font-medium text-sm mb-1">
                          {company.position}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {company.duration}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}