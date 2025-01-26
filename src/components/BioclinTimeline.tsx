import React from "react";
import { Timeline } from "./ui/timeline";

export function BioclinTimeline() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Expanding our horizons with cutting-edge clinical research solutions and innovative data science applications.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-semibold text-primary mb-2">Advanced Analytics Platform</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Launched our state-of-the-art analytics platform for clinical trial data management and analysis.
              </p>
            </div>
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-semibold text-secondary mb-2">Global Partnerships</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Established strategic partnerships with leading pharmaceutical companies worldwide.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            A year of significant achievements and groundbreaking developments in clinical research.
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm mb-2">
              ✅ Successfully completed 50+ clinical trials
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm mb-2">
              ✅ Expanded our team with top industry experts
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm mb-2">
              ✅ Implemented AI-driven research methodologies
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm mb-2">
              ✅ Received multiple industry recognitions
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-semibold text-primary mb-2">Research Excellence</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Published groundbreaking research papers in leading medical journals.
              </p>
            </div>
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-semibold text-secondary mb-2">Innovation Hub</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Launched our innovation hub for developing next-gen clinical research solutions.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Foundation",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            The beginning of our journey to revolutionize clinical research through data science.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-semibold text-primary mb-2">Our Vision</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Started with a vision to transform clinical research through innovative data science solutions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-semibold text-secondary mb-2">First Milestone</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Successfully completed our first major clinical trial with groundbreaking results.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline 
        data={data.map(item => ({
          ...item,
          title: item.title
        }))} 
      />
    </div>
  );
} 